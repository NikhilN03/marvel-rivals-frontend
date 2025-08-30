import { useMemo, useState } from "react";

/** ---------- Mock data (replace with API later) ---------- */
type Thread = {
  id: string;
  title: string;
  author: string;
  createdAt: string; // ISO
  comments: number;
};

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

// A small sample set; add as many as you want.
const ALL_THREADS: Thread[] = [
  { id: "1",  title: "Pickems: GC 25 BR Finals", author: "sk",        createdAt: new Date(now - 19*60*60*1000).toISOString(), comments: 55 },
  { id: "2",  title: "Pickems: EMEA S3 Groups",  author: "sk",        createdAt: new Date(now - 3*day).toISOString(),          comments: 37 },
  { id: "3",  title: "Pickems: AMER S2 Playoffs",author: "sk",        createdAt: new Date(now - 7*day + 2*60*60*1000).toISOString(), comments: 46 },
  { id: "4",  title: "Patch 1.0 balance talk",   author: "mousa",     createdAt: new Date(now - 2*day).toISOString(),          comments: 33 },
  { id: "5",  title: "Controller tips for Rivals",author: "tomo",     createdAt: new Date(now - 5*day).toISOString(),          comments: 17 },
  { id: "6",  title: "Open qualifier announced", author: "mod",       createdAt: new Date(now - 1*day - 2*60*60*1000).toISOString(), comments: 28 },
  { id: "7",  title: "LF squad for ranked",      author: "nova",      createdAt: new Date(now - 6*day - 3*60*60*1000).toISOString(), comments: 21 },
  { id: "8",  title: "Esports roadmap 2025",     author: "staff",     createdAt: new Date(now - 8*day).toISOString(),          comments: 90 }, // out of 7-day window
  { id: "9",  title: "What hero needs a nerf?",  author: "echo",      createdAt: new Date(now - 6*60*60*1000).toISOString(),   comments: 12 },
  { id: "10", title: "Streamer highlights",      author: "clips",     createdAt: new Date(now - 50*60*1000).toISOString(),     comments: 9  },
  { id: "11", title: "Meta predictions",         author: "zenith",    createdAt: new Date(now - 4*day - 5*60*60*1000).toISOString(), comments: 25 },
  { id: "12", title: "New skins discussion",     author: "scarlet",   createdAt: new Date(now - 3*60*60*1000).toISOString(),   comments: 6  },
  { id: "13", title: "Beginner FAQ",             author: "mod",       createdAt: new Date(now - 2*60*60*1000).toISOString(),   comments: 4  },
  { id: "14", title: "Favorite maps",            author: "night",     createdAt: new Date(now - 9*60*60*1000).toISOString(),   comments: 11 },
  { id: "15", title: "Team recruitment board",   author: "coach",     createdAt: new Date(now - 20*60*60*1000).toISOString(),  comments: 7  },
  { id: "16", title: "Bug reports 1.0",          author: "qa",        createdAt: new Date(now - 30*60*60*1000).toISOString(),  comments: 13 },
  { id: "17", title: "Best sensitivities",       author: "aimlab",    createdAt: new Date(now - 5*60*60*1000).toISOString(),   comments: 8  },
  { id: "18", title: "LAN meetup planning",      author: "community", createdAt: new Date(now - 6*day - 2*60*60*1000).toISOString(), comments: 19 },
  { id: "19", title: "Graphics settings guide",  author: "tech",      createdAt: new Date(now - 70*60*60*1000).toISOString(),  comments: 15 },
  { id: "20", title: "Clutch moments thread",    author: "hype",      createdAt: new Date(now - 40*60*60*1000).toISOString(),  comments: 22 }
];

/** ---------- Helpers ---------- */
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return d === 1 ? "1 day ago" : `${d} days ago`;
  if (h > 0) return h === 1 ? "1 hour ago" : `${h} hours ago`;
  if (m > 0) return m === 1 ? "1 minute ago" : `${m} minutes ago`;
  return "just now";
}

export default function Forums() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return ALL_THREADS;
    const needle = q.toLowerCase();
    return ALL_THREADS.filter(
      (t) =>
        t.title.toLowerCase().includes(needle) ||
        t.author.toLowerCase().includes(needle)
    );
  }, [q]);

  const popularWeek = useMemo(() => {
    const weekAgo = Date.now() - 7 * day;
    return filtered
      .filter((t) => new Date(t.createdAt).getTime() >= weekAgo)
      .sort((a, b) => b.comments - a.comments)
      .slice(0, 7);
  }, [filtered]);

  const recent15 = useMemo(() => {
    return [...filtered]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">⌕</span>
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
          {popularWeek.map((t) => (
            <li key={t.id} className="flex items-center justify-between px-3 py-3 hover:bg-gray-900/60">
              <div className="min-w-0">
                <a href="#" className="line-clamp-1 font-medium text-gray-100 hover:text-brand">
                  {t.title}
                </a>
                <div className="mt-0.5 text-xs text-gray-400">
                  posted {timeAgo(t.createdAt)} • by {t.author}
                </div>
              </div>
              <span className="ml-3 shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                {t.comments} comments
              </span>
            </li>
          ))}
          {popularWeek.length === 0 && (
            <li className="px-3 py-4 text-sm text-gray-400">No threads found for this week.</li>
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
          {recent15.map((t) => (
            <li key={t.id} className="flex items-center justify-between px-3 py-3 hover:bg-gray-900/60">
              <div className="min-w-0">
                <a href="#" className="line-clamp-1 font-medium text-gray-100 hover:text-brand">
                  {t.title}
                </a>
                <div className="mt-0.5 text-xs text-gray-400">
                  posted {timeAgo(t.createdAt)} • by {t.author}
                </div>
              </div>
              <span className="ml-3 shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                {t.comments} comments
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
