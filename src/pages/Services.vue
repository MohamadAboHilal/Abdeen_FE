<script setup lang="ts">
import feather from "../assets/Abden Icon/ريشة.svg";
import ServicesCard from "../components/ServicesCard.vue";
</script>
<template>
  <div class="relative bg-[#1f2839] h-auto w-full overflow-hidden pb-12">
    <!-- Large feather background -->
    <img
      :src="feather"
      alt="Feather Icon"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] opacity-100 z-0 select-none pointer-events-none px-6"
    />

    <div
      class="flex flex-col items-center justify-center relative z-10 px-4 max-w-4xl mx-auto"
    >
      <h1 class="text-3xl md:4xl font-semibold pt-12 text-[#ECC06F]">
        Areas of Practice
      </h1>
      <p
        class="text-[#F7F4ED] font-semibold pt-4 text-lg md:text-2xl text-center wrap-break-word whitespace-normal"
      >
        Our firm handles all types of cases and possesses extensive expertise
        covering many areas of law, including civil law, commercial law,
        international law, and Islamic law.
      </p>
    </div>

    <div class="relative z-10 flex flex-col items-center justify-center pt-12">
      <ServicesCard />
    </div>
  </div>
</template>
