import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ThemePreset, THEME_PRESETS, applyTheme, getThemeById, getDefaultTheme } from '@/lib/theme-presets';

interface ThemeContextType {
  currentTheme: ThemePreset;
  themeId: string;
  setThemeById: (themeId: string) => void;
  toggleTheme: () => void;
  availableThemes: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage<string>('devnest_theme', 'midnight-blue');
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(getDefaultTheme());

  useEffect(() => {
    setMounted(true);
    // Apply initial theme immediately
    const theme = getThemeById(themeId) || getDefaultTheme();
    setCurrentTheme(theme);
    applyTheme(theme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const theme = getThemeById(themeId) || getDefaultTheme();
    setCurrentTheme(theme);
    applyTheme(theme);
  }, [themeId, mounted]);

  const setThemeByIdHandler = (newThemeId: string) => {
    const theme = getThemeById(newThemeId);
    if (theme) {
      setThemeId(newThemeId);
    }
  };

  const toggleTheme = () => {
    // Toggle between current theme and its opposite (dark/light)
    const oppositeTheme = currentTheme.isDark
      ? THEME_PRESETS.find(t => !t.isDark) || THEME_PRESETS[THEME_PRESETS.length - 1]
      : THEME_PRESETS.find(t => t.isDark) || THEME_PRESETS[0];
    
    setThemeId(oppositeTheme.id);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setThemeById: setThemeByIdHandler,
        toggleTheme,
        availableThemes: THEME_PRESETS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
