<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppData } from "../composables/useAppData";

const { aboutUs } = useAppData();

const ITEMS_PER_SLIDE = 4;
const currentSlide = ref(0);

const totalSlides = computed(() =>
  Math.max(1, Math.ceil(aboutUs.value.length / ITEMS_PER_SLIDE))
);

const slideItems = computed(() => {
  const start = currentSlide.value * ITEMS_PER_SLIDE;
  return aboutUs.value.slice(start, start + ITEMS_PER_SLIDE);
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
  <section class="w-full">
    <div class="relative">
      <!-- Slide -->
      <div class="transition-all duration-300">
        <!-- 🔹 ONLY grid classes applied, card untouched -->
        <div class="grid gap-6 md:grid-cols-2 place-items-stretch">
          <article
            v-for="c in slideItems"
            :key="c.id"
            class="relative rounded-2xl bg-white p-6 md:p-8 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition"
          >
            <div class="flex items-center justify-between gap-x-3">
              <h4 class="text-2xl font-bold text-[#1D2B62]">
                {{ c.id }}. {{ c.title }}
              </h4>
              <img :src="c.icon" :alt="c.title" class="h-10 w-10 select-none" />
            </div>

            <p class="mt-4 text-lg leading-relaxed text-slate-700">
              {{ c.description }}
            </p>
          </article>
        </div>
      </div>

      <!-- Controls row: Prev + Dots + Next -->
      <div class="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          @click="prev"
          class="bg-white text-[#1D2B62] shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition"
          aria-label="Previous slide"
        >
          ‹
        </button>

        <!-- Dots -->
        <div class="flex items-center justify-center gap-2">
          <button
            v-for="(_, i) in totalSlides"
            :key="i"
            type="button"
            @click="goTo(i)"
            class="h-2.5 rounded-full transition-all"
            :class="
              i === currentSlide ? 'w-8 bg-[#ECC06F]' : 'w-2.5 bg-slate-300'
            "
            :aria-label="`Go to slide ${i + 1}`"
          />
        </div>

        <button
          type="button"
          @click="next"
          class="bg-white text-[#1D2B62] shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>
