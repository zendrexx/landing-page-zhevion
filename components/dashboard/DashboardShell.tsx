import Link from "next/link";
import type { DashboardUser } from "@/lib/dashboard-auth";
import { signOut } from "@/app/dashboard/actions";

export function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <Link href="/dashboard" className="dashboard-brand">
          <span>Zhevion</span>
          <small>Publishing</small>
        </Link>
        <div className="dashboard-account">
          <span>
            {user.displayName} · {user.role}
          </span>
          <form action={signOut}>
            <button type="submit" className="dashboard-text-button">
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
