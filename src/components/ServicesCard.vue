<script setup lang="ts">
import { useAppData } from "../composables/useAppData";

const { services } = useAppData();
</script>

<template>
  <section class="max-w-7xl mx-auto px-6">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
      <article
        v-for="service in services"
        :key="service.title"
        class="relative bg-[#253042] text-[#F7F4ED] rounded-2xl p-3 md:p-4 shadow-lg transition-shadow h-[200px] flex flex-col sm:block"
      >
        <!-- Icon -->
        <div
          class="rounded-md flex flex-row items-center justify-start mb-2 gap-x-3"
        >
          <img
            :src="service.icon"
            :alt="service.title"
            class="h-12 w-12 text-[#ECC06F] object-contain"
          />
          <h3 class="text-xl font-bold">{{ service.title }}</h3>
        </div>

        <!-- Title -->

        <!-- Description -->
        <p
          class="text-lg font-medium text-[#F7F4ED] leading-relaxed flex-1 flex items-center justify-center sm:block"
        >
          {{ service.description }}
        </p>
      </article>
    </div>
  </section>
</template>
