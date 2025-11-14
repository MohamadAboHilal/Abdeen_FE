<script setup lang="ts">
import { useI18n } from "vue-i18n";
import established from "../assets/Abden Icon/Est 1996.svg";
import research from "../assets/Abden Icon/global Reach.svg";
import smallScale from "../assets/Abden Icon/م.svg";
import expert from "../assets/Abden Icon/Expert Team.svg";

const { t } = useI18n();
</script>

<template>
  <div class="h-auto md:h-56 w-full bg-[#F7F4ED]">
    <div
      class="max-w-7xl mx-auto h-full grid grid-cols-2 space-y-8 md:grid-cols-4 items-center px-6 pb-12 md:px-0"
    >
      <!-- Established -->
      <div class="flex flex-col items-center space-y-2">
        <img :src="established" class="h-16 w-16 md:h-18 md:w-18" alt="" />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          {{ t("stats.established.year") }}
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          {{ t("stats.established.subtitle") }}
        </p>
      </div>

      <!-- Expert Team -->
      <div class="flex flex-col items-center space-y-2">
        <img :src="expert" class="h-16 w-16 md:h-18 md:w-18" alt="" />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          {{ t("stats.expert.title") }}
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          {{ t("stats.expert.subtitle") }}
        </p>
      </div>

      <!-- International Reach -->
      <div class="flex flex-col items-center space-y-2">
        <img :src="research" class="h-16 w-16 md:h-18 md:w-18" alt="" />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          {{ t("stats.international.title") }}
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          {{ t("stats.international.subtitle") }}
        </p>
      </div>

      <!-- Court Coverage -->
      <div class="flex flex-col items-center space-y-2 pb-6">
        <img :src="smallScale" class="h-16 w-16 md:h-18 md:w-18" alt="" />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          {{ t("stats.coverage.title") }}
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          {{ t("stats.coverage.subtitle") }}
        </p>
      </div>
    </div>
  </div>
</template>
