import { useQuery } from "@tanstack/react-query";
import { GET, ok } from "../lib/api";
import type { components } from "../types/api";

type RankingsPayload = components["schemas"]["RankingsPayload"];

export function useRankings(region: "GLOBAL" | "NA" | "EU" | "ASIA" | "SA" = "GLOBAL") {
  return useQuery<RankingsPayload>({
    queryKey: ["rankings", region],
    queryFn: async () =>
      ok<RankingsPayload>(GET("/rankings", { params: { query: { region } } })),
    retry: false,
    // Dynamic placeholder so UI renders before API exists
    placeholderData: () => ({
      updatedAt: new Date().toISOString(),
      players: [
        {
          playerId: "p1",
          playerName: "Crimson",
          rank: 1,
          rating: 2987,
          countryCode: "US",
          avatarUrl: "",
          winRate: 0.66,
          kda: 3.1,
          adr: 164,
          updatedAt: new Date().toISOString(),
        },
        {
          playerId: "p2",
          playerName: "Zenith",
          rank: 2,
          rating: 2930,
          countryCode: "SE",
          avatarUrl: "",
          winRate: 0.63,
          kda: 2.8,
          adr: 157,
          updatedAt: new Date().toISOString(),
        },
        {
          playerId: "p3",
          playerName: "Katana",
          rank: 3,
          rating: 2895,
          countryCode: "JP",
          avatarUrl: "",
          winRate: 0.61,
          kda: 2.7,
          adr: 152,
          updatedAt: new Date().toISOString(),
        },
      ],
      requestedRegion: region,
      effectiveRegion: region === "GLOBAL" ? "GLOBAL" : "GLOBAL", // fallback to GLOBAL for now
      isGlobalFallback: region !== "GLOBAL",
      note: region !== "GLOBAL" ? "Showing Global Top 10 (regional data unavailable)" : undefined,
    }),
  });
}


