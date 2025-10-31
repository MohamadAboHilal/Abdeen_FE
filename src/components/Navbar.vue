<script setup lang="ts">
import { ref } from "vue";
import logo from "../assets/Abden Icon/Abden Logo.svg";
import email from "../assets/Abden Icon/E-Mail.svg";
import phone from "../assets/Abden Icon/phone number.svg";
import facebook from "../assets/fLogo.png";
import instagram from "../assets/iLogo.png";
import telegram from "../assets/tLogo.png";
import twitter from "../assets/xLogo.png";
import TopNav from "./TopNav.vue";

const activeLink = ref("Home");
const navLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Mission", href: "#" },
  { name: "Values", href: "#" },
];

const mobileMenuOpen = ref(false);
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>

<template>
  <div>
    <TopNav />
    <div
      class="flex flex-row items-center justify-between w-full px-4 py-4 max-h-20"
    >
      <img :src="logo" alt="Abdeen Logo" class="h-12 w-auto ml-8" />
      <!-- Desktop Nav -->
      <div class="hidden lg:flex flex-row items-center space-x-8 mr-8">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          @click.prevent="activeLink = link.name"
          :class="[
            'text-2xl font-semibold text-[#202B43] hover:text-[#ECC06F] transition-colors',
            activeLink === link.name
              ? 'underline decoration-4 underline-offset-8 text-[#ECC06F]'
              : '',
          ]"
        >
          {{ link.name }}
        </a>
        <button
          class="bg-[#1D2B62] text-white px-4 py-2 rounded-md font-medium hover:bg-[#ECC06F] transition-colors"
        >
          Contact Us
        </button>
      </div>
      <!-- Hamburger Icon (Mobile) -->
      <button
        class="lg:hidden flex items-center justify-center mr-8"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <svg
          class="w-8 h-8 text-[#202B43]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <!-- Mobile Menu Dropdown -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden bg-white shadow-lg px-8 py-4 flex flex-col space-y-4 items-center justify-center"
    >
      <a
        v-for="link in navLinks"
        :key="link.name"
        :href="link.href"
        @click.prevent="
          activeLink = link.name;
          mobileMenuOpen = false;
        "
        :class="[
          'text-xl font-semibold text-[#202B43] hover:text-[#ECC06F] transition-colors',
          activeLink === link.name
            ? 'underline decoration-4 underline-offset-8 text-[#ECC06F]'
            : '',
        ]"
      >
        {{ link.name }}
      </a>
      <button
        class="bg-[#1D2B62] text-white px-4 py-2 rounded-md font-medium hover:bg-[#ECC06F] transition-colors w-full overflow-hidden"
        @click="mobileMenuOpen = false"
      >
        Contact Us
      </button>

      <div
        class="md:hidden flex flex-col items-center justify-center w-full text-[#ECC06F] text-base"
      >
        <!-- Email and Phone -->
        <div class="flex flex-col items-center space-y-2 mb-4 text-center">
          <div class="flex flex-row items-center space-x-2">
            <img :src="email" alt="email" class="h-5 w-auto" />
            <a href="mailto:Abden-Law@Gmail.Com" class="text-[#202B43] text-lg"
              >Abden-Law@Gmail.Com</a
            >
          </div>
          <div class="flex flex-row items-center space-x-2">
            <img :src="phone" alt="phone" class="h-5 w-auto" />
            <a href="tel:+96433327456" class="text-[#202B43] text-lg">
              +964 33327456
            </a>
          </div>
        </div>
        <!-- Social Icons -->
        <div class="flex flex-row items-center justify-center space-x-6">
          <img :src="twitter" alt="twitter" class="h-5 w-auto cursor-pointer" />
          <img
            :src="facebook"
            alt="facebook"
            class="h-5 w-auto cursor-pointer"
          />
          <img
            :src="telegram"
            alt="telegram"
            class="h-5 w-auto cursor-pointer"
          />
          <img
            :src="instagram"
            alt="instagram"
            class="h-5 w-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
