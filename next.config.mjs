import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static screenshots are already sized; keep the default (optimized) loader.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Prevent Next from treating the lockfile in the user directory as this
  // application's workspace root.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;

// The local Cloudflare bridge belongs to `next dev` only. Initialising it
// during `next build` starts Miniflare and can lock local runtime state.
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) =>
    m.initOpenNextCloudflareForDev(),
  );
}
