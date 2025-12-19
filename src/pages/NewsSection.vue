<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel";

import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import NewsCard from "../components/NewsCard.vue";

const { t } = useI18n();
const router = useRouter();

import { useAppData } from "../composables/useAppData";

const { blogs, fetchAppData } = useAppData();

onMounted(() => {
  fetchAppData();
});

// ---------- responsive chunking ----------

// default: desktop layout (will be corrected onMounted)
const chunkSize = ref(6);

const computeChunkSize = () => {
  if (typeof window === "undefined") return 6;
  return window.innerWidth < 768 ? 2 : 6; // < md: 2 per slide, else 6
};

const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const slides = computed(() => {
  // Transform blogs to NewsItem structure
  const normalizedBlogs = blogs.value.map((blog) => ({
    id: blog.id,
    title: blog.title,
    category: blog.category,
    date: blog.created_at,
    image: blog.image,
    badgeClass: blog.badge_class,
    body: (blog as any).body, // if available
  }));
  return chunk(normalizedBlogs, chunkSize.value);
});
const isMobileSlide = computed(() => chunkSize.value === 2);

// ---------- Embla setup ----------

const viewportRef = ref<HTMLElement | null>(null);
let embla: EmblaCarouselType | null = null;

const options: EmblaOptionsType = {
  loop: true,
  align: "start",
  dragFree: false,
  containScroll: "keepSnaps",
};

const initEmbla = async () => {
  await nextTick();
  if (!viewportRef.value) return;

  if (embla) {
    embla.reInit(options);
    return;
  }

  embla = EmblaCarousel(viewportRef.value, options, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
};

const handleResize = () => {
  const nextSize = computeChunkSize();
  if (nextSize !== chunkSize.value) {
    chunkSize.value = nextSize;
  } else {
    // even if size same, layout may have changed slightly
    embla?.reInit();
  }
};

onMounted(() => {
  chunkSize.value = computeChunkSize();
  initEmbla();
  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize);
  }
  embla?.destroy();
  embla = null;
});

// re-init Embla whenever the slides grouping changes
watch(slides, () => {
  initEmbla();
});

// ---------- navigation ----------

function goToArticle(id: string) {
  router.push({ name: "news-detail", params: { id } });
}
</script>

<template>
  <section class="bg-[#F7F8FC] py-16 md:py-24" id="blogs">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
      <header class="text-center mb-8 md:mb-14 px-2">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#ECC06F] flex flex-wrap items-center justify-center"
        >
          <span class="mx-2 md:mx-6 text-[#ECC06F]">—</span>
          <span class="whitespace-nowrap">{{ t("news.title") }}</span>
          <span class="mx-2 md:mx-6 text-[#ECC06F]">—</span>
        </h2>
        <p
          class="mt-3 text-sm sm:text-base md:text-2xl font-semibold text-[#202F66] max-w-full sm:max-w-2xl mx-auto leading-relaxed px-1"
        >
          {{ t("news.subtitle1") }}<br class="block sm:hidden" />
          {{ t("news.subtitle2") }}
        </p>
      </header>

      <!-- Embla carousel -->
      <div class="relative">
        <!-- Viewport -->
        <div ref="viewportRef" class="overflow-hidden">
          <!-- Track -->
          <div class="flex pb-4 gap-12">
            <!-- Each slide -->
            <div
              v-for="(group, index) in slides"
              :key="index"
              class="shrink-0 basis-full min-w-0"
            >
              <!-- Grid per slide -->
              <div
                :class="
                  isMobileSlide
                    ? 'grid grid-cols-1 grid-rows-2 gap-8'
                    : 'grid grid-cols-3 grid-rows-2 gap-8'
                "
              >
                <button
                  v-for="article in group"
                  :key="article.id"
                  :id="article.id"
                  type="button"
                  class="text-left"
                  @click="goToArticle(article.id)"
                >
                  <NewsCard :article="article" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
