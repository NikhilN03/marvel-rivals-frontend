import { useInfiniteQuery } from "@tanstack/react-query";
import { GET, ok } from "../lib/api";
import type { components } from "../types/api";

type PageThread = components["schemas"]["PageThread"];

// Fallback data so UI renders before the API exists
const FALLBACK: PageThread = {
  items: [
    { id: "t1", title: "Favorite heroes right now?", createdAt: Date.now()-1e6, lastActivityAt: Date.now()-5e5, postCount: 23 },
    { id: "t2", title: "Patch 1.0 balance talk", createdAt: Date.now()-2e6, lastActivityAt: Date.now()-8e5, postCount: 58 },
    { id: "t3", title: "LF squad for ranked", createdAt: Date.now()-3e6, lastActivityAt: Date.now()-1.2e6, postCount: 16 },
  ],
  cursor: null,
};

export function useThreads(limit = 25) {
  return useInfiniteQuery<PageThread, Error, PageThread, [string, number], string | null>({
    queryKey: ["threads", limit],
    initialPageParam: null,
    queryFn: async ({ pageParam }) =>
      ok<PageThread>(
        GET("/threads", {
          params: { query: { limit, cursor: pageParam ?? undefined } },
        })
      ),
    getNextPageParam: (last) => last.cursor ?? null,
    retry: false,
    placeholderData: { pages: [FALLBACK], pageParams: [null] },
  });
}
