<script setup lang="ts">
import { defineComponent } from "vue";

import Navbar from "../components/Navbar.vue";
import Hero from "../pages/Hero.vue";
import AboutUs from "../pages/AboutUs.vue";
import Services from "../pages/Services.vue";
import Clients from "../pages/Clients.vue";
import ContactUs from "../pages/ContactUs.vue";
import Footer from "../components/Footer.vue";
import Team from "../pages/Team.vue";
import NewsSection from "../pages/NewsSection.vue";

defineComponent({});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <TopNav />
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
