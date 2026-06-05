import type { Metadata } from "next";
import { EventCalendar } from "@/components/EventCalendar";
import { SectionHeader } from "@/components/SectionHeader";
import { events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Find IWRC events, consortium activities, and weed science community gatherings.",
  openGraph: {
    title: "Events | IWRC",
    description: "IWRC events, community activities, and weed science conference updates."
  }
};

export default function EventsPage() {
  return (
    <section className="bg-cotton-50 py-16">
      <div className="container-page">
        <SectionHeader
          eyebrow="Events"
          title="Upcoming events and community listings"
          description="IWRC uses events to connect weed science researchers, dataset contributors, and precision agriculture collaborators. The December 1-5, 2025 IWSS listing from the source site is now shown as past because the current build date is June 5, 2026."
        />
        <EventCalendar events={events} />
      </div>
    </section>
  );
}
