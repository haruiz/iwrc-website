export type EventItem = {
  title: string;
  date: string;
  calendarMonth: `${number}-${number}`;
  calendarDay?: `${number}-${number}-${number}`;
  location: string;
  status: "Upcoming" | "Past";
  category: "Community" | "Conference" | "Workshop";
  time?: string;
  summary: string;
  href?: string;
};

// Add calendarDay when an event has a confirmed date. Month-only events still appear in the calendar agenda.
export const events: EventItem[] = [
  {
    title: "International Weed Science Society (IWSS)",
    date: "December 1-5, 2025",
    calendarMonth: "2025-12",
    calendarDay: "2025-12-01",
    location: "International Weed Science Congress",
    status: "Past",
    category: "Conference",
    time: "8:00 AM, Dec 1 to 5:00 PM, Dec 5",
    summary: "A major international gathering for weed science researchers and collaborators, listed on the reference site as an IWRC event.",
    href: "https://www.iwsc2024.com"
  },
  {
    title: "Future IWRC events",
    date: "To be announced",
    calendarMonth: "2026-12",
    location: "IWRC network",
    status: "Upcoming",
    category: "Community",
    summary: "Additional workshops and consortium activities will be listed after dates and hosting details are approved."
  }
];
