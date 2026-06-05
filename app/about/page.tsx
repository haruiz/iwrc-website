import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { visionContent } from "@/content/vision";

export const metadata: Metadata = {
  title: "Vision",
  description: "IWRC vision for sensor-based weed recognition, open datasets, annotation, and precision weed control applications."
};

export default function AboutPage() {
  return (
    <div className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Vision"
          title={visionContent.title}
          description={visionContent.summary}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visionContent.context.map((item) => (
            <Card key={item.title} title={item.title} description={item.body} />
          ))}
        </div>
        <blockquote className="mt-12 border-l-4 border-cotton-700 bg-cotton-50 p-6 text-xl font-semibold leading-9 text-cotton-900">
          Promote the development and use of sensor-based weed recognition capability for advanced weed research and precision weed control applications.
        </blockquote>
      </div>
    </div>
  );
}
