import { DashboardAccessError, requireDashboardAccess } from "@/lib/dashboard-access";

export const dynamic = "force-dynamic";
export const metadata = { title: "Publishing dashboard | Zhevion", robots: { index: false, follow: false } };

export default async function DashboardPage() {
  try {
    const user = await requireDashboardAccess();

    return (
      <main className="shell" id="main" style={{ paddingBlock: "8rem" }}>
        <p className="eyebrow">Zhevion publishing</p>
        <h1>Dashboard</h1>
        <p>Signed in as {user.name}.</p>
        <p>The secure editor, post review queue, and connected-site publishing controls are the next dashboard modules.</p>
      </main>
    );
  } catch (error) {
    if (!(error instanceof DashboardAccessError)) throw error;

    return (
      <main className="shell" id="main" style={{ paddingBlock: "8rem" }}>
        <p className="eyebrow">Zhevion publishing</p>
        <h1>Dashboard access required</h1>
        <p>This route is available only through the Cloudflare Access application for the Zhevion publishing team.</p>
      </main>
    );
  }
}
