import type { Metadata } from "next";
import { Users } from "lucide-react";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { siteProfile } from "@/content/site";
import { teamMembers } from "@/content/team";

export const metadata: Metadata = {
  title: "Members",
  description: "IWRC membership context for weed recognition researchers, dataset contributors, and precision agriculture collaborators."
};

export default function MembersPage() {
  const countries = Array.from(new Set(teamMembers.map((member) => member.institution.split(", ").at(-1) ?? "Global")));

  return (
    <div className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Members"
          title="Built for researchers and collaborators"
          description={siteProfile.primaryAudience}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card title="Research community" description="Membership is represented through an international team of weed science and precision agriculture collaborators." meta={`${teamMembers.length} listed members`}>
            <Users className="h-7 w-7 text-cotton-700" aria-hidden="true" />
          </Card>
          <Card title="Global participation" description={`The current team list spans ${countries.length} countries and multiple institutional contexts.`} meta="International" />
          <Card title="Shared purpose" description="IWRC focuses participation around practical progress in image collection, annotation, recognition datasets, and outreach." meta="Consortium" />
        </div>
      </div>
    </div>
  );
}
