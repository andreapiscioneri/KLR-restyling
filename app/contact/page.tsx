import type { Metadata } from "next";
import { Contact } from "@/src/app/components/contact";

export const metadata: Metadata = {
  title: "Contact | We Operate in Almost 20 Countries",
  description:
    "Get in touch with KLR Europe. Headquartered in Koper, Slovenia, with offices in Italy and a partner network across 20 European markets. info@klr-europe.com",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <Contact />;
}
