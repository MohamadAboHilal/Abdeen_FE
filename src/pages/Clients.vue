<script setup lang="ts">
import ClientsCarousel from "../components/ClientsCarousel.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div id="clients" class="mt-20 mb-12">
    <div class="shadow-[0_0_40px_10px_rgba(0,0,0,0.08)]">
      <div
        class="flex flex-col items-center justify-center relative z-10 px-4 max-w-full mx-auto"
      >
        <div class="max-w-7xl">
          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-semibold pt-8 md:pt-12 text-[#ECC06F] flex flex-wrap items-center justify-center"
          >
            <span class="mx-2 md:mx-8 text-[#ECC06F]">—</span>
            <span class="whitespace-nowrap">{{ t("clients.title") }}</span>
            <span class="mx-2 md:mx-8 text-[#ECC06F]">—</span>
          </h1>

          <h2
            class="text-[#202F66] font-semibold pt-4 text-2xl md:text-4xl text-center wrap-break-word whitespace-normal"
          >
            {{ t("clients.subtitle") }}
          </h2>

          <p
            class="text-[#120E08] font-normal pt-4 text-xl md:text-2xl text-center wrap-break-word whitespace-normal"
          >
            {{ t("clients.description") }}
          </p>
        </div>

        <div class="w-full pt-10">
          <ClientsCarousel />
        </div>
      </div>
    </div>
  </div>
</template>
