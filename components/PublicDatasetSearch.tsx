"use client";

import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ExternalLink, Loader2, Search } from "lucide-react";

type SearchResult = {
  title: string;
  description?: string;
  category?: string;
  href?: string;
  score?: number;
};

const DEFAULT_SEARCH_API = "http://127.0.0.1:8001/semantic-search";
const SEARCH_LIMIT = 6;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    const normalized = asString(value);
    if (normalized) return normalized;
  }
  return undefined;
}

function firstNumber(...values: unknown[]): number | undefined {
  for (const value of values) {
    const normalized = asNumber(value);
    if (normalized !== undefined) return normalized;
  }
  return undefined;
}

function getResultsArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  const record = asRecord(payload);
  if (!record) return [];

  for (const key of ["results", "matches", "items", "links", "data"]) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }

  return [];
}

function normalizeResult(item: unknown, index: number): SearchResult | null {
  const record = asRecord(item);
  if (!record) return null;

  const link = asRecord(record.link) ?? asRecord(record.document) ?? asRecord(record.item) ?? record;
  const metadata = asRecord(link.metadata) ?? asRecord(link.extra_metadata) ?? {};

  const title = firstString(link.title, link.name, link.dataset_name, metadata.title, metadata.dataset_name);
  const href = firstString(link.href, link.url, link.link, metadata.href, metadata.url);
  const description = firstString(link.description, link.summary, link.abstract, metadata.description, metadata.summary);
  const category = firstString(link.category, link.source, metadata.category, metadata.source, metadata.year);
  const score = firstNumber(record.score, record.similarity, record.cosine_similarity, record.distance);

  if (!title && !href && !description) return null;

  return {
    title: title ?? `Search result ${index + 1}`,
    href,
    description,
    category,
    score
  };
}

function buildCandidateRequests(query: string, limit: number): Array<{ url: string; init: RequestInit }> {
  const configured = process.env.NEXT_PUBLIC_DATASET_SEARCH_API_URL || DEFAULT_SEARCH_API;
  const trimmed = configured.replace(/\/docs\/?$/, "").replace(/\/$/, "");
  const endpointUrl = /\/semantic-search$/i.test(trimmed) ? trimmed : `${trimmed}/semantic-search`;

  const params = new URLSearchParams({ query, limit: String(limit) });

  return [
    {
      url: endpointUrl,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, limit })
      }
    },
    {
      url: `${endpointUrl}?${params.toString()}`,
      init: { method: "GET" }
    }
  ];
}

async function requestSemanticSearch(query: string, limit: number): Promise<SearchResult[]> {
  const requests = buildCandidateRequests(query, limit);
  let lastError = "Search API request failed.";

  for (const request of requests) {
    try {
      const response = await fetch(request.url, request.init);
      if (!response.ok) {
        lastError = `${response.status} ${response.statusText}`;
        continue;
      }

      const payload = await response.json();
      return getResultsArray(payload).map(normalizeResult).filter((result): result is SearchResult => Boolean(result));
    } catch (error) {
      lastError = error instanceof Error ? error.message : lastError;
    }
  }

  throw new Error(lastError);
}

function formatScore(score: number | undefined): string | null {
  if (score === undefined) return null;
  return Number.isInteger(score) ? String(score) : score.toFixed(3);
}

export function PublicDatasetSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const searchQuery = useQuery({
    queryKey: ["public-dataset-search", submittedQuery, SEARCH_LIMIT],
    queryFn: () => requestSemanticSearch(submittedQuery, SEARCH_LIMIT),
    enabled: submittedQuery.length > 0
  });

  const trimmedQuery = query.trim();
  const canSearch = !searchQuery.isFetching;
  const results = searchQuery.data ?? [];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSearch || !trimmedQuery) return;

    if (trimmedQuery === submittedQuery) {
      await searchQuery.refetch();
      return;
    }

    setSubmittedQuery(trimmedQuery);
  }

  return (
    <section className="mt-10 rounded-lg border border-cotton-200 bg-cotton-50 p-5 sm:p-6">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl font-semibold text-cotton-900">Search public datasets</h2>
        <p className="mt-3 text-sm leading-6 text-cotton-900/70">
          Find dataset entries by crop, weed species, sensor type, annotation task, or benchmark context.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="dataset-search" className="sr-only">
          Search public datasets
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cotton-700" aria-hidden="true" />
          <input
            id="dataset-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="semantic segmentation in crop rows"
            className="focus-ring h-12 w-full rounded-md border border-cotton-200 bg-white pl-10 pr-3 text-base text-cotton-900 placeholder:text-cotton-900/45"
          />
        </div>
        <button
          type="submit"
          disabled={!canSearch}
          className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cotton-900 px-5 text-sm font-semibold text-white transition hover:bg-cotton-700 disabled:cursor-not-allowed disabled:bg-cotton-300"
        >
          {searchQuery.isFetching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
          Search
        </button>
      </form>

      {searchQuery.isError ? (
        <div className="mt-5 flex gap-3 rounded-md border border-soil-500/30 bg-white p-4 text-sm text-cotton-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-soil-700" aria-hidden="true" />
          <p>{searchQuery.error instanceof Error ? searchQuery.error.message : "Search failed. Confirm the API is running and allows browser requests from this site."}</p>
        </div>
      ) : null}

      {searchQuery.isSuccess ? (
        <div className="mt-6">
          {results.length ? (
            <div className="grid gap-3">
              {results.map((result, index) => {
                const score = formatScore(result.score);
                const content = (
                  <>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-semibold text-cotton-900">{result.title}</span>
                      {result.description ? <span className="mt-1 text-sm leading-6 text-cotton-900/70">{result.description}</span> : null}
                      <span className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-cotton-900/60">
                        {result.category ? <span>{result.category}</span> : null}
                        {score ? <span>Match {score}</span> : null}
                      </span>
                    </span>
                    {result.href ? <ExternalLink className="h-5 w-5 shrink-0 text-cotton-700" aria-hidden="true" /> : null}
                  </>
                );

                return result.href ? (
                  <a
                    key={`${result.href}-${index}`}
                    href={result.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex gap-3 rounded-md border border-cotton-200 bg-white p-4 transition hover:border-cotton-300"
                  >
                    {content}
                  </a>
                ) : (
                  <article key={`${result.title}-${index}`} className="rounded-md border border-cotton-200 bg-white p-4">
                    {content}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="rounded-md border border-cotton-200 bg-white p-4 text-sm text-cotton-900/70">No semantic matches returned.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
