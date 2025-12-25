<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useAppData } from "../composables/useAppData";

const { services } = useAppData();

const currentSlide = ref(0);

/**
 * Responsive items per slide:
 * - mobile (<640): 2 items (2 rows on 1-col layout)
 * - sm+ (>=640): 4 items (2 rows of 2)
 * - lg+ (>=1024): 6 items (2 rows of 3)
 */
const itemsPerSlide = ref(6);

function updateItemsPerSlide() {
  const w = window.innerWidth;
  if (w < 640) itemsPerSlide.value = 2;
  else if (w < 1024) itemsPerSlide.value = 4;
  else itemsPerSlide.value = 6;

  // Keep currentSlide in range after changing itemsPerSlide
  if (currentSlide.value > totalSlides.value - 1) currentSlide.value = 0;
}

onMounted(() => {
  updateItemsPerSlide();
  window.addEventListener("resize", updateItemsPerSlide);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsPerSlide);
});

const totalSlides = computed(() =>
  Math.max(1, Math.ceil(services.value.length / itemsPerSlide.value))
);

const slideItems = computed(() => {
  const start = currentSlide.value * itemsPerSlide.value;
  return services.value.slice(start, start + itemsPerSlide.value);
});

/**
 * Pad the last slide with placeholders so the grid height never changes.
 */
const displayItems = computed(() => {
  const real = slideItems.value.map((s) => ({
    type: "service" as const,
    data: s,
  }));
  const missing = itemsPerSlide.value - real.length;

  const fillers = Array.from({ length: Math.max(0, missing) }, (_, i) => ({
    type: "placeholder" as const,
    key: `ph-${currentSlide.value}-${i}`,
  }));

  return [...real, ...fillers];
});

function next() {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
}

function prev() {
  currentSlide.value =
    (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
}

function goTo(index: number) {
  currentSlide.value = index;
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 w-full">
    <div class="relative">
      <!-- Slide -->
      <div class="transition-all duration-300">
        <div
          class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch"
        >
          <template
            v-for="item in displayItems"
            :key="item.type === 'service' ? item.data.title : item.key"
          >
            <!-- Real card -->
            <article
              v-if="item.type === 'service'"
              class="relative bg-[#253042] text-[#F7F4ED] rounded-2xl p-3 md:p-4 shadow-lg transition-shadow h-[200px] flex flex-col sm:block"
            >
              <div
                class="rounded-md flex flex-row items-center justify-start mb-2 gap-x-3"
              >
                <img
                  :src="item.data.icon"
                  :alt="item.data.title"
                  class="h-12 w-12 text-[#ECC06F] object-contain rounded-md"
                />
                <h3 class="text-xl font-bold">{{ item.data.title }}</h3>
              </div>

              <!-- Description (top-aligned + scroll for long text) -->
              <div class="flex-1">
                <p
                  class="text-lg font-medium text-[#F7F4ED] leading-relaxed w-full max-h-[110px] overflow-y-auto pr-2 text-left"
                >
                  {{ item.data.description }}
                </p>
              </div>
            </article>

            <!-- Placeholder card (keeps grid height stable) -->
            <div
              v-else
              class="h-[200px] rounded-2xl opacity-0 pointer-events-none"
            />
          </template>
        </div>
      </div>

      <!-- Controls row: Prev + Dots + Next -->
      <div class="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          @click="prev"
          class="bg-[#253042] text-[#F7F4ED] shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition"
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div class="flex items-center justify-center gap-2">
          <button
            v-for="(_, i) in totalSlides"
            :key="i"
            type="button"
            @click="goTo(i)"
            class="h-2.5 rounded-full transition-all"
            :class="
              i === currentSlide ? 'w-8 bg-[#ECC06F]' : 'w-2.5 bg-[#F7F4ED]/40'
            "
            :aria-label="`Go to slide ${i + 1}`"
          />
        </div>

        <button
          type="button"
          @click="next"
          class="bg-[#253042] text-[#F7F4ED] shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Chrome/Edge/Safari */
p::-webkit-scrollbar {
  width: 6px;
}
p::-webkit-scrollbar-track {
  background: rgba(247, 244, 237, 0.08);
  border-radius: 9999px;
}
p::-webkit-scrollbar-thumb {
  background: rgba(236, 192, 111, 0.75);
  border-radius: 9999px;
}

/* Firefox */
p {
  scrollbar-width: thin;
  scrollbar-color: rgba(236, 192, 111, 0.75) rgba(247, 244, 237, 0.08);
}
</style>
