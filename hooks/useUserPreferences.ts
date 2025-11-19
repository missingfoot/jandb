import { useState, useEffect } from 'react';
import { getStorage, setStorage, STORAGE_KEYS } from '@/utils/storage';

const DEFAULT_THEME_COLOR = '#0d6efd';
const DEFAULT_NAVIGATION_LAYOUT = 'side';

export type NavigationLayout = 'top' | 'side';

export function useUserPreferences() {
  const [userName, setUserNameState] = useState<string>('');
  const [themeColor, setThemeColorState] = useState<string>(DEFAULT_THEME_COLOR);
  const [navigationLayout, setNavigationLayoutState] = useState<NavigationLayout>(DEFAULT_NAVIGATION_LAYOUT);
  const [avatarUrl, setAvatarUrlState] = useState<string>('');
  const [customColors, setCustomColorsState] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedName = getStorage(STORAGE_KEYS.USER_NAME);
    const storedColor = getStorage(STORAGE_KEYS.THEME_COLOR);
    const storedLayout = getStorage<NavigationLayout>(STORAGE_KEYS.NAVIGATION_LAYOUT);
    const storedAvatar = getStorage(STORAGE_KEYS.AVATAR_URL);
    const storedCustomColors = getStorage<string[]>(STORAGE_KEYS.CUSTOM_COLORS);

    if (storedName) setUserNameState(storedName);
    if (storedColor) setThemeColorState(storedColor);
    if (storedLayout) setNavigationLayoutState(storedLayout);
    if (storedAvatar) setAvatarUrlState(storedAvatar);
    if (storedCustomColors) setCustomColorsState(storedCustomColors);

    setIsLoading(false);
  }, []);

  // Update userName and persist to localStorage
  const setUserName = (name: string) => {
    setUserNameState(name);
    setStorage(STORAGE_KEYS.USER_NAME, name);
  };

  // Update themeColor and persist to localStorage
  const setThemeColor = (color: string) => {
    setThemeColorState(color);
    setStorage(STORAGE_KEYS.THEME_COLOR, color);
  };

  // Update navigationLayout and persist to localStorage
  const setNavigationLayout = (layout: NavigationLayout) => {
    setNavigationLayoutState(layout);
    setStorage(STORAGE_KEYS.NAVIGATION_LAYOUT, layout);
  };

  // Update avatarUrl and persist to localStorage
  const setAvatarUrl = (url: string) => {
    setAvatarUrlState(url);
    setStorage(STORAGE_KEYS.AVATAR_URL, url);
  };

  // Remove avatar
  const removeAvatar = () => {
    setAvatarUrlState('');
    setStorage(STORAGE_KEYS.AVATAR_URL, '');
  };

  // Reset theme color to default
  const resetThemeColor = () => {
    setThemeColor(DEFAULT_THEME_COLOR);
  };

  // Save custom color
  const saveCustomColor = (color: string) => {
    // Don't save if already exists
    if (customColors.includes(color)) return;

    const updatedColors = [...customColors, color];
    setCustomColorsState(updatedColors);
    setStorage(STORAGE_KEYS.CUSTOM_COLORS, updatedColors);
  };

  // Clear all custom colors
  const clearCustomColors = () => {
    setCustomColorsState([]);
    setStorage(STORAGE_KEYS.CUSTOM_COLORS, []);
  };

  const isNameSet = Boolean(userName);

  return {
    userName,
    themeColor,
    navigationLayout,
    avatarUrl,
    customColors,
    isNameSet,
    isLoading,
    setUserName,
    setThemeColor,
    setNavigationLayout,
    setAvatarUrl,
    removeAvatar,
    resetThemeColor,
    saveCustomColor,
    clearCustomColors,
    DEFAULT_THEME_COLOR,
  };
}
