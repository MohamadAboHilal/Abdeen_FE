<!-- src/pages/NewsDetailPage.vue -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import NewsCard from "../components/NewsCard.vue";
import heroImg from "../assets/Abden Icon/whiteHouse.jpg";
import heroImg2 from "../assets/Abden Icon/whiteHouse2.jpg";
import heroImg3 from "../assets/Abden Icon/whiteHouse3.jpg";
import heroImg4 from "../assets/Abden Icon/whiteHouse4.jpg";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string; // main / fallback image
  images?: string[]; // optional gallery array
  badgeClass?: string;
  body: string[];
}

// TEMP demo data – later replace with API/store
// For demo purposes, give different image counts
const allArticles: NewsItem[] = [
  {
    id: 1,
    title:
      "DOJ Drops Immigration-Related Restrictions For States' Domestic Violence Services",
    category: "NEWS",
    date: "August 20, 2022",
    image: heroImg,
    images: [heroImg, heroImg3, heroImg4, heroImg2], // 4 images → shows +3
    badgeClass: "bg-red-100 text-red-700",
    body: [
      "Nov 24 (Reuters) - The U.S. Department of Justice has reversed course...",
      "Nineteen states and the District of Columbia on Monday agreed to drop a lawsuit...",
    ],
  },
  {
    id: 2,
    title:
      "Another Important Development in Domestic Violence Services Regulation",
    category: "NEWS",
    date: "August 22, 2022",
    image: heroImg,
    images: [heroImg, heroImg2], // 2 images → shows +1
    badgeClass: "bg-red-100 text-red-700",
    body: [
      "The Department issued further clarifications on the recent policy shift...",
      "States are expected to adapt their programs over the coming months...",
    ],
  },
  {
    id: 3,
    title:
      "Policy Update: States Adjust to New DOJ Guidance on Grant Conditions",
    category: "NEWS",
    date: "August 25, 2022",
    image: heroImg,
    // no images array here → falls back to [image] only
    badgeClass: "bg-red-100 text-red-700",
    body: [
      "Several states have announced timelines for revising their grant applications...",
      "Advocacy organizations continue to monitor implementation...",
    ],
  },
  {
    id: 4,
    title:
      "DOJ Drops Immigration-Related Restrictions For States' Domestic Violence Services",
    category: "NEWS",
    date: "August 28, 2022",
    image: heroImg,
    images: [heroImg, heroImg3, heroImg4], // 3 images → shows +2
    badgeClass: "bg-red-100 text-red-700",
    body: ["xewerfwgw", "wrz24w3g"],
  },
];

const route = useRoute();
const router = useRouter();

const currentId = computed(() => Number(route.params.id));

const article = computed<NewsItem | undefined>(
  () => allArticles.find((a) => a.id === currentId.value) ?? allArticles[0]
);

const moreNews = computed(() =>
  allArticles.filter((a) => a.id !== article.value?.id).slice(0, 3)
);

function goToArticle(id: number) {
  router.push({ name: "news-detail", params: { id } });
}

/* ---------------- Per-article gallery logic ---------------- */

// Take images from the article if present,
// otherwise fall back to the single `image` field.
const galleryImages = computed<string[]>(() => {
  const a = article.value;
  if (!a) return [];
  if (a.images && a.images.length > 0) return a.images;
  return a.image ? [a.image] : [];
});

const activeSlide = ref(0);

const mainImage = computed<string | null>(() => {
  if (!galleryImages.value.length) return null;
  return (
    galleryImages.value[activeSlide.value] ?? galleryImages.value[0] ?? null
  );
});

// Reset active slide when article changes
watch(
  () => article.value?.id,
  () => {
    activeSlide.value = 0;
  }
);

function goToSlide(index: number) {
  if (index >= 0 && index < galleryImages.value.length) {
    activeSlide.value = index;
  }
}

const extraCount = computed(() => Math.max(galleryImages.value.length - 1, 0));
</script>

<template>
  <section class="bg-[#F7F8FC] min-h-screen">
    <Navbar />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div
        class="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-4 sm:p-6 md:p-8"
      >
        <!-- Top row: category + share icon -->
        <div class="flex items-center justify-between mb-4">
          <span
            class="text-xs sm:text-sm font-semibold uppercase tracking-wide px-3 py-1 rounded-md bg-red-100 text-red-700"
          >
            {{ article?.category ?? "NEWS" }}
          </span>

          <button
            type="button"
            class="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
            aria-label="Share"
          >
            ⤴
          </button>
        </div>

        <!-- Image block: only if we have at least one image -->
        <div
          v-if="galleryImages.length"
          class="flex items-start justify-between gap-6 mb-6"
        >
          <!-- Left: Big image with dots -->
          <div class="flex-1">
            <div class="relative rounded-3xl overflow-hidden bg-black/5">
              <img
                v-if="mainImage"
                :src="mainImage"
                alt="Article main image"
                class="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover"
              />

              <!-- Dots (only if more than 1 image) -->
              <div
                v-if="galleryImages.length > 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/10 px-4 py-1 rounded-full backdrop-blur"
              >
                <button
                  v-for="(img, index) in galleryImages"
                  :key="index"
                  type="button"
                  @click="goToSlide(index)"
                  class="h-2.5 w-2.5 rounded-full transition"
                  :class="
                    index === activeSlide
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/80'
                  "
                />
              </div>
            </div>
          </div>

          <!-- Right: Small preview with +N overlay (only if more than 1 image, hidden on small screens) -->
          <div v-if="galleryImages.length > 1" class="hidden md:block w-[32%]">
            <div
              class="relative rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            >
              <img
                :src="galleryImages[1] || galleryImages[0]"
                :alt="article?.title"
                class="w-full h-[180px] lg:h-[220px] object-cover"
              />

              <!-- +N overlay (N = extraCount) -->
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/25"
              >
                <div
                  class="px-6 py-3 rounded-2xl bg-black/60 text-white text-xl font-semibold"
                >
                  +{{ extraCount }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Title -->
        <h1
          class="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-[#202F66] leading-snug"
        >
          {{ article?.title }}
        </h1>

        <!-- Date -->
        <p class="mt-2 text-sm text-slate-500">
          {{ article?.date }}
        </p>

        <!-- Body -->
        <div class="mt-4 space-y-3 text-sm md:text-base text-slate-800">
          <p v-for="(para, idx) in article?.body" :key="idx">
            {{ para }}
          </p>
        </div>

        <!-- More Common News -->
        <div class="mt-10">
          <h2 class="text-lg md:text-xl font-semibold text-[#202F66] mb-4">
            More Common News
          </h2>
          <div class="grid gap-4 md:gap-6 md:grid-cols-3">
            <button
              v-for="item in moreNews"
              :key="item.id"
              type="button"
              class="text-left"
              @click="goToArticle(item.id)"
            >
              <NewsCard :article="item" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </section>
</template>
