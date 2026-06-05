import Link from "next/link";
import { ArrowRight, Database, FileText, Globe2, Users } from "lucide-react";
import { Card } from "@/components/Card";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { events } from "@/content/events";
import { focusAreas } from "@/content/site";
import { projects } from "@/content/projects";
import { publicDatasets } from "@/content/datasets";
import { visionContent } from "@/content/vision";

export default function Home() {
  const featuredDatasets = publicDatasets.slice(0, 4);

  return (
    <>
      <Hero />
      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">International Weed Recognition Consortium</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-cotton-900 sm:text-5xl">
              A shared home for weed recognition research and resources.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cotton-900/70">
              {visionContent.summary} The site is organized for researchers, data contributors, and precision agriculture teams that need protocols, projects, datasets, and consortium contacts.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-cotton-200 bg-cotton-50 py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Consortium Focus"
            title="From field images to reliable recognition systems"
            description="IWRC centers the practical pieces required for machine-learning weed recognition: image collection, annotation, datasets, model training, discovery, and outreach."
          />
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <div key={area} className="border-b border-cotton-200 pb-4">
                <p className="text-base font-semibold text-cotton-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Resources"
              title="Projects, protocols, and datasets"
              description="The reference site points visitors to active weed recognition projects, image collection protocol resources, and a public dataset list organized by publication year."
            />
            <Link href="/public-datasets" className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-semibold text-skydata-700 underline">
              View datasets
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card title="Current Projects" description="Explore linked initiatives including Weed AI and Precision Sustainable Agriculture." meta="Projects">
              <Globe2 className="h-7 w-7 text-cotton-700" aria-hidden="true" />
            </Card>
            <Card title="Collection Protocols" description="Find protocol resources for image collection and mobile-device workflows." meta="Protocol">
              <FileText className="h-7 w-7 text-cotton-700" aria-hidden="true" />
            </Card>
            <Card title="Public Datasets" description={`${publicDatasets.length} public weed and crop datasets are represented in the local content model.`} meta="Datasets">
              <Database className="h-7 w-7 text-cotton-700" aria-hidden="true" />
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-cotton-900 py-20 text-white">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-cotton-200">Vision Statement</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Promote sensor-based weed recognition for research and precision control.
            </h2>
          </div>
          <p className="text-base leading-7 text-white/75">
            IWRC frames weed recognition as a community challenge: useful tools require shared field practices, high-quality annotated imagery, accessible datasets, and training that helps researchers apply the technology responsibly.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="border-t border-cotton-200 pt-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-cotton-900">Current Projects</h2>
              <Link href="/current-projects" className="focus-ring rounded-sm text-sm font-semibold text-skydata-700 underline">
                All projects
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-cotton-900">{projects[0]?.title}</p>
            <p className="mt-2 text-sm leading-6 text-cotton-900/70">{projects[0]?.summary}</p>
          </div>
          <div className="border-t border-cotton-200 pt-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-cotton-900">Upcoming Event</h2>
              <Link href="/events" className="focus-ring rounded-sm text-sm font-semibold text-skydata-700 underline">
                All events
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-cotton-900">{events[0]?.title}</p>
            <p className="mt-2 text-sm leading-6 text-cotton-900/70">{events[0]?.summary}</p>
          </div>
        </div>
      </section>

      <section className="bg-cotton-50 py-20">
        <div className="container-page">
          <SectionHeader
            eyebrow="Dataset Snapshot"
            title="Public examples from the dataset index"
            description="These entries are modeled as editable local data, grouped by year on the public datasets page."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {featuredDatasets.map((dataset) => (
              <Card key={dataset.title} title={dataset.title} description={dataset.source} meta={dataset.year} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">Contact</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-cotton-900">Connect with the IWRC team</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-cotton-900/70">
                Reach out about consortium participation, protocol resources, public datasets, and weed recognition collaboration.
              </p>
            </div>
            <Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-cotton-900 px-5 py-3 text-sm font-semibold text-white hover:bg-cotton-700">
              Contact IWRC
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
