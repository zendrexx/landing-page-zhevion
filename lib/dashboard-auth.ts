import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type TeamRole = "owner" | "editor" | "author";

export type DashboardUser = {
  id: string;
  email: string;
  displayName: string;
  role: TeamRole;
};

export const getDashboardUser = cache(async (): Promise<DashboardUser> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const id = typeof claims?.sub === "string" ? claims.sub : null;

  if (error || !id) redirect("/dashboard/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, role, is_active")
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    redirect("/dashboard/login?error=not-authorized");
  }

  return {
    id,
    email:
      typeof claims?.email === "string" ? claims.email : "Team member",
    displayName: profile.display_name,
    role: profile.role as TeamRole,
  };
});
