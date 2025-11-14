<script setup lang="ts">
import email from "../assets/sms.png";
import phone from "../assets/call-calling.png";
import facebook from "../assets/Abden Icon/facebook_Gold.svg";
import linkedin from "../assets/Abden Icon/linkedin_gold.svg";
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
          href="mailto:Abden-Law@Gmail.Com"
          class="text-white text-lg ltr-number"
          >Abden-Law@Gmail.Com</a
        >
      </div>
      <div class="flex flex-row items-center space-x-2">
        <img :src="phone" alt="phone" class="h-5 w-auto" />
        <a href="tel:+96433327456" class="text-white text-lg ltr-number"
          >+964 33327456</a
        >
      </div>
    </div>
    <!-- Right: Social Icons -->
    <div class="flex flex-row items-center space-x-10">
      <img :src="facebook" alt="facebook" class="h-5 w-auto cursor-pointer" />
      <img :src="linkedin" alt="linkedin" class="h-5 w-auto cursor-pointer" />

      <!-- <img :src="telegram" alt="telegram" class="h-5 w-auto cursor-pointer" />
      <img :src="instagram" alt="instagram" class="h-5 w-auto cursor-pointer" /> -->
    </div>
  </div>
</template>
