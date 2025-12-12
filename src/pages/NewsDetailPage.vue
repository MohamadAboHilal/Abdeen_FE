<!-- src/pages/NewsDetailPage.vue -->
<script setup lang="ts">
import { computed, ref, watch, onMounted, unref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAppData } from "../composables/useAppData";

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import NewsCard from "../components/NewsCard.vue";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

interface ApiBlog {
  id: number;
  title: string;
  description: string;
  category: string;
  images: { url: string }[];
  badge_class?: string;
  created_at: string;
}

// UseAppData for more news
const { blogs, fetchAppData } = useAppData();
const allArticles = computed(() => unref(blogs));

const route = useRoute();
const router = useRouter();

const currentId = computed<number | null>(() => {
  const idParam = route.params.id;
  // Try to parse id, fallback to first blog's id if missing
  if (idParam !== undefined && !isNaN(Number(idParam))) {
    return Number(idParam);
  }
  const articles = allArticles.value ? [...allArticles.value] : [];
  return articles.length && articles[0] ? articles[0].id ?? null : null;
});

const loading = ref(true);
const apiArticle = ref<ApiBlog | null>(null);

const article = computed(() => {
  if (!apiArticle.value) return null;
  // Map API response to NewsItem-like structure for template compatibility
  return {
    id: apiArticle.value.id,
    title: apiArticle.value.title,
    category: apiArticle.value.category,
    date: apiArticle.value.created_at,
    image: apiArticle.value.images?.[0]?.url || "",
    images: apiArticle.value.images?.map((img) => img.url) || [],
    badgeClass: apiArticle.value.badge_class || "bg-sky-100 text-sky-700",
    body: [apiArticle.value.description],
  };
});

const moreNews = computed(() => {
  const articles = allArticles.value ? [...allArticles.value] : [];
  if (!articles.length || !currentId.value) return [];
  return articles
    .filter((a: any) => a.id !== currentId.value)
    .slice(0, 3)
    .map((a: any) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      date: a.created_at,
      image: a.image,
      images: a.images ? a.images.map((img: any) => img.url) : [],
      badgeClass: a.badge_class,
      body: [a.description],
    }));
});

function goToArticle(id: number) {
  if (!id) return;
  router.push({ path: `/news/${id}` });
}

async function fetchBlog(id: number, lang?: string) {
  loading.value = true;
  try {
    const languageHeader =
      lang ||
      (locale.value as string) ||
      localStorage.getItem("locale") ||
      "en";

    const res = await fetch(`https://api.abdeenlegal.com/api/blog/${id}`, {
      headers: {
        "Content-Type": "application/json",
        language: languageHeader,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch blog");
    const data = await res.json();
    apiArticle.value = data.data;
  } catch (e) {
    apiArticle.value = null;
  } finally {
    loading.value = false;
  }
}

// Ensure global app data (including blogs) is loaded even on reload
onMounted(async () => {
  const lang =
    (locale.value as string) || localStorage.getItem("locale") || "en";
  await fetchAppData(lang);
  if (currentId.value != null) {
    await fetchBlog(currentId.value, lang);
  }
});

// Refetch article when route id changes
watch(
  () => currentId.value,
  (id) => {
    if (id != null) {
      fetchBlog(id);
    }
  }
);

// Refetch when language changes (for both main article + more news)
watch(
  () => locale.value,
  async (newLang) => {
    const lang = (newLang as string) || "en";
    await fetchAppData(lang);
    if (currentId.value != null) {
      await fetchBlog(currentId.value, lang);
    }
  }
);

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
        <div v-if="loading" class="text-center py-10 text-slate-500 h-screen">
          {{ t("blogDetails.loading") }}
        </div>
        <template v-else>
          <!-- Top row: category + share icon -->
          <div class="flex items-center justify-between mb-4">
            <span
              class="text-xs sm:text-sm font-semibold uppercase tracking-wide px-3 py-1 rounded-md"
              :class="article?.badgeClass || 'bg-sky-100 text-sky-700'"
            >
              {{ article?.category ?? "NEWS" }}
            </span>
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
                    v-for="(_, index) in galleryImages"
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
            <div
              v-if="galleryImages.length > 1"
              class="hidden md:block w-[32%]"
            >
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
            <p
              v-for="(para, idx) in article?.body"
              :key="idx"
              v-html="para"
            ></p>
          </div>

          <!-- More Common News -->
          <div class="mt-10">
            <h2 class="text-lg md:text-xl font-semibold text-[#202F66] mb-4">
              {{ t("blogDetails.moreCommonNews") }}
            </h2>
            <div
              v-if="moreNews.length"
              class="grid gap-4 md:gap-6 md:grid-cols-3"
            >
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
            <div v-else class="text-slate-400 text-center py-6">
              No more news available.
            </div>
          </div>
        </template>
      </div>
    </div>

    <Footer />
  </section>
</template>
