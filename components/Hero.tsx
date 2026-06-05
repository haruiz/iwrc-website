import Link from "next/link";
import { ArrowRight, ScanLine } from "lucide-react";
import { BannerCarousel } from "@/components/BannerCarousel";
import { siteProfile } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cotton-900 text-white">
      <BannerCarousel />
      <div className="container-page relative z-10 flex min-h-[calc(92vh-4rem)] flex-col justify-center py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <ScanLine aria-hidden="true" size={16} />
            International Weed Recognition Consortium
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            IWRC
          </h1>
          <p className="mt-4 text-2xl font-semibold text-cotton-100 sm:text-3xl">
            Building an open, global community for weed recognition development.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
            {siteProfile.valueProposition}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-cotton-900 hover:bg-cotton-100"
            >
              Explore the vision
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/public-datasets"
              className="focus-ring inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Browse public datasets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
