import type { Metadata } from "next";
import { LegalDocPage } from "@/components/legal/LegalDocPage";
import { LEGAL_DOCS } from "@/lib/legal";

const doc = LEGAL_DOCS.zebiteDeleteData;

/**
 * This is the URL that goes in the Google Play Console's "Delete data URL"
 * field — keep the path stable.
 */
export const metadata: Metadata = {
  title: `${doc.title} | Zhevion`,
  description: doc.summary,
  alternates: { canonical: `/legal/${doc.slug}` },
};

export default function Page() {
  return <LegalDocPage doc={doc} />;
}
