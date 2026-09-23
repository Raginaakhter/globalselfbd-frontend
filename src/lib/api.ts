// API fetch helper for frontend.
// In server components, relative URLs don't work — this resolves to the backend URL.
// In browser client components, relative URLs work and are proxied via next.config.ts rewrites.

export const getBaseUrl = () => {
  // Server-side: use the backend URL from env, fallback to localhost:5000
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";
  }
  // Client-side: relative URLs work (proxied via Next.js rewrite rule to backend)
  return "";
};

/**
 * Fetch wrapper for calling API routes from server components.
 * Handles base URL resolution and standard error handling.
 */
export async function apiFetch<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `API error ${res.status}`);
  }

  const json = await res.json();
  return json.data ?? json;
}

/**
 * Same as apiFetch but returns the full response shape { success, data, message }.
 */
export async function apiFetchRaw(path: string, init?: RequestInit) {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  return res.json();
}
