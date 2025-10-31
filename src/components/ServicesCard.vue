<script setup lang="ts">
import legal from "../assets/Abden Icon/Legal Consultations.svg";
import company from "../assets/Abden Icon/Company Formation.svg";
import trademark from "../assets/Abden Icon/small_scale.svg";
import commercial from "../assets/Abden Icon/Commercial Disputes.svg";
import realEstate from "../assets/Abden Icon/Real Estate Law.svg";
import intellectual from "../assets/Abden Icon/Intellectual Property.svg";

type Card = {
  id: number;
  title: string;
  desc: string;
  icon: string;
};

const cards: Card[] = [
  {
    id: 1,
    title: "Legal Consultations",
    desc: "Providing comprehensive legal consultations and advisory services across all areas of law.",
    icon: legal,
  },
  {
    id: 2,
    title: "Company Formation",
    desc: "Drafting legal memoranda, establishing companies, opening branches for foreign corporations and agencies.",
    icon: company,
  },
  {
    id: 3,
    title: "Trademark Registration",
    desc: "Registering trademarks and protecting intellectual property rights for businesses.",
    icon: trademark,
  },
  {
    id: 4,
    title: "Commercial Disputes",
    desc: "Preparing investment and industrial licenses, drafting agreements, and resolving commercial disputes.",
    icon: commercial,
  },
  {
    id: 5,
    title: "Real Estate Law",
    desc: "Handling real estate cases, property contracts, and all related legal matters.",
    icon: realEstate,
  },
  {
    id: 6,
    title: "Intellectual Property",
    desc: "Managing intellectual property, copyright matters, and protecting creative rights.",
    icon: intellectual,
  },
];
</script>

<template>
  <section class="max-w-7xl mx-auto px-6">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
      <article
        v-for="c in cards"
        :key="c.id"
        class="relative bg-[#253042] text-[#F7F4ED] rounded-2xl p-3 md:p-4 shadow-lg transition-shadow h-[200px] flex flex-col sm:block"
      >
        <!-- Icon -->
        <div
          class="rounded-md flex flex-row items-center justify-start mb-2 gap-x-3"
        >
          <img
            :src="c.icon"
            :alt="c.title"
            class="h-12 w-12 text-[#ECC06F] object-contain"
          />
          <h3 class="text-xl font-bold">{{ c.title }}</h3>
        </div>

        <!-- Title -->

        <!-- Description -->
        <p
          class="text-lg font-medium text-[#F7F4ED] leading-relaxed flex-1 flex items-center justify-center sm:block"
        >
          {{ c.desc }}
        </p>
      </article>
    </div>
  </section>
</template>
