<script setup lang="ts">
import { computed } from "vue";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  badgeClass?: string; // dynamic tailwind classes (bg-*/text-*)
}

const props = defineProps<{
  article: NewsItem;
}>();

// Fallback to blue pill if no badgeClass passed
const pillClass = computed(() =>
  props.article.badgeClass && props.article.badgeClass.trim()
    ? props.article.badgeClass
    : "bg-blue-100 text-blue-700"
);
</script>

<template>
  <article
    class="flex flex-col rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden"
  >
    <!-- Image -->
    <div class="w-full h-48 overflow-hidden">
      <img
        :src="article.image"
        :alt="article.title"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Content -->
    <div class="p-4 sm:p-5 flex flex-col gap-3">
      <!-- Category pill -->
      <span
        :class="[
          'inline-block text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wide w-fit',
          pillClass,
        ]"
      >
        {{ article.category }}
      </span>

      <!-- Title -->
      <h3
        class="mt-2 text-base sm:text-lg font-semibold text-[#202F66] leading-snug line-clamp-2"
      >
        {{ article.title }}
      </h3>

      <!-- Date -->
      <p class="mt-1 text-sm text-slate-500">
        {{ article.date }}
      </p>
    </div>
  </article>
</template>
