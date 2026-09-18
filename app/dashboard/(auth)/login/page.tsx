import { redirect } from "next/navigation";
import { signIn } from "@/app/dashboard/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const ERRORS: Record<string, string> = {
  "missing-credentials": "Enter your email address and password.",
  "invalid-credentials": "The email address or password is incorrect.",
  "not-authorized": "This account has not been activated for the publishing team.",
  "supabase-not-configured": "Supabase environment variables have not been configured.",
};

export const dynamic = "force-dynamic";

export default async function DashboardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const configured = isSupabaseConfigured();
  const errorKey = (await searchParams).error;

  if (configured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (data?.claims?.sub) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_active")
        .eq("id", data.claims.sub)
        .eq("is_active", true)
        .maybeSingle();
      if (profile) redirect("/dashboard");
    }
  }

  return (
    <main id="main" className="dashboard-login-page">
      <section className="dashboard-login-card">
        <a href="/" className="dashboard-login-brand">Zhevion</a>
        <p className="eyebrow">Publishing dashboard</p>
        <h1>Welcome back.</h1>
        <p className="dashboard-login-copy">
          Sign in with your individual team account to create and publish content.
        </p>
        {!configured ? (
          <p className="dashboard-alert error">
            Supabase is not configured. Follow <code>docs/supabase-publishing.md</code> before signing in.
          </p>
        ) : null}
        {errorKey ? (
          <p className="dashboard-alert error">
            {ERRORS[errorKey] ?? "Sign-in failed. Please try again."}
          </p>
        ) : null}
        <form action={signIn} className="dashboard-login-form">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required disabled={!configured} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required disabled={!configured} />
          <button type="submit" className="dashboard-primary-button" disabled={!configured}>
            Sign in
          </button>
        </form>
        <a href="/" className="dashboard-back">← Back to zhevion.com</a>
      </section>
    </main>
  );
}
