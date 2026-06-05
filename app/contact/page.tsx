import type { Metadata } from "next";
import { ExternalLink, Mail } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact IWRC for consortium questions, protocol resources, dataset coordination, and weed recognition collaboration.",
  openGraph: {
    title: "Contact | IWRC",
    description: "Connect with IWRC for consortium inquiries, resources, datasets, and partnerships."
  }
};

export default function ContactPage() {
  return (
    <section className="bg-white py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeader
          eyebrow="Contact"
          title="Reach the IWRC team"
          description="Use the listed consortium contact for research inquiries, member coordination, dataset questions, protocol resources, and partnership updates."
        />
        <div className="rounded-lg border border-cotton-200 bg-cotton-50 p-6 shadow-sm">
          <div className="grid gap-6">
            <div className="flex gap-4">
              <ExternalLink className="mt-1 shrink-0 text-cotton-700" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-semibold text-cotton-900">{contact.organization}</h2>
                <p className="mt-1 text-sm leading-6 text-cotton-900/70">
                  Public-facing consortium site:
                  <br />
                  <a className="focus-ring rounded-sm font-semibold text-skydata-700 underline" href={contact.sourceUrl}>
                    weedrecognition.org
                  </a>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 shrink-0 text-cotton-700" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-semibold text-cotton-900">Consortium contact</h2>
                <a className="focus-ring mt-1 inline-block rounded-sm text-sm font-semibold text-skydata-700 underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="rounded-md border border-cotton-200 bg-white p-4 text-sm leading-6 text-cotton-900/70">
              The reference site does not expose a separate street address or contact form in the accessible page text. This static page uses the public team contact present on the source site.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
