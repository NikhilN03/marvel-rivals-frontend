import { useQuery } from "@tanstack/react-query";
import { GET, ok } from "../lib/api";
import type { components } from "../types/api";

type NewsItem = components["schemas"]["NewsItem"];
type Payload = { items: NewsItem[] }; // normalized shape for the page

const FALLBACK: Payload = {
  items: [
    { id: "s1", title: "Week in Review", date: "Aug 28", summary: "Top roster moves and meta shifts.", imageUrl: "/images/placeholder.png", link: "#" },
    { id: "s2", title: "Patch 1.0 changes", date: "Aug 27", summary: "Buffs/nerfs and impact on play.", imageUrl: "/images/placeholder.png", link: "#" },
    { id: "s3", title: "Rising teams to watch", date: "Aug 26", summary: "Five rosters making waves.", imageUrl: "/images/placeholder.png", link: "#" },
    { id: "s4", title: "Esports roadmap", date: "Aug 25", summary: "Dates and formats for season.", imageUrl: "/images/placeholder.png", link: "#" },
  ],
};

export function useNews() {
  return useQuery<Payload>({
    queryKey: ["news"],
    // Let OpenAPI type infer (items is optional), then normalize to always { items: [] }
    queryFn: async () => {
      const resp = await ok(GET("/news"));
      return { items: resp?.items ?? [] };
    },
    retry: false,
    placeholderData: FALLBACK,
  });
}
