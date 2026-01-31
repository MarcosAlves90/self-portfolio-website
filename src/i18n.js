import { createI18n } from "vue-i18n";

import en from "@/locales/en";
import pt from "@/locales/pt";

// Translation messages are intentionally imported from separate files for clarity and single responsibility
const messages = { en, pt };

const i18n = createI18n({
  locale: navigator.language.startsWith("pt") ? "pt" : "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
