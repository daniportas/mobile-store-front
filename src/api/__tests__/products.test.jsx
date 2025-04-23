import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchProductList } from "../products";

const mockResponse = [{ id: "1", brand: "Samsung", model: "Galaxy" }];
const CACHE_KEY = "mobile-store:product-list";
const timestamp = Date.now();

beforeEach(() => {
  localStorage.clear();
  vi.resetAllMocks();
});

describe("fetchProductList", () => {
  it("returns cached data if cache is fresh", async () => {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: mockResponse, timestamp })
    );

    const result = await fetchProductList();
    expect(result).toEqual(mockResponse);
  });

  it("fetches from API if cache is expired", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })
    );

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: [], timestamp: timestamp - 1000 * 60 * 61 }) // 61 min
    );

    const result = await fetchProductList();
    expect(fetch).toHaveBeenCalledOnce();
    expect(result).toEqual(mockResponse);
  });

  it("fetches from API if no cache exists", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })
    );

    const result = await fetchProductList();
    expect(fetch).toHaveBeenCalledOnce();
    expect(result).toEqual(mockResponse);
  });

  it("stores result in localStorage after fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })
    );

    await fetchProductList();
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    expect(cached.data).toEqual(mockResponse);
  });

  it("throws error if fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(fetchProductList()).rejects.toThrow(
      "Error fetching product list"
    );
  });
});
