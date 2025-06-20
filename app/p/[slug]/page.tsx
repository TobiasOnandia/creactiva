import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { PublicPageRenderer } from "@/components/public/PublicPageRenderer";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const supabase = await createClient();

  const { data: section, error: sectionError } = await supabase
    .from("sections")
    .select("*, elements(*), layouts(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (sectionError || !section) {
    notFound();
  }

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("is_published")
    .eq("id", section.site_id)
    .single();
  if (siteError || !site?.is_published) {
    notFound();
  }

  return <PublicPageRenderer section={section} />;
}
