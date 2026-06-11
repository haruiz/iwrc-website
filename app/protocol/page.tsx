import type { Metadata } from "next";
import Image from "next/image";
import { Camera, Database, ExternalLink, FileText, ScanLine } from "lucide-react";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { protocols } from "@/content/protocols";
import { getAssetPath } from "@/utils/path";

export const metadata: Metadata = {
  title: "Protocol",
  description: "IWRC image collection protocol resources for weed recognition dataset development."
};

export default function ProtocolPage() {
  return (
    <div className="bg-cotton-50">
      <section className="container-page py-12 sm:py-16 lg:py-20">
        <div className="overflow-hidden rounded-[2rem] border border-cotton-200 bg-white shadow-soft">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cotton-700">Protocol</p>
              <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-cotton-900 sm:text-5xl">
                Capture field images that become reliable research data.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-cotton-900/70 sm:text-lg">
                Shared collection procedures help teams produce consistent imagery for annotation, dataset publication, and weed recognition model training.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-cotton-50 p-4">
                  <Camera className="h-5 w-5 text-cotton-700" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-cotton-900">Consistent capture</p>
                </div>
                <div className="rounded-xl bg-cotton-50 p-4">
                  <ScanLine className="h-5 w-5 text-cotton-700" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-cotton-900">Clear annotation</p>
                </div>
                <div className="rounded-xl bg-cotton-50 p-4">
                  <Database className="h-5 w-5 text-cotton-700" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-cotton-900">Reusable datasets</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[30rem] overflow-hidden bg-cotton-900 lg:min-h-[38rem]">
              <Image
                src={getAssetPath("/images/iwrc-field-camera-team.webp")}
                alt="Researchers collecting plant images and field observations using a camera and tablet"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cotton-900/75 via-transparent to-cotton-900/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="max-w-sm rounded-2xl border border-white/20 bg-cotton-900/65 p-5 text-white shadow-soft backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cotton-200">Field collection in practice</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Repeatable camera placement, environmental context, and clear study records improve the long-term value of every image.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cotton-200 bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            eyebrow="Downloads"
            title="Image collection resources"
            description="Choose a reference format for field cameras or mobile-device collection workflows."
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
      </section>
    </div>
  );
}
