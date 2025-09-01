import { useMemo, useState } from "react";
import placeholderAvatar from "../assets/images/unloadedimgrivals.png";
import { useRankings } from "../hooks/useRankings";

/** ---------------- Types ---------------- */
type RegionKey = "GLOBAL" | "NA" | "EU" | "ASIA" | "SA";

/** ---------------- Helpers ---------------- */

// Emoji flag from ISO-2 country code (fallback to 🌐)
function flagEmoji(cc: string) {
  if (!cc || cc.length !== 2) return "🌐";
  const A = 0x1f1e6;
  const code = cc.toUpperCase();
  const chars = [...code].map((c) => String.fromCodePoint(A + (c.charCodeAt(0) - 65)));
  return chars.join("");
}

// Short date/time like "Updated: Aug 29, 2025 14:05"
function formatUpdated(iso: string) {
  const d = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return d.toLocaleString(undefined, opts);
}

// Format helpers
const pct = (v: number) => `${Math.round((v ?? 0) * 100)}%`;
const num = (n: number) => (n ?? 0).toLocaleString();

/** ---------------- Component ---------------- */
const REGION_LABELS: Record<RegionKey, string> = {
  GLOBAL: "Global",
  NA: "North America",
  EU: "Europe",
  ASIA: "Asia",
  SA: "South America",
};

export default function Rankings() {
  const [region, setRegion] = useState<RegionKey>("GLOBAL");

  // Fetch rankings for the selected region
  const { data } = useRankings(region);

  // Rows (Top 10) and updated timestamp from API payload
  const rows = useMemo(() => (data?.players ?? []).slice(0, 10), [data]);
  const updatedAt = useMemo(
    () => formatUpdated(data?.updatedAt ?? new Date().toISOString()),
    [data?.updatedAt]
  );

  const isGlobalFallback = data?.isGlobalFallback === true;

  return (
    <div className="w-full px-4 py-6">
      {/* Top Bar: Title + Region Toggle */}
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-xl font-semibold text-gray-100">Rankings</h1>

          <div className="flex flex-wrap gap-2">
            {(["GLOBAL", "NA", "EU", "ASIA", "SA"] as RegionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setRegion(key)}
                className={
                  "rounded-md border px-3 py-1.5 text-sm transition " +
                  (region === key
                    ? "border-brand bg-brand text-white"
                    : "border-gray-800 bg-gray-900/60 text-gray-300 hover:bg-gray-900")
                }
              >
                {REGION_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Optional subtle notice when falling back to GLOBAL */}
        {isGlobalFallback && (
          <div className="mb-2 rounded-md border border-amber-700/40 bg-amber-900/20 px-3 py-2 text-xs text-amber-300">
            Showing Global Top 10 for <span className="font-semibold">{REGION_LABELS[region]}</span> (regional data unavailable)
          </div>
        )}

        {/* Updated timestamp */}
        <div className="mb-2 text-xs text-gray-400">Updated: {updatedAt}</div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-md border border-gray-800 bg-gray-950 md:block">
          <table className="min-w-full table-fixed text-sm">
            <thead className="bg-gray-900/60 text-gray-300">
              <tr>
                <th className="w-16 px-3 py-2 text-left font-medium">Rank</th>
                <th className="px-3 py-2 text-left font-medium">Player</th>
                <th className="w-24 px-3 py-2 text-right font-medium">Rating</th>
                <th className="w-24 px-3 py-2 text-right font-medium">Win Rate</th>
                <th className="w-20 px-3 py-2 text-right font-medium">KDA</th>
                <th className="w-28 px-3 py-2 text-right font-medium">ADR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-center text-gray-400">
                    No stats available
                  </td>
                </tr>
              )}
              {rows.map((p) => (
                <tr key={p.playerId} className="hover:bg-gray-900/50">
                  <td className="px-3 py-2 text-gray-300">#{p.rank}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatarUrl || placeholderAvatar}
                        alt={`${p.playerName} avatar`}
                        className="h-8 w-8 rounded object-cover ring-1 ring-gray-800"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-100">{p.playerName}</span>
                          <span className="text-base">{flagEmoji(p.countryCode)}</span>
                        </div>
                        <div className="text-xs text-gray-500">{REGION_LABELS[region]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right text-gray-200">{num(p.rating)}</td>
                  <td className="px-3 py-2 text-right text-gray-200">{pct(p.winRate)}</td>
                  <td className="px-3 py-2 text-right text-gray-200">{p.kda.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-gray-200">{Math.round(p.adr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {rows.length === 0 && (
            <div className="rounded-md border border-gray-800 bg-gray-950 p-4 text-center text-sm text-gray-400">
              No stats available
            </div>
          )}
          {rows.map((p) => (
            <div key={p.playerId} className="rounded-md border border-gray-800 bg-gray-950 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">#{p.rank}</span>
                <span className="text-xs text-gray-500">{REGION_LABELS[region]}</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={p.avatarUrl || placeholderAvatar}
                  alt={`${p.playerName} avatar`}
                  className="h-10 w-10 rounded object-cover ring-1 ring-gray-800"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-100">{p.playerName}</span>
                    <span className="text-base">{flagEmoji(p.countryCode)}</span>
                  </div>
                  <div className="mt-1 grid grid-cols-3 gap-2 text-xs text-gray-300">
                    <div>
                      <div className="text-gray-400">Rating</div>
                      <div className="font-medium">{num(p.rating)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Win</div>
                      <div className="font-medium">{pct(p.winRate)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">KDA</div>
                      <div className="font-medium">{p.kda.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">ADR: {Math.round(p.adr)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer timestamp (duplicated for visibility below table on desktop too) */}
        <div className="mt-3 text-xs text-gray-500 md:hidden">Updated: {updatedAt}</div>
      </div>
    </div>
  );
}
