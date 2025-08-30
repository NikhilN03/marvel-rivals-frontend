import { useMemo, useState } from "react";
import placeholderAvatar from "../assets/images/unloadedimgrivals.png";

/** ---------------- Types ---------------- */
type RegionKey = "GLOBAL" | "NA" | "EU" | "ASIA" | "SA";

type PlayerRow = {
  playerId: string;
  playerName: string;
  rank: number;
  rating: number;
  countryCode: string;   // ISO-2
  avatarUrl?: string;    // thumbnail
  winRate: number;       // 0..1 (e.g. 0.62 = 62%)
  kda: number;           // (K + A) / D
  adr: number;           // average damage/round
  region: RegionKey;
  updatedAt: string;     // ISO
};

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

// Format %
const pct = (v: number) => `${Math.round(v * 100)}%`;
const num = (n: number) => n.toLocaleString();

/** ---------------- Mock Data (replace with API later) ---------------- */
const UPDATED_AT = new Date().toISOString();

// a tiny helper to create rows
function row(
  i: number,
  name: string,
  region: RegionKey,
  countryCode: string,
  rating: number,
  win: number,
  kda: number,
  adr: number
): PlayerRow {
  return {
    playerId: `p${region}-${i}`,
    playerName: name,
    rank: i,
    rating,
    countryCode,
    avatarUrl: placeholderAvatar, // swap with real avatar later
    winRate: win,
    kda,
    adr,
    region,
    updatedAt: UPDATED_AT,
  };
}

// Some static players per region (Top 10 each)
const DATA: PlayerRow[] = [
  // GLOBAL (could be separate from regional—here we just seed a set)
  row(1, "Crimson", "GLOBAL", "US", 2987, 0.66, 3.1, 164),
  row(2, "Zenith", "GLOBAL", "SE", 2930, 0.63, 2.8, 157),
  row(3, "Katana", "GLOBAL", "JP", 2895, 0.61, 2.7, 152),
  row(4, "Nova", "GLOBAL", "KR", 2872, 0.60, 2.6, 149),
  row(5, "Marauder", "GLOBAL", "BR", 2830, 0.59, 2.5, 147),
  row(6, "Valkyrie", "GLOBAL", "DE", 2811, 0.58, 2.4, 144),
  row(7, "Echo", "GLOBAL", "GB", 2795, 0.57, 2.3, 142),
  row(8, "Spectre", "GLOBAL", "CA", 2782, 0.57, 2.3, 141),
  row(9, "Quasar", "GLOBAL", "FR", 2769, 0.56, 2.2, 139),
  row(10, "Falcon", "GLOBAL", "US", 2755, 0.55, 2.1, 137),

  // NA
  row(1, "Crimson", "NA", "US", 2987, 0.66, 3.1, 164),
  row(2, "Echo", "NA", "CA", 2795, 0.57, 2.3, 142),
  row(3, "Falcon", "NA", "US", 2755, 0.55, 2.1, 137),
  row(4, "Havoc", "NA", "US", 2711, 0.54, 2.0, 135),
  row(5, "Sable", "NA", "CA", 2690, 0.53, 2.0, 133),
  row(6, "Raptor", "NA", "US", 2674, 0.52, 1.9, 131),
  row(7, "Vantage", "NA", "US", 2660, 0.52, 1.9, 130),
  row(8, "Lyric", "NA", "US", 2645, 0.51, 1.9, 129),
  row(9, "Pulse", "NA", "US", 2631, 0.51, 1.8, 128),
  row(10, "Strider", "NA", "US", 2619, 0.50, 1.8, 127),

  // EU
  row(1, "Zenith", "EU", "SE", 2930, 0.63, 2.8, 157),
  row(2, "Valkyrie", "EU", "DE", 2811, 0.58, 2.4, 144),
  row(3, "Quasar", "EU", "FR", 2769, 0.56, 2.2, 139),
  row(4, "Aegis", "EU", "GB", 2735, 0.55, 2.1, 136),
  row(5, "Arc", "EU", "PL", 2718, 0.54, 2.0, 134),
  row(6, "Sol", "EU", "ES", 2702, 0.53, 2.0, 133),
  row(7, "Sable", "EU", "IT", 2689, 0.53, 1.9, 132),
  row(8, "Nyx", "EU", "NL", 2671, 0.52, 1.9, 131),
  row(9, "Rune", "EU", "DK", 2650, 0.52, 1.9, 130),
  row(10, "Frost", "EU", "FI", 2633, 0.51, 1.8, 129),

  // ASIA
  row(1, "Katana", "ASIA", "JP", 2895, 0.61, 2.7, 152),
  row(2, "Nova", "ASIA", "KR", 2872, 0.60, 2.6, 149),
  row(3, "Blaze", "ASIA", "CN", 2742, 0.55, 2.1, 136),
  row(4, "Oni", "ASIA", "JP", 2721, 0.54, 2.0, 134),
  row(5, "Drake", "ASIA", "KR", 2705, 0.53, 2.0, 133),
  row(6, "Lotus", "ASIA", "TW", 2690, 0.53, 1.9, 132),
  row(7, "Rin", "ASIA", "JP", 2673, 0.52, 1.9, 131),
  row(8, "Feng", "ASIA", "CN", 2655, 0.52, 1.9, 130),
  row(9, "Yoru", "ASIA", "JP", 2640, 0.51, 1.8, 129),
  row(10, "Jin", "ASIA", "KR", 2628, 0.51, 1.8, 128),

  // SA
  row(1, "Marauder", "SA", "BR", 2830, 0.59, 2.5, 147),
  row(2, "Azul", "SA", "AR", 2710, 0.54, 2.0, 134),
  row(3, "Lobo", "SA", "CL", 2693, 0.53, 2.0, 133),
  row(4, "Sombra", "SA", "PE", 2675, 0.52, 1.9, 131),
  row(5, "Furia", "SA", "BR", 2660, 0.52, 1.9, 130),
  row(6, "Rayo", "SA", "UY", 2644, 0.51, 1.8, 129),
  row(7, "Puma", "SA", "MX", 2630, 0.51, 1.8, 128),
  row(8, "Tigre", "SA", "BR", 2616, 0.50, 1.8, 127),
  row(9, "Condor", "SA", "BO", 2605, 0.50, 1.7, 126),
  row(10, "Andes", "SA", "CL", 2592, 0.49, 1.7, 125),
];

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

  // choose dataset
  const rows = useMemo(() => {
    return DATA.filter((r) => r.region === region).slice(0, 10);
  }, [region]);

  const updatedAt = useMemo(() => {
    const latest = rows.reduce<string>((acc, r) => (r.updatedAt > acc ? r.updatedAt : acc), UPDATED_AT);
    return formatUpdated(latest);
  }, [rows]);

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
            <div
              key={p.playerId}
              className="rounded-md border border-gray-800 bg-gray-950 p-3"
            >
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
