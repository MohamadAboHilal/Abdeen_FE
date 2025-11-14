import { createI18n } from "vue-i18n";
import { watchEffect } from "vue";
import en from "./en.json";
import ar from "./ar.json";

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: { en, ar },
});

watchEffect(() => {
  const lang = i18n.global.locale.value;
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
});

export default i18n;
