import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getDashboardUser } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export default async function AuthenticatedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getDashboardUser();
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
