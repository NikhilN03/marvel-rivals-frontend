import { useInfiniteQuery } from "@tanstack/react-query";
import { GET, ok } from "../lib/api";
import type { components } from "../types/api";

type PageComment = components["schemas"]["PageComment"];

export function useComments(threadId: string, since?: number, limit = 50) {
  return useInfiniteQuery<PageComment, Error, PageComment, [string, string, number | undefined, number], string | null>({
    enabled: !!threadId,
    queryKey: ["comments", threadId, since, limit],
    initialPageParam: null,
    queryFn: async ({ pageParam }) =>
      ok<PageComment>(
        GET("/threads/{threadId}/comments", {
          params: {
            path: { threadId },
            query: { since, limit, cursor: pageParam ?? undefined },
          },
        })
      ),
    getNextPageParam: (last) => last.cursor ?? null,
    retry: false,
  });
}
