import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { publicDatasets } from "@/content/datasets";

export const metadata: Metadata = {
  title: "Public Datasets",
  description: "Public weed and crop datasets cited by IWRC, grouped by year for static browsing."
};

export default function PublicDatasetsPage() {
  const years = Array.from(new Set(publicDatasets.map((dataset) => dataset.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Public Datasets"
          title="Public weed and crop dataset index"
          description="The reference site organizes public weed and crop datasets cited in Weed-Datasets-Survey-2023. This page keeps those entries in a structured local content file for easier maintenance."
        />
        <div className="mt-10 grid gap-8">
          {years.map((year) => (
            <section key={year} className="border-t border-cotton-200 pt-6">
              <h2 className="font-serif text-3xl font-semibold text-cotton-900">{year}</h2>
              <div className="mt-5 grid gap-3">
                {publicDatasets.filter((dataset) => dataset.year === year).map((dataset) => (
                  <a key={dataset.title} href={dataset.href} target="_blank" rel="noreferrer" className="focus-ring flex flex-col gap-2 rounded-lg border border-cotton-200 bg-cotton-50 p-4 transition hover:border-cotton-300 hover:bg-white sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      <span className="block font-semibold text-cotton-900">{dataset.title}</span>
                      <span className="mt-1 block text-sm text-cotton-900/70">{dataset.source}</span>
                    </span>
                    <ExternalLink className="h-5 w-5 shrink-0 text-cotton-700" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
