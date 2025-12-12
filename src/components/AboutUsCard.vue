<script setup lang="ts">
import oil from "../assets/Abden Icon/Oil Sector.svg";
import banking from "../assets/Abden Icon/Banking Sector.svg";
import islamic from "../assets/Abden Icon/islamic finance.svg";
import contracts from "../assets/Abden Icon/International Contracts.svg";
import { computed } from "vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const cards = computed(() => [
  {
    id: 1,
    title: t("cards.oilSector.title"),
    desc: t("cards.oilSector.desc"),
    icon: oil,
  },
  {
    id: 2,
    title: t("cards.bankingSector.title"),
    desc: t("cards.bankingSector.desc"),
    icon: banking,
  },
  {
    id: 3,
    title: t("cards.islamicFinance.title"),
    desc: t("cards.islamicFinance.desc"),
    icon: islamic,
  },
  {
    id: 4,
    title: t("cards.internationalContracts.title"),
    desc: t("cards.internationalContracts.desc"),
    icon: contracts,
  },
]);
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <article
      v-for="c in cards"
      :key="c.id"
      class="relative rounded-2xl bg-white p-6 md:p-8 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition"
    >
      <!-- top-right icon -->

      <div class="flex items-center justify-between gap-x-3">
        <h4 class="text-2xl font-bold text-[#1D2B62]">
          {{ c.id }}. {{ c.title }}
        </h4>
        <img :src="c.icon" :alt="c.title" class="h-10 w-10 select-none" />
      </div>

      <!-- description -->
      <p class="mt-4 text-lg leading-relaxed text-slate-700">
        {{ c.desc }}
      </p>
    </article>
  </div>
</template>
