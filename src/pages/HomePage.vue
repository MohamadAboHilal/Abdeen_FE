<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";

import Navbar from "../components/Navbar.vue";
import Hero from "../pages/Hero.vue";
import AboutUs from "../pages/AboutUs.vue";
import Services from "../pages/Services.vue";
import Clients from "../pages/Clients.vue";
import ContactUs from "../pages/ContactUs.vue";
import Footer from "../components/Footer.vue";
import Team from "../pages/Team.vue";
import NewsSection from "../pages/NewsSection.vue";

import { useAppData } from "../composables/useAppData";
import { useSettings } from "../composables/useSettings";
import { useSeoFromApi } from "../composables/useSEO";

const { locale } = useI18n();
const { fetchAppData } = useAppData();
const { fetchSettings } = useSettings();
const { homeSeo, fetchHomeSeo } = useSeoFromApi();

/**
 * ✅ Bind SEO once (sync), it will update automatically when homeSeo changes
 * This avoids the "no provide context" error entirely.
 */
useHead(() => {
  const seo = homeSeo.value;

  return {
    title: seo?.title,

    link: [
      ...(seo?.canonical ? [{ rel: "canonical", href: seo.canonical }] : []),
      ...(seo?.favicon ? [{ rel: "icon", href: seo.favicon }] : []),
    ],

    meta: [
      ...(seo?.description
        ? [{ name: "description", content: seo.description }]
        : []),

      ...(seo?.keywords?.length
        ? [{ name: "keywords", content: seo.keywords.join(", ") }]
        : []),

      // ✅ Open Graph (shows as property="og:*")
      ...(seo?.ogType ? [{ property: "og:type", content: seo.ogType }] : []),
      ...(seo?.ogTitle ? [{ property: "og:title", content: seo.ogTitle }] : []),
      ...(seo?.ogDescription
        ? [{ property: "og:description", content: seo.ogDescription }]
        : []),
      ...(seo?.ogImage ? [{ property: "og:image", content: seo.ogImage }] : []),
      ...(seo?.ogUrl ? [{ property: "og:url", content: seo.ogUrl }] : []),

      // ✅ Twitter
      ...(seo?.twitterTitle
        ? [{ name: "twitter:title", content: seo.twitterTitle }]
        : []),
      ...(seo?.twitterDescription
        ? [{ name: "twitter:description", content: seo.twitterDescription }]
        : []),
      ...(seo?.twitterImage
        ? [{ name: "twitter:image", content: seo.twitterImage }]
        : []),
    ],
  };
});

// initial load
onMounted(() => {
  const lang = (locale.value as string) || "en";
  fetchAppData(lang);
  fetchSettings();
  fetchHomeSeo(lang);
});

// re-fetch whenever language changes
watch(
  () => locale.value,
  (newLang) => {
    const lang = newLang as string;
    fetchAppData(lang);
    fetchHomeSeo(lang, true);
  }
);

watch(
  () => homeSeo.value,
  (val) => {
    console.log("homeSeo updated:", val);
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <Hero />
    <AboutUs />
    <Services />
    <Clients />
    <NewsSection />
    <Team />
    <ContactUs />
    <Footer />
  </div>
</template>
