import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  const KEY = "test-key";

  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, "default"));
    const [value] = result.current;
    expect(value).toBe("default");
  });

  it("returns the value from localStorage if present", () => {
    localStorage.setItem(KEY, JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage(KEY, "default"));
    const [value] = result.current;
    expect(value).toBe("stored");
  });

  it("updates the value and syncs with localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, "default"));
    const [, setValue] = result.current;

    act(() => {
      setValue("newValue");
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe("newValue");
    expect(JSON.parse(localStorage.getItem(KEY))).toBe("newValue");
  });

  it("accepts a function to update value", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 10));
    const [, setValue] = result.current;

    act(() => {
      setValue((prev) => prev + 5);
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(15);
  });

  it("syncs value on storage event", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, "initial"));

    act(() => {
      const event = new StorageEvent("storage", {
        key: KEY,
        newValue: JSON.stringify("synced"),
      });
      localStorage.setItem(KEY, JSON.stringify("synced"));
      window.dispatchEvent(event);
    });

    const [value] = result.current;
    expect(value).toBe("synced");
  });
});
