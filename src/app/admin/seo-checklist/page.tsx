import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SeoChecklistClient } from "./SeoChecklistClient";
import { seoChecklist } from "@/data/seo-checklist";

export const metadata: Metadata = {
  title: "SEO Checklist | Admin",
  robots: { index: false, follow: false },
};

export default async function SeoChecklistPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const accessKey = params.key;

  // Grant access if key is correct
  if (accessKey === "truestar2026") {
    // Cookie setting is handled client-side to avoid blocking
    return <SeoChecklistClient checklist={seoChecklist} grantAccess />;
  }

  // Check cookie
  const hasAccess = cookieStore.get("seo_access")?.value === "truestar2026";
  if (!hasAccess) {
    redirect("/");
  }

  return <SeoChecklistClient checklist={seoChecklist} />;
}
