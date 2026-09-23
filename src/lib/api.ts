import {
  getMockSiteData,
  getMockProducts,
  getMockFeaturedProducts,
  getMockProductById,
  calculateMockCart,
  createMockOrder,
  getMockOrderById,
  getMockOrdersForUser,
  getMockCurrentUser,
  updateMockUserProfile,
  getMockWishlist,
  toggleMockWishlist,
  handleMockLogin,
} from "@/lib/mockData";

export const getBaseUrl = () => "";

/**
 * Universal Mock API Resolver for 100% Backend-Free Operation.
 * Resolves paths directly in-memory to prevent fetch errors on static or SSR builds.
 */
function resolveMockPath(path: string, init?: RequestInit): unknown {
  const [pathname, queryString] = path.split("?");
  const searchParams = new URLSearchParams(queryString || "");

  // /api/site
  if (pathname === "/api/site") {
    return getMockSiteData();
  }

  // /api/products/featured
  if (pathname === "/api/products/featured") {
    return getMockFeaturedProducts();
  }

  // /api/products
  if (pathname === "/api/products") {
    const q = searchParams.get("q") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const sort = searchParams.get("sort") ?? undefined;
    const limitStr = searchParams.get("limit");
    const limit = limitStr ? parseInt(limitStr, 10) : undefined;
    return getMockProducts({ q, category, sort, limit });
  }

  // /api/products/[id]
  if (pathname.startsWith("/api/products/")) {
    const id = pathname.replace("/api/products/", "");
    const res = getMockProductById(id);
    if (!res) throw new Error("Product not found");
    return res;
  }

  // /api/cart/calculate
  if (pathname === "/api/cart/calculate") {
    let body: { items?: { id: string; qty: number }[]; zone?: "dhaka" | "outside" } = {};
    if (init?.body && typeof init.body === "string") {
      try {
        body = JSON.parse(init.body);
      } catch {
        // ignore parse error
      }
    }
    return calculateMockCart(body.items ?? [], body.zone ?? "dhaka");
  }

  // /api/orders/track
  if (pathname === "/api/orders/track") {
    let body: { orderId?: string; email?: string } = {};
    if (init?.body && typeof init.body === "string") {
      try {
        body = JSON.parse(init.body);
      } catch {
        // ignore
      }
    }
    const order = getMockOrderById(body.orderId?.trim() ?? "", body.email?.trim());
    if (!order) throw new Error("Order not found");
    return order;
  }

  // /api/orders/[id]
  if (pathname.startsWith("/api/orders/")) {
    const id = pathname.replace("/api/orders/", "");
    const email = searchParams.get("email") ?? undefined;
    const order = getMockOrderById(id, email);
    if (!order) throw new Error("Order not found");
    return order;
  }

  // /api/orders (GET / POST)
  if (pathname === "/api/orders") {
    if (init?.method === "POST" && init?.body && typeof init.body === "string") {
      try {
        const body = JSON.parse(init.body);
        return createMockOrder(body);
      } catch {
        // ignore
      }
    }
    const user = getMockCurrentUser();
    return { orders: getMockOrdersForUser(user?.email) };
  }

  // /api/auth/login, register, refresh
  if (pathname.startsWith("/api/auth/")) {
    const action = pathname.replace("/api/auth/", "");
    if (action === "refresh") {
      const user = getMockCurrentUser() || handleMockLogin("user@globalshelfbd.com").user;
      return { user, accessToken: "mock-jwt-access-token" };
    }
    let email = "user@globalshelfbd.com";
    if (init?.body && typeof init.body === "string") {
      try {
        const parsed = JSON.parse(init.body);
        if (parsed.email) email = parsed.email;
      } catch {
        // ignore
      }
    }
    return handleMockLogin(email);
  }

  // /api/user/profile
  if (pathname === "/api/user/profile") {
    if (init?.method === "PATCH" && init?.body && typeof init.body === "string") {
      try {
        const body = JSON.parse(init.body);
        const updated = updateMockUserProfile(body.name, body.avatar);
        return { profile: updated };
      } catch {
        // ignore
      }
    }
    return { profile: getMockCurrentUser() };
  }

  // /api/wishlist
  if (pathname === "/api/wishlist") {
    if (init?.method === "POST" && init?.body && typeof init.body === "string") {
      try {
        const body = JSON.parse(init.body);
        return toggleMockWishlist(body.productId);
      } catch {
        // ignore
      }
    }
    return getMockWishlist();
  }

  // Default fallback for any other route
  return { success: true };
}

/**
 * Fetch wrapper for calling API routes from server/client components.
 * Returns mock data directly for 100% reliable backend-free execution.
 */
export async function apiFetch<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  try {
    const data = resolveMockPath(path, init) as T;
    return data;
  } catch (err) {
    if (typeof window !== "undefined") {
      try {
        const url = `${getBaseUrl()}${path}`;
        const res = await fetch(url, init);
        if (res.ok) {
          const json = await res.json();
          return json.data ?? json;
        }
      } catch {
        // fall through
      }
    }
    throw err;
  }
}

/**
 * Same as apiFetch but returns full response shape { success: true, data }.
 */
export async function apiFetchRaw(path: string, init?: RequestInit) {
  try {
    const data = resolveMockPath(path, init);
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : "Error" };
  }
}
