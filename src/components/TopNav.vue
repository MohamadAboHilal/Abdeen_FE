<script setup lang="ts">
import email from "../assets/sms.png";
import phone from "../assets/call-calling.png";
import facebook from "../assets/Abden Icon/facebook_white.svg";
import linkedin from "../assets/Abden Icon/linkedin_white.svg";

import { useSettings } from "../composables/useSettings";

const { settings } = useSettings();

// Removed local Facebook and LinkedIn icon imports
</script>
<template>
  <div
    class="hidden md:flex flex-row items-center justify-between w-full px-16 py-2 max-h-9 bg-[#202B43] text-[#ECC06F] text-base"
  >
    <!-- Left: Email and Phone -->
    <div class="flex flex-row items-center space-x-16">
      <div class="flex flex-row items-center space-x-2">
        <img :src="email" alt="email" class="h-5 w-auto" />
        <a
          :href="`mailto:${settings?.mail}`"
          class="text-white text-lg ltr-number"
          >{{ settings?.mail }}</a
        >
      </div>
      <div class="flex flex-row items-center space-x-2">
        <img :src="phone" alt="phone" class="h-5 w-auto" />
        <a
          :href="`tel:${settings?.phoneNumber}`"
          class="text-white text-lg ltr-number"
          >{{ settings?.phoneNumber }}</a
        >
      </div>
    </div>
    <!-- Right: Social Icons -->
    <div class="flex flex-row items-center space-x-10">
      <a
        v-if="settings?.facebookUrl"
        :href="settings.facebookUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="facebook" alt="facebook" class="h-5 w-auto cursor-pointer" />
      </a>

      <a
        v-if="settings?.linkedinUrl"
        :href="settings.linkedinUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="linkedin" alt="linkedin" class="h-5 w-auto cursor-pointer" />
      </a>
    </div>
  </div>
</template>
