import Link from "next/link";
import { IwrcLogo } from "@/components/IwrcLogo";
import { contact, flatNavItems, siteProfile } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-cotton-200 bg-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <IwrcLogo aria-hidden="true" className="h-11 w-11 shrink-0 shadow-sm" />
            <div>
              <p className="text-lg font-black leading-none text-cotton-900">{contact.shortName}</p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cotton-700">
                Weed recognition
              </p>
            </div>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cotton-900/75">
            {siteProfile.valueProposition}
          </p>
          <p className="mt-4 text-sm text-cotton-900/75">
            {contact.organization}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">Contact</p>
            <address className="mt-3 text-sm not-italic leading-6 text-cotton-900/75">
              <a className="focus-ring rounded-sm underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <br />
              <a className="focus-ring rounded-sm underline" href={contact.sourceUrl}>
                Source website
              </a>
            </address>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">Site</p>
            <div className="mt-3 grid gap-2">
              {flatNavItems.slice(1, 6).map((item) => (
                <Link key={item.href} href={item.href} className="focus-ring rounded-sm text-sm text-cotton-900/75 hover:text-cotton-900">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
