import type { Metadata } from "next";
import { LegalDocPage } from "@/components/legal/LegalDocPage";
import { LEGAL_DOCS } from "@/lib/legal";

const doc = LEGAL_DOCS.repforgePrivacy;

/** The URL for RepForge's Play/App Store listing — keep the path stable. */
export const metadata: Metadata = {
  title: `${doc.title} | Zhevion`,
  description: doc.summary,
  alternates: { canonical: `/legal/${doc.slug}` },
};

export default function Page() {
  return <LegalDocPage doc={doc} />;
}
