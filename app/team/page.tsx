import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { TeamCarousel } from "@/components/TeamCarousel";
import { teamMembers } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "International Weed Recognition Consortium team members and institutional affiliations."
};

export default function TeamPage() {
  return (
    <div className="bg-white py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Team"
          title="A global weed recognition consortium"
          description="IWRC brings together weed science, agronomy, engineering, and computer-vision expertise across universities, research agencies, and international institutions."
        />
        <TeamCarousel members={teamMembers} itemsPerPage={8} />
      </div>
    </div>
  );
}
