<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { useSettings } from "../composables/useSettings";

// Assets
import logo from "../assets/Abden Icon/Abden Logo.svg";
import email from "../assets/Abden Icon/E-Mail.svg";
import phone from "../assets/Abden Icon/phone number.svg";
import facebook from "../assets/Abden Icon/facebook_Gold.svg";
import linkedin from "../assets/Abden Icon/linkedin_gold.svg";

import TopNav from "./TopNav.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const { t, locale } = useI18n();

const { settings } = useSettings();

function goToSection(hash: string) {
  // Always go home first
  router.push({ path: "/", hash });
  activeLink.value = hash;
}

// Navbar state
const activeLink = ref("nav.home");
const navLinks = [
  { name: "nav.home", href: "#hero" },
  { name: "nav.about", href: "#about" },
  { name: "nav.services", href: "#services" },
  { name: "nav.clients", href: "#clients" },
];

const mobileMenuOpen = ref(false);
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

// Language switcher
function switchLang(newLang: string) {
  locale.value = newLang;
  localStorage.setItem("locale", newLang);
}
</script>

<template>
  <header class="sticky top-0 z-2000 bg-white shadow-sm">
    <TopNav />

    <!-- Main Navbar -->
    <div
      class="flex flex-row items-center justify-between w-full px-4 py-4 max-h-16"
    >
      <!-- Logo -->
      <img :src="logo" alt="Abdeen Logo" class="h-10 w-auto ml-8" />

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex flex-row items-center space-x-8 mr-8">
        <a
          v-for="link in navLinks"
          :key="link.name"
          href="javascript:void(0)"
          @click="goToSection(link.href)"
          :class="[
            'text-xl font-semibold text-[#202B43] hover:text-[#ECC06F] transition-colors',
            activeLink === link.name
              ? 'underline decoration-4 underline-offset-8 text-[#ECC06F]'
              : '',
          ]"
        >
          {{ t(link.name) }}
        </a>

        <!-- Contact Button -->
        <a
          href="#contact"
          class="bg-[#1D2B62] text-white px-4 py-2 rounded-md font-medium hover:bg-[#ECC06F] transition-colors inline-flex items-center"
        >
          {{ t("nav.contact") }}
        </a>

        <!-- Language Switch (Desktop) -->
        <button
          @click="switchLang(locale === 'en' ? 'ar' : 'en')"
          class="border border-[#202B43] px-3 py-1 rounded-md text-[#202B43] font-semibold hover:bg-[#ECC06F] hover:text-white transition-colors"
        >
          {{ locale === "en" ? "AR" : "EN" }}
        </button>
      </nav>

      <!-- Hamburger (Mobile) and Language Switch -->
      <div class="flex items-center lg:hidden gap-2 mr-8">
        <button
          class="flex items-center justify-center"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <svg
            class="w-8 h-8 text-[#202B43]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <!-- Mobile Language Switch -->
        <button
          @click="switchLang(locale === 'en' ? 'ar' : 'en')"
          class="border border-[#202B43] px-3 py-1 rounded-md text-[#202B43] font-semibold hover:bg-[#ECC06F] hover:text-white transition-colors"
        >
          {{ locale === "en" ? "AR" : "EN" }}
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden absolute left-0 right-0 top-full bg-white shadow-lg px-8 py-4 flex flex-col space-y-4 items-center justify-center"
    >
      <!-- Translated Mobile Links -->
      <a
        v-for="link in navLinks"
        :key="link.name"
        href="javascript:void(0)"
        @click="goToSection(link.href)"
        :class="[
          'text-xl font-semibold text-[#202B43] hover:text-[#ECC06F] transition-colors',
          activeLink === link.name
            ? 'underline decoration-4 underline-offset-8 text-[#ECC06F]'
            : '',
        ]"
      >
        {{ t(link.name) }}
      </a>

      <a
        href="javascript:void(0)"
        @click="goToSection('#contact')"
        class="bg-[#1D2B62] text-white px-4 py-2 rounded-md font-medium hover:bg-[#ECC06F] transition-colors inline-flex items-center"
      >
        {{ t("nav.contact") }}
      </a>

      <!-- Mobile Language Switch moved above, removed from here -->

      <!-- Contact + Socials -->
      <div
        class="flex flex-col items-center justify-center w-full text-base mt-4"
      >
        <div class="flex flex-col items-center space-y-2 mb-4 text-center">
          <div class="flex flex-row items-center space-x-2">
            <img :src="email" class="h-5" />
            <span class="text-[#202B43] text-lg ltr-number">{{
              settings?.mail
            }}</span>
          </div>
          <div class="flex flex-row items-center space-x-2">
            <img :src="phone" class="h-5" />
            <span class="text-[#202B43] text-lg ltr-number">{{
              settings?.phoneNumber
            }}</span>
          </div>
        </div>

        <div class="flex flex-row items-center space-x-10">
          <a
            v-if="settings?.facebookUrl"
            :href="settings.facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="facebook"
              alt="facebook"
              class="h-5 w-auto cursor-pointer"
            />
          </a>

          <a
            v-if="settings?.linkedinUrl"
            :href="settings.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="linkedin"
              alt="linkedin"
              class="h-5 w-auto cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
