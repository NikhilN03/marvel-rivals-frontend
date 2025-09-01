import createClient from "openapi-fetch";
import type { paths } from "../types/api";

const baseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

// Typed client bound to OpenAPI paths
const client = createClient<paths>({ baseUrl });

// --- Auth (optional for later, Cognito) ---
let authToken: string | null = null;
export function setAuthToken(token: string | null) {
  authToken = token;
}
client.use({
  onRequest({ request }) {
    if (authToken) request.headers.set("Authorization", `Bearer ${authToken}`);
    return request;
  },
});

export const { GET, POST } = client;

// Helper to throw on non-2xx and return typed data
export async function ok<T>(
  p: Promise<{ data?: T; error?: any; response: Response }>
): Promise<T> {
  const { data, error, response } = await p;
  if (!response.ok) {
    const msg =
      (error && (error as any).message) ||
      `${response.status} ${response.statusText}`;
    throw new Error(msg);
  }
  return data as T;
}
