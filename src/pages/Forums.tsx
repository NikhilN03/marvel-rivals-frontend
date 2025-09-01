import { useMemo, useState } from "react";
import { useThreads } from "../hooks/useThreads";
import type { components } from "../types/api";

// OpenAPI-derived types
type Thread = components["schemas"]["Thread"];
type PageThread = components["schemas"]["PageThread"];

/** ---------- Helpers ---------- */
function timeAgo(ms: number) {
  const diff = Date.now() - ms;
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return d === 1 ? "1 day ago" : `${d} days ago`;
  if (h > 0) return h === 1 ? "1 hour ago" : `${h} hours ago`;
  if (m > 0) return m === 1 ? "1 minute ago" : `${m} minutes ago`;
  return "just now";
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Flattens whatever shape useThreads() gives us into a Thread[] safely.
 * Supports both InfiniteData<PageThread> (data.pages) and PageThread (data.items).
 */
function flattenThreads(data: unknown): Thread[] {
  if (!data) return [];

  // Case A: InfiniteData<PageThread> (React Query infinite)
  const maybeInfinite = data as { pages?: PageThread[] };
  if (Array.isArray(maybeInfinite.pages)) {
    return maybeInfinite.pages.flatMap((p: PageThread) => p.items ?? []);
  }

  // Case B: Single PageThread
  const maybeSingle = data as PageThread;
  if (Array.isArray(maybeSingle.items)) {
    return maybeSingle.items;
  }

  return [];
}

export default function Forums() {
  const [q, setQ] = useState("");

  // ✅ Typed + safe flattening (replaces data?.pages.flatMap(...))
  const { data } = useThreads(25);
  const threads: Thread[] = useMemo(() => flattenThreads(data), [data]);

  // Search filter (title + authorId if present)
  const filtered: Thread[] = useMemo(() => {
    if (!q.trim()) return threads;
    const needle = q.toLowerCase();
    return threads.filter((t: Thread) => {
      const inTitle = t.title.toLowerCase().includes(needle);
      const inAuthor = (t.authorId ?? "").toLowerCase().includes(needle);
      return inTitle || inAuthor;
    });
  }, [q, threads]);

  // Top 7 this week by comment count (postCount)
  const popularWeek: Thread[] = useMemo(() => {
    const weekAgo = Date.now() - 7 * DAY_MS;
    return filtered
      .filter((t: Thread) => (t.createdAt ?? 0) >= weekAgo)
      .sort((a: Thread, b: Thread) => (b.postCount ?? 0) - (a.postCount ?? 0))
      .slice(0, 7);
  }, [filtered]);

  // Most recent 15 by createdAt desc
  const recent15: Thread[] = useMemo(() => {
    return [...filtered]
      .sort((a: Thread, b: Thread) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      .slice(0, 15);
  }, [filtered]);

  return (
    <div className="w-full px-4 py-6">
      {/* Page-level search (centered) */}
      <div className="mx-auto mb-6 max-w-2xl">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search threads…"
            className="w-full rounded-md border border-gray-800 bg-gray-900/70 px-4 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ⌕
          </span>
        </div>
      </div>

      {/* Popular this week */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Top This Week
          </h2>
          <div className="text-xs text-gray-500">7 days • by comments</div>
        </div>
        <ul className="divide-y divide-gray-800 overflow-hidden rounded-md border border-gray-800 bg-gray-950">
          {popularWeek.map((t: Thread) => (
            <li
              key={t.id}
              className="flex items-center justify-between px-3 py-3 hover:bg-gray-900/60"
            >
              <div className="min-w-0">
                <a
                  href="#"
                  className="line-clamp-1 font-medium text-gray-100 hover:text-brand"
                >
                  {t.title}
                </a>
                <div className="mt-0.5 text-xs text-gray-400">
                  posted {timeAgo(t.createdAt)} • by {t.authorId ?? "anonymous"}
                </div>
              </div>
              <span className="ml-3 shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                {t.postCount ?? 0} comments
              </span>
            </li>
          ))}
          {popularWeek.length === 0 && (
            <li className="px-3 py-4 text-sm text-gray-400">
              No threads found for this week.
            </li>
          )}
        </ul>
      </section>

      {/* Recent threads */}
      <section>
        <div className="mb-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Most Recent
          </h2>
        </div>
        <ul className="divide-y divide-gray-800 overflow-hidden rounded-md border border-gray-800 bg-gray-950">
          {recent15.map((t: Thread) => (
            <li
              key={t.id}
              className="flex items-center justify-between px-3 py-3 hover:bg-gray-900/60"
            >
              <div className="min-w-0">
                <a
                  href="#"
                  className="line-clamp-1 font-medium text-gray-100 hover:text-brand"
                >
                  {t.title}
                </a>
                <div className="mt-0.5 text-xs text-gray-400">
                  posted {timeAgo(t.createdAt)} • by {t.authorId ?? "anonymous"}
                </div>
              </div>
              <span className="ml-3 shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                {t.postCount ?? 0} comments
              </span>
            </li>
          ))}
          {recent15.length === 0 && (
            <li className="px-3 py-4 text-sm text-gray-400">
              No recent threads found.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
