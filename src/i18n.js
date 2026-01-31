import { createI18n } from "vue-i18n";

import en from "@/locales/en";
import pt from "@/locales/pt";

// Translation messages are intentionally imported from separate files for clarity and single responsibility
const messages = { en, pt };

// Prefer saved preference (localStorage) when available, otherwise infer from browser
const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
const defaultLocale = savedLocale || (navigator.language.startsWith("pt") ? "pt" : "en");

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
