import heroImg from "../assets/images/unloadedimgrivals.png";

type Thread = { id: string; title: string; replies: number };
type News = { id: string; title: string; date: string };

const recentThreads: Thread[] = [
  { id: "t1", title: "Favorite heroes right now?", replies: 23 },
  { id: "t2", title: "Patch 1.0 balance talk", replies: 58 },
  { id: "t3", title: "LF squad for ranked", replies: 16 },
  { id: "t4", title: "Best controller configs", replies: 9 },
  { id: "t5", title: "Tournament ideas", replies: 31 },
  { id: "t6", title: "New skins discussion", replies: 12 },
  { id: "t7", title: "PC vs Console aim", replies: 44 },
  { id: "t8", title: "Meta predictions", replies: 27 },
  { id: "t9", title: "Clutch moments clips", replies: 14 },
  { id: "t10", title: "Streamer highlights", replies: 7 }
];

const newsList: News[] = [
  { id: "n2", title: "Team A signs superstar DPS", date: "Aug 27" },
  { id: "n3", title: "Open qualifier announced", date: "Aug 26" },
  { id: "n4", title: "Patch notes overview", date: "Aug 25" },
  { id: "n5", title: "Community tournament wrap-up", date: "Aug 24" },
  { id: "n6", title: "Hero rework preview", date: "Aug 22" },
  { id: "n7", title: "Esports roadmap 2025", date: "Aug 20" }
];

const streamers: { name: string; viewers: number }[] = [
  { name: "StreamerOne", viewers: 8123 },
  { name: "RivalsPro", viewers: 6504 },
  { name: "AimLegend", viewers: 5401 },
  { name: "ClutchKing", viewers: 4280 },
  { name: "NightFox", viewers: 3765 },
  { name: "Marauder", viewers: 2991 },
  { name: "ScarletMage", viewers: 2655 },
  { name: "Zenith", viewers: 2122 },
  { name: "Quasar", viewers: 1888 },
  { name: "Echo", viewers: 1705 }
];

export default function Home() {
  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        {/* Left: recent threads */}
        <aside className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Recent Threads
          </h2>
          <ul className="divide-y divide-gray-800 overflow-hidden rounded-md border border-gray-800 bg-gray-950">
            {recentThreads.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/70"
              >
                <a href="#" className="line-clamp-1 text-sm text-gray-200 hover:text-brand">
                  {t.title}
                </a>
                <span className="ml-3 shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                  {t.replies}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Center: hero news + more boxes */}
        <section className="space-y-4">
          {/* Hero card with title over image */}
          <article className="relative overflow-hidden rounded-md border border-gray-800">
            <img
              src={heroImg}
              alt="Headline"
              className="h-64 w-full object-cover md:h-80"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <span className="mb-2 inline-block rounded bg-brand/90 px-2 py-0.5 text-xs font-semibold">
                Breaking
              </span>
              <h3 className="text-xl font-bold leading-tight md:text-2xl">
                NRG, Cloud9 advance to the Americas top four
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Full recap, highlights, and bracket implications inside.
              </p>
            </div>
          </article>

          {/* More news */}
          <div className="grid gap-3 sm:grid-cols-2">
            {newsList.map((n) => (
              <article
                key={n.id}
                className="rounded-md border border-gray-800 bg-gray-950 p-3 hover:bg-gray-900/60"
              >
                <div className="text-xs text-gray-400">{n.date}</div>
                <h4 className="mt-1 line-clamp-2 text-base font-semibold text-gray-100 hover:text-brand">
                  <a href="#">{n.title}</a>
                </h4>
              </article>
            ))}
          </div>
        </section>

        {/* Right: trending streamers */}
        <aside className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Trending Streamers
          </h2>
          <div className="rounded-md border border-gray-800 bg-gray-950">
            <ul className="divide-y divide-gray-800">
              {streamers.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-brand">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-200">{s.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{s.viewers.toLocaleString()} watching</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-800 px-3 py-2 text-right text-xs text-gray-400">
              Total viewers:{" "}
              {streamers.reduce((a, b) => a + b.viewers, 0).toLocaleString()}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
