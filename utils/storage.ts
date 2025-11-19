/**
 * Storage utility to replace chrome.storage.local with localStorage
 * Provides the same interface as chrome.storage.local for easy migration
 */

const STORAGE_KEYS = {
  USER_NAME: 'userName',
  THEME_COLOR: 'themeColor',
  NAVIGATION_LAYOUT: 'navigationLayout',
  AVATAR_URL: 'avatarUrl',
  CUSTOM_COLORS: 'customColors',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

/**
 * Gets a value from localStorage
 */
export function getStorage<T = string>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = localStorage.getItem(key);
    if (value === null) return null;

    // Try to parse as JSON, fall back to raw string
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

/**
 * Sets a value in localStorage
 */
export function setStorage<T = string>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * Removes a value from localStorage
 */
export function removeStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

/**
 * Clears all localStorage
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

// Export storage keys for type safety
export { STORAGE_KEYS };
