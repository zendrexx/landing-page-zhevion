import { PostForm, type DashboardSite } from "@/components/dashboard/PostForm";
import { getDashboardUser } from "@/lib/dashboard-auth";
import { createClient } from "@/lib/supabase/server";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getDashboardUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select("id, name, slug, hostname")
    .eq("active", true)
    .order("name");

  return (
    <PostForm
      sites={(data ?? []) as DashboardSite[]}
      role={user.role}
      currentUserId={user.id}
      error={(await searchParams).error}
    />
  );
}
