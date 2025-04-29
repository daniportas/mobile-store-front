import { useState, useEffect } from "react";

/**
 * Custom hook to manage a value synced with localStorage.
 *
 * @param {string} key - The key in localStorage.
 * @param {*} initialValue - The initial value if no item exists in localStorage.
 * @returns {[any, Function]} - A stateful value and a function to update it.
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize the state from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  /**
   * Set a new value in both state and localStorage
   * @param {any} value - New value or updater function
   */
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  /**
   * Sync state if localStorage is updated externally (e.g., in another tab)
   */
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error("Error syncing localStorage key:", key, error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
};
