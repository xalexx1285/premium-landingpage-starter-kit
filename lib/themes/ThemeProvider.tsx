"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { defaultTheme, getThemeById, themeToCssProperties, type ThemeConfig, type ThemeId } from ".";

type ThemeContextValue = {
  theme: ThemeConfig;
  setThemeForPreview: (themeId: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setThemeForPreview: () => undefined,
});

function applyThemeToDocument(theme: ThemeConfig) {
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.dataset.signatureVariant = theme.motion.signatureVariant;

  Object.entries(themeToCssProperties(theme)).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

export function ThemeProvider({ children, initialThemeId }: { children: ReactNode; initialThemeId?: ThemeId }) {
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId ?? defaultTheme.id);
  const theme = useMemo(() => getThemeById(themeId), [themeId]);

  useEffect(() => {
    const storedThemeId = window.localStorage.getItem("premium-kit-theme") as ThemeId | null;
    if (storedThemeId && getThemeById(storedThemeId).id === storedThemeId) {
      setThemeId(storedThemeId);
    }
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    setThemeForPreview: (nextThemeId) => {
      window.localStorage.setItem("premium-kit-theme", nextThemeId);
      setThemeId(nextThemeId);
    },
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
