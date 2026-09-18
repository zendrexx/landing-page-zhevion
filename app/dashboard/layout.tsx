import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publishing dashboard | Zhevion",
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
