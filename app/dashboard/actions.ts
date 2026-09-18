"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDashboardUser } from "@/lib/dashboard-auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function dashboardRedirect(path: string, key: "error" | "saved", value: string): never {
  const separator = path.includes("?") ? "&" : "?";
  redirect(`${path}${separator}${key}=${encodeURIComponent(value)}`);
}

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured()) {
    dashboardRedirect("/dashboard/login", "error", "supabase-not-configured");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    dashboardRedirect("/dashboard/login", "error", "missing-credentials");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    dashboardRedirect("/dashboard/login", "error", "invalid-credentials");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_active")
    .eq("id", data.user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    dashboardRedirect("/dashboard/login", "error", "not-authorized");
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/dashboard/login");
}

export async function savePost(formData: FormData) {
  const user = await getDashboardUser();
  const postIdValue = String(formData.get("post_id") ?? "");
  const postId = postIdValue || null;
  const returnPath = postId ? `/dashboard/posts/${postId}` : "/dashboard/posts/new";
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const description = String(formData.get("description") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const siteIds = [...new Set(formData.getAll("site_id").map(String))];
  const publishedSiteIds = [
    ...new Set(formData.getAll("published_site_id").map(String)),
  ];

  if (postId && !UUID.test(postId)) {
    dashboardRedirect("/dashboard", "error", "invalid-post");
  }
  if (!title || title.length > 160) {
    dashboardRedirect(returnPath, "error", "invalid-title");
  }
  if (!SLUG.test(slug) || slug.length > 120) {
    dashboardRedirect(returnPath, "error", "invalid-slug");
  }
  if (!description || description.length > 320) {
    dashboardRedirect(returnPath, "error", "invalid-description");
  }
  if (!body) {
    dashboardRedirect(returnPath, "error", "empty-body");
  }
  if (
    siteIds.some((id) => !UUID.test(id)) ||
    publishedSiteIds.some((id) => !UUID.test(id)) ||
    publishedSiteIds.some((id) => !siteIds.includes(id))
  ) {
    dashboardRedirect(returnPath, "error", "invalid-sites");
  }
  if (user.role === "author" && publishedSiteIds.length) {
    dashboardRedirect(returnPath, "error", "publish-not-permitted");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("save_post", {
    p_post_id: postId,
    p_title: title,
    p_slug: slug,
    p_description: description,
    p_body: body,
    p_site_ids: siteIds,
    p_published_site_ids: publishedSiteIds,
  });

  if (error || typeof data !== "string") {
    console.error("Unable to save post", error?.code ?? "unknown");
    dashboardRedirect(returnPath, "error", "save-failed");
  }

  revalidatePath("/dashboard");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  dashboardRedirect(`/dashboard/posts/${data}`, "saved", "1");
}
