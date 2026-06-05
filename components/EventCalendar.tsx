import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/content/events";

type CalendarEvent = EventItem & {
  sortDate: Date;
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

function parseCalendarDate(value: string) {
  const [year, month, day = 1] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function getMonthKey(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getUTCFullYear();
  const month = monthDate.getUTCMonth();
  const firstDay = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const leadingBlankDays = firstDay.getUTCDay();

  return [
    ...Array.from({ length: leadingBlankDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];
}

function toCalendarEvent(event: EventItem): CalendarEvent {
  return {
    ...event,
    sortDate: parseCalendarDate(event.calendarDay ?? event.calendarMonth)
  };
}

function sortCalendarEvents(a: CalendarEvent, b: CalendarEvent) {
  if (a.status !== b.status) {
    return a.status === "Upcoming" ? -1 : 1;
  }

  return a.status === "Upcoming"
    ? a.sortDate.getTime() - b.sortDate.getTime()
    : b.sortDate.getTime() - a.sortDate.getTime();
}

function EventDetail({ event }: { event: CalendarEvent }) {
  return (
    <article className="rounded-lg border border-cotton-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <span className="rounded-full bg-cotton-100 px-2.5 py-1 text-cotton-800">{event.category}</span>
        <span className="text-soil-700">{event.status}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-7 text-cotton-900">{event.title}</h3>
      <div className="mt-3 grid gap-2 text-sm text-cotton-900/70">
        <p className="flex items-center gap-2">
          <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0 text-cotton-700" />
          <span>{event.date}</span>
        </p>
        {event.time ? (
          <p className="flex items-center gap-2">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-cotton-700" />
            <span>{event.time}</span>
          </p>
        ) : null}
        <p className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-cotton-700" />
          <span>{event.location}</span>
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-cotton-900/70">{event.summary}</p>
    </article>
  );
}

export function EventCalendar({ events }: { events: EventItem[] }) {
  const calendarEvents = events.map(toCalendarEvent).sort(sortCalendarEvents);
  const monthKeys = Array.from(new Set(calendarEvents.map((event) => getMonthKey(event.sortDate))));
  const upcomingEvents = calendarEvents.filter((event) => event.status === "Upcoming");

  return (
    <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="grid gap-8">
        {monthKeys.map((monthKey) => {
          const monthDate = parseCalendarDate(monthKey);
          const monthEvents = calendarEvents.filter((event) => getMonthKey(event.sortDate) === monthKey);
          const datedEventsByDay = monthEvents.reduce<Record<number, CalendarEvent[]>>((accumulator, event) => {
            if (!event.calendarDay) {
              return accumulator;
            }

            const day = parseCalendarDate(event.calendarDay).getUTCDate();
            accumulator[day] = [...(accumulator[day] ?? []), event];
            return accumulator;
          }, {});
          const monthOnlyEvents = monthEvents.filter((event) => !event.calendarDay);

          return (
            <section key={monthKey} className="rounded-lg border border-cotton-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-cotton-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-serif text-2xl font-semibold text-cotton-900">{monthFormatter.format(monthDate)}</h2>
                <p className="text-sm font-medium text-cotton-900/65">
                  {monthEvents.length} {monthEvents.length === 1 ? "event" : "events"}
                </p>
              </div>
              <div className="overflow-x-auto p-4">
                <div className="min-w-[42rem]">
                  <div className="grid grid-cols-7 border-y border-cotton-200 bg-cotton-50 text-center text-xs font-semibold uppercase tracking-wide text-cotton-700">
                    {weekdayLabels.map((label) => (
                      <div key={label} className="px-2 py-3">
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 border-l border-cotton-200">
                    {getMonthDays(monthDate).map((day, index) => (
                      <div key={`${monthKey}-${index}`} className="min-h-28 border-b border-r border-cotton-200 bg-white p-2">
                        {day ? (
                          <>
                            <p className="text-sm font-semibold text-cotton-900">{day}</p>
                            <div className="mt-2 grid gap-1.5">
                              {(datedEventsByDay[day] ?? []).map((event) => (
                                <div key={event.title} className="rounded-md bg-skydata-700 px-2 py-1.5 text-xs font-semibold leading-4 text-white">
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {monthOnlyEvents.length ? (
                <div className="border-t border-cotton-200 bg-cotton-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">Month and season events</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {monthOnlyEvents.map((event) => (
                      <div key={event.title} className="rounded-md border border-cotton-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-soil-700">{event.date}</p>
                        <h3 className="mt-1 text-sm font-semibold text-cotton-900">{event.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-cotton-900/65">{event.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <aside className="h-fit rounded-lg border border-cotton-200 bg-white p-5 shadow-sm xl:sticky xl:top-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">Agenda</p>
        <h2 className="mt-2 text-2xl font-semibold text-cotton-900">Upcoming Events</h2>
        <div className="mt-5 grid gap-4">
          {(upcomingEvents.length ? upcomingEvents : calendarEvents).map((event) => (
            <EventDetail key={event.title} event={event} />
          ))}
        </div>
      </aside>
    </div>
  );
}
