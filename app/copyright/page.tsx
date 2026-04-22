import type { Metadata } from "next";
import { Copyright } from "@/src/app/components/copyright";

export const metadata: Metadata = {
  title: "Copyright & Terms of Use",
  description: "Copyright and terms of use for KLR-EVROPA d.o.o. — KLR Europe.",
  alternates: { canonical: "/copyright" },
  robots: { index: false },
};

export default function Page() {
  return <Copyright />;
}
