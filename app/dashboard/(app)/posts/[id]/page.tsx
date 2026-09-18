import { notFound } from "next/navigation";
import {
  PostForm,
  type DashboardSite,
  type EditablePost,
} from "@/components/dashboard/PostForm";
import { getDashboardUser } from "@/lib/dashboard-auth";
import { createClient } from "@/lib/supabase/server";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const user = await getDashboardUser();
  const supabase = await createClient();
  const id = (await params).id;
  const [{ data: post }, { data: sites }] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, slug, description, body, author_id, post_sites(site_id, published_at)")
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("sites")
      .select("id, name, slug, hostname")
      .eq("active", true)
      .order("name"),
  ]);

  if (!post) notFound();
  const query = await searchParams;

  return (
    <PostForm
      post={post as unknown as EditablePost}
      sites={(sites ?? []) as DashboardSite[]}
      role={user.role}
      currentUserId={user.id}
      error={query.error}
      saved={query.saved === "1"}
    />
  );
}
