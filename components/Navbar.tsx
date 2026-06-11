"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { IwrcLogo } from "@/components/IwrcLogo";
import { navItems } from "@/content/site";

function hasNestedItems(item: (typeof navItems)[number]): item is Extract<(typeof navItems)[number], { items: readonly unknown[] }> {
  return "items" in item;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cotton-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <nav className="container-page flex min-h-16 items-center justify-between gap-4" aria-label="Primary navigation">
        <Link href="/" className="focus-ring group rounded-md">
          <IwrcLogo
            variant="wordmark"
            className="h-12 w-auto max-w-28 object-contain object-left transition duration-200 group-hover:scale-105 sm:max-w-32"
          />
        </Link>
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-cotton-200 text-cotton-900 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
        <div className="hidden items-center gap-1 rounded-full border border-cotton-200 bg-cotton-50/80 p-1 lg:flex">
          {navItems.map((item) => (
            hasNestedItems(item) ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="focus-ring inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-cotton-900 hover:bg-white hover:shadow-sm"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={14}
                    className="transition duration-200 group-hover:rotate-180"
                  />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-md border border-cotton-200 bg-white p-2 opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.items.map((nestedItem) => (
                    <Link
                      key={nestedItem.href}
                      href={nestedItem.href}
                      className="focus-ring block rounded-md px-3 py-2 text-sm font-medium text-cotton-900 hover:bg-cotton-100"
                    >
                      {nestedItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-3 py-2 text-sm font-medium text-cotton-900 hover:bg-white hover:shadow-sm"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </nav>
      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-cotton-200 bg-white lg:hidden">
          <div className="container-page grid gap-3 py-3">
            {navItems.map((item) => (
              hasNestedItems(item) ? (
                <div key={item.label} className="grid gap-1">
                  <p className="px-3 text-xs font-bold uppercase tracking-[0.16em] text-cotton-700">{item.label}</p>
                  {item.items.map((nestedItem) => (
                    <Link
                      key={nestedItem.href}
                      href={nestedItem.href}
                      className="focus-ring rounded-md px-3 py-3 text-sm font-medium text-cotton-900 hover:bg-cotton-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {nestedItem.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-md px-3 py-3 text-sm font-medium text-cotton-900 hover:bg-cotton-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
