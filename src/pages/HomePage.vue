<script setup lang="ts">
import { defineComponent } from "vue";
import { watch, onMounted } from "vue";

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
import { useI18n } from "vue-i18n";

defineComponent({});

const { locale } = useI18n();
const { fetchAppData } = useAppData();
const { fetchSettings } = useSettings();

// initial load
onMounted(() => {
  fetchAppData();
});

// initial load
onMounted(() => {
  fetchSettings();
});

// re-fetch whenever language changes
watch(
  () => locale.value,
  (newLang) => {
    fetchAppData(newLang as string);
  }
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
