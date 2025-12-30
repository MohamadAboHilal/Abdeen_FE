import { createI18n } from "vue-i18n";
import { watch } from "vue";
import en from "./en.json";
import ar from "./ar.json";

const i18n = createI18n({
  legacy: false,
  locale: "en", // ✅ default ONLY
  fallbackLocale: "en",
  messages: { en, ar },
});

// React only when locale actually changes
watch(
  () => i18n.global.locale.value,
  (lang) => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  },
  { immediate: true }
);

export default i18n;
