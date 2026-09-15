import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";

type AccessClaims = {
  aud: string | string[];
  email: string;
  exp: number;
  iss: string;
  name?: string;
};

type AccessIdentity = {
  email: string;
  name: string;
};

type AccessJwk = JsonWebKey & { kid?: string };
type AccessJwkSet = { keys: AccessJwk[] };

const textEncoder = new TextEncoder();
let signingKeys: Promise<AccessJwkSet> | undefined;

export class DashboardAccessError extends Error {}

function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

function decodeJson<T>(value: string) {
  return JSON.parse(new TextDecoder().decode(decodeBase64Url(value))) as T;
}

async function getSigningKeys(teamDomain: string) {
  signingKeys ??= fetch(`https://${teamDomain}.cloudflareaccess.com/cdn-cgi/access/certs`)
    .then(async (response) => {
      if (!response.ok) throw new DashboardAccessError("Could not retrieve Cloudflare Access signing keys.");
      return response.json() as Promise<AccessJwkSet>;
    });

  return signingKeys;
}

async function verifyAccessToken(token: string, teamDomain: string, audience: string) {
  const [encodedHeader, encodedClaims, encodedSignature, ...extra] = token.split(".");
  if (!encodedHeader || !encodedClaims || !encodedSignature || extra.length) {
    throw new DashboardAccessError("Invalid Cloudflare Access token.");
  }

  const header = decodeJson<{ alg?: string; kid?: string }>(encodedHeader);
  const claims = decodeJson<AccessClaims>(encodedClaims);
  if (header.alg !== "RS256" || !header.kid) throw new DashboardAccessError("Unsupported Cloudflare Access token.");

  const keys = await getSigningKeys(teamDomain);
  const jwk = keys.keys.find((key) => key.kid === header.kid);
  if (!jwk) throw new DashboardAccessError("Cloudflare Access signing key was not found.");

  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const validSignature = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    decodeBase64Url(encodedSignature),
    textEncoder.encode(`${encodedHeader}.${encodedClaims}`),
  );
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  const expectedIssuer = `https://${teamDomain}.cloudflareaccess.com`;
  if (!validSignature || claims.iss !== expectedIssuer || !audiences.includes(audience) || claims.exp * 1000 <= Date.now()) {
    throw new DashboardAccessError("Cloudflare Access token verification failed.");
  }

  return claims;
}

export async function requireDashboardAccess(): Promise<AccessIdentity> {
  const requestHeaders = await headers();
  const token = requestHeaders.get("cf-access-jwt-assertion");
  const { env } = await getCloudflareContext({ async: true });
  const teamDomain = env.CF_ACCESS_TEAM_DOMAIN;
  const audience = env.CF_ACCESS_DASHBOARD_AUD;

  if (!token || !teamDomain || !audience) {
    throw new DashboardAccessError("Dashboard access has not been configured.");
  }

  const claims = await verifyAccessToken(token, teamDomain, audience);
  if (!claims.email) throw new DashboardAccessError("Cloudflare Access token has no email identity.");

  return { email: claims.email, name: claims.name ?? claims.email };
}
