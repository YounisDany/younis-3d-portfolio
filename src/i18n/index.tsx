import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dictionary, type Locale } from "./en";
import { ar } from "./ar";

export type { Dictionary, Locale };

export const STORAGE_KEY = "yd3-locale";
export const DEFAULT_LOCALE: Locale = "ar";

function readInitial(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "en" ? "en" : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

interface LanguageValue {
  locale: Locale;
  t: Dictionary;
  isRtl: boolean;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitial);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(() => setLocaleState((l) => (l === "ar" ? "en" : "ar")), []);

  const value = useMemo<LanguageValue>(
    () => ({ locale, t: locale === "ar" ? ar : en, isRtl: locale === "ar", setLocale, toggle }),
    [locale, setLocale, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
