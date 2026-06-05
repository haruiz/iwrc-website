import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { protocols } from "@/content/protocols";

export const metadata: Metadata = {
  title: "Protocol",
  description: "IWRC image collection protocol resources for weed recognition dataset development."
};

export default function ProtocolPage() {
  return (
    <div className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Protocol"
          title="Image collection resources"
          description="Shared collection procedures help teams produce field imagery that can support annotation, dataset publication, and algorithm training."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {protocols.map((protocol) => (
            <Card key={`${protocol.title}-${protocol.format}`} title={protocol.title} description={protocol.summary} meta={protocol.format}>
              <div className="flex items-center justify-between gap-4">
                <FileText className="h-7 w-7 text-cotton-700" aria-hidden="true" />
                <a href={protocol.href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-md border border-cotton-300 px-3 py-2 text-sm font-semibold text-cotton-900 hover:bg-cotton-100">
                  Source resource
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
