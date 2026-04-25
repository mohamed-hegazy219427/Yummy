import axios, { AxiosError, AxiosInstance } from "axios";
import { Meal, Category, Area, Ingredient } from "../types/meal";

// ── Typed API error ────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly endpoint?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Axios instance ─────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://www.themealdb.com/api/json/v1/1";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 10_000),
});

// Normalize every non-2xx into a typed ApiError
api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const status   = err.response?.status;
    const endpoint = err.config?.url ?? "unknown";
    const message  = status
      ? `Request failed with status ${status} (${endpoint})`
      : `Network error — check your connection (${endpoint})`;
    throw new ApiError(message, status, endpoint);
  },
);

// ── Retry with exponential backoff ─────────────────────────────────────────
// Retries on network errors and 5xx; never retries 4xx (client error = permanent).
async function withRetry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delay = 300,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const isClientError = err instanceof ApiError && err.status !== undefined && err.status < 500;
    if (attempts <= 1 || isClientError) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return withRetry(fn, attempts - 1, delay * 2);
  }
}

// ── In-flight deduplication ────────────────────────────────────────────────
// Concurrent calls with the same key share one network request.
const pending = new Map<string, Promise<unknown>>();

function dedupe<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (pending.has(key)) return pending.get(key) as Promise<T>;
  const req = fn().finally(() => pending.delete(key));
  pending.set(key, req);
  return req;
}

// ── Helpers ────────────────────────────────────────────────────────────────
// Wraps a single API call with deduplication + retry.
function call<T>(key: string, fn: () => Promise<T>): Promise<T> {
  return dedupe(key, () => withRetry(fn));
}

// ── Service ────────────────────────────────────────────────────────────────
export const mealService = {
  getMealsByName: (name = ""): Promise<Meal[]> =>
    call(`name:${name}`, async () => {
      const { data } = await api.get("/search.php", { params: { s: name } });
      return data.meals ?? [];
    }),

  getMealsByFirstLetter: (letter: string): Promise<Meal[]> =>
    call(`letter:${letter}`, async () => {
      const { data } = await api.get("/search.php", { params: { f: letter } });
      return data.meals ?? [];
    }),

  getMealById: (id: string): Promise<Meal | null> =>
    call(`id:${id}`, async () => {
      const { data } = await api.get("/lookup.php", { params: { i: id } });
      return data.meals?.[0] ?? null;
    }),

  getCategories: (): Promise<Category[]> =>
    call("categories", async () => {
      const { data } = await api.get("/categories.php");
      return data.categories ?? [];
    }),

  getAreas: (): Promise<Area[]> =>
    call("areas", async () => {
      const { data } = await api.get("/list.php", { params: { a: "list" } });
      return data.meals ?? [];
    }),

  getIngredients: (): Promise<Ingredient[]> =>
    call("ingredients", async () => {
      const { data } = await api.get("/list.php", { params: { i: "list" } });
      return data.meals ?? [];
    }),

  getMealsByCategory: (category: string): Promise<Meal[]> =>
    call(`category:${category}`, async () => {
      const { data } = await api.get("/filter.php", { params: { c: category } });
      return data.meals ?? [];
    }),

  getMealsByArea: (area: string): Promise<Meal[]> =>
    call(`area:${area}`, async () => {
      const { data } = await api.get("/filter.php", { params: { a: area } });
      return data.meals ?? [];
    }),

  getMealsByIngredient: (ingredient: string): Promise<Meal[]> =>
    call(`ingredient:${ingredient}`, async () => {
      const { data } = await api.get("/filter.php", { params: { i: ingredient } });
      return data.meals ?? [];
    }),
};
