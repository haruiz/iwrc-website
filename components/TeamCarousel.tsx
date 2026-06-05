"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { TeamMember } from "@/content/team";
import { getAssetPath } from "@/utils/path";

type TeamCarouselProps = {
  members: TeamMember[];
  itemsPerPage?: number;
};

export function TeamCarousel({ members, itemsPerPage = 6 }: TeamCarouselProps) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  const pages = useMemo(() => {
    const pageSize = Math.max(1, itemsPerPage);
    const pageCount = Math.ceil(members.length / pageSize);

    return Array.from({ length: pageCount }, (_, index) => ({
      page: index + 1,
      members: members.slice(index * pageSize, (index + 1) * pageSize)
    }));
  }, [itemsPerPage, members]);

  const visiblePageIndex = pages[activePageIndex] ? activePageIndex : 0;
  const activePage = pages[visiblePageIndex];

  if (!activePage) {
    return null;
  }

  const showPrevious = () => {
    setActivePageIndex((index) => (index === 0 ? pages.length - 1 : index - 1));
  };

  const showNext = () => {
    setActivePageIndex((index) => (index + 1) % pages.length);
  };

  return (
    <section className="mt-10 rounded-xl border border-cotton-200 bg-cotton-50 p-4 shadow-soft md:p-6" aria-label="IWRC team carousel">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">Team directory</p>
          <h2 className="mt-1 text-2xl font-semibold text-cotton-900">
            Page {activePage.page} of {pages.length}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-cotton-300 bg-white text-cotton-900 shadow-sm hover:bg-cotton-100"
            onClick={showPrevious}
            aria-label="Show previous team page"
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-cotton-300 bg-white text-cotton-900 shadow-sm hover:bg-cotton-100"
            onClick={showNext}
            aria-label="Show next team page"
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activePage.members.map((member) => (
          <article
            key={member.name}
            className="flex min-h-[28rem] flex-col rounded-lg border border-cotton-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:border-cotton-300 hover:shadow-soft"
          >
            <Image
              src={getAssetPath(member.picture)}
              width={320}
              height={240}
              alt={`Portrait of ${member.name}`}
              className="aspect-[4/3] w-full rounded-md bg-cotton-50 object-contain"
            />
            <span className="mt-4 block text-sm font-semibold uppercase tracking-wide text-cotton-700">
              {member.institution}
            </span>
            <span className="mt-1 block text-lg font-semibold leading-6 text-cotton-900">{member.name}</span>
            <span className="mt-2 block text-sm text-cotton-900/70">{member.position}</span>
            {member.bio ? <span className="mt-3 block text-sm leading-6 text-cotton-900/70">{member.bio}</span> : null}
            {member.profileLink ? (
              <a
                href={member.profileLink}
                target={member.profileLink.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="focus-ring mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-cotton-300 px-3 py-2 text-sm font-semibold text-cotton-900 transition hover:bg-cotton-100"
              >
                {member.profileLink.startsWith("mailto:") ? "Email" : "Profile"}
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Select a team page">
        {pages.map((page, index) => (
          <button
            key={`team-page-${page.page}`}
            type="button"
            className={`focus-ring inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-semibold transition ${
              index === visiblePageIndex
                ? "border-cotton-900 bg-cotton-900 text-white"
                : "border-cotton-300 bg-white text-cotton-900 hover:bg-cotton-100"
            }`}
            onClick={() => setActivePageIndex(index)}
          >
            {page.page}
          </button>
        ))}
      </div>
    </section>
  );
}
