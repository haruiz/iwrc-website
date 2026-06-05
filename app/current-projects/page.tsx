import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Current Projects",
  description: "Current IWRC-linked weed recognition and precision agriculture projects."
};

export default function CurrentProjectsPage() {
  return (
    <div className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Current Projects"
          title="Linked initiatives advancing weed recognition"
          description="The reference site highlights active project links that connect weed recognition research with public imagery, machine learning, and sustainable agriculture communities."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} title={project.title} description={project.summary} meta={project.organization}>
              <a href={project.href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-md border border-cotton-300 px-3 py-2 text-sm font-semibold text-cotton-900 hover:bg-cotton-100">
                Visit project
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
