<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import EmblaCarousel, {
  type EmblaOptionsType,
  type EmblaCarouselType,
} from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

import fourSeasons from "../assets/Abden Icon/4seasons.svg";
import pepsi from "../assets/Abden Icon/pepsi.svg";
import henkel from "../assets/Abden Icon/henkel.svg";
import techno from "../assets/Abden Icon/techno.svg";
import versace from "../assets/Abden Icon/versace.svg";
import beirut from "../assets/Abden Icon/beirut.svg";
import sevenUp from "../assets/Abden Icon/7up.svg";
import maurel from "../assets/Abden Icon/maurel.svg";
import union from "../assets/Abden Icon/union.svg";
import na from "../assets/Abden Icon/ina.svg";
import diadora from "../assets/Abden Icon/diadora.svg";
import shell from "../assets/Abden Icon/shell.svg";

const logos: string[] = [
  fourSeasons,
  pepsi,
  henkel,
  techno,
  versace,
  beirut,
  sevenUp,
  maurel,
  union,
  na,
  diadora,
  shell,
  fourSeasons,
  pepsi,
  henkel,
  techno,
  versace,
  beirut,
  sevenUp,
  maurel,
  union,
  na,
  diadora,
  shell,
  fourSeasons,
  pepsi,
  henkel,
  techno,
];

const viewportRef = ref<HTMLElement | null>(null);
let embla: EmblaCarouselType | null = null;

const options: EmblaOptionsType = {
  loop: true,
  align: "center",
  dragFree: false,
  slidesToScroll: 1,
};

onMounted(() => {
  if (!viewportRef.value) return;
  embla = EmblaCarousel(viewportRef.value, options, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
});

onBeforeUnmount(() => embla?.destroy());

// helper to chunk logos (12 per slide for desktop 2x6 layout)
const chunk = (arr: string[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
// Use 12 so large screens can show two rows of 6 logos (top: 0..5, bottom: 6..11)
const slides = chunk(logos, 12);
</script>

<template>
  <section class="w-full py-12">
    <div ref="viewportRef" class="overflow-hidden px-4 sm:px-8 lg:px-12">
      <div class="flex pb-6 select-none">
        <div
          v-for="(group, slideIdx) in slides"
          :key="slideIdx"
          class="flex-[0_0_100%] min-w-0"
        >
          <!-- Brick Wall Flex Rows -->
          <!-- Mobile: 2x2 layout -->
          <div class="block md:hidden">
            <div class="flex flex-row justify-center gap-4 mb-4">
              <div
                v-for="(logo, j) in group.slice(0, 2)"
                :key="'m-top-' + j"
                class="flex items-center justify-center rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.07)] w-28 h-16 md:w-40 md:h-24"
              >
                <img
                  :src="logo"
                  alt="Client logo"
                  class="max-w-full max-h-1/3 object-contain"
                />
              </div>
            </div>
            <div class="flex flex-row justify-center gap-4 -ml-10">
              <div
                v-for="(logo, j) in group.slice(2, 4)"
                :key="'m-bottom-' + j"
                class="flex items-center justify-center rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.07)] w-28 h-16 md:w-40 md:h-24"
              >
                <img
                  :src="logo"
                  alt="Client logo"
                  class="max-w-auto max-h-1/2 object-contain"
                />
              </div>
            </div>
          </div>

          <!-- medium screens -->
          <div class="hidden md:block lg:hidden">
            <!-- Top row -->
            <div class="flex flex-row justify-center gap-6 mb-4">
              <div
                v-for="(logo, j) in group.slice(0, 3)"
                :key="'top-' + j"
                class="flex items-center justify-center rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.07)] w-28 h-16 md:w-40 md:h-24 lg:w-[235px] lg:h-[126px]"
              >
                <img
                  :src="logo"
                  alt="Client logo"
                  class="max-w-auto max-h-1/2 object-contain"
                />
              </div>
            </div>
            <!-- Bottom row, shifted left -->
            <div class="flex flex-row justify-center gap-6 md:-ml-32">
              <div
                v-for="(logo, j) in group.slice(3, 6)"
                :key="'bottom-' + j"
                class="flex items-center justify-center rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.07)] w-28 h-16 md:w-40 md:h-24 lg:w-[235px] lg:h-[126px]"
              >
                <img
                  :src="logo"
                  alt="Client logo"
                  class="max-w-auto max-h-1/2 object-contain"
                />
              </div>
            </div>
          </div>

          <!-- Desktop: 2 rows x 6 cards (brick wall) -->
          <div class="hidden lg:block">
            <!-- Top row (6 cards) -->
            <div class="flex flex-row justify-center gap-6 mb-4">
              <div
                v-for="(logo, j) in group.slice(0, 6)"
                :key="'lg-top-' + j"
                class="flex items-center justify-center rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.07)] w-28 h-16 md:w-40 md:h-24 lg:w-[170px] lg:h-[90px]"
              >
                <img
                  :src="logo"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <!-- Bottom row, shifted left (6 cards) -->
            <div class="flex flex-row justify-center gap-6 md:-ml-32 lg:-ml-40">
              <div
                v-for="(logo, j) in group.slice(6, 12)"
                :key="'lg-bottom-' + j"
                class="flex items-center justify-center rounded-xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.07)] w-28 h-16 md:w-40 md:h-24 lg:w-[170px] lg:h-[90px]"
              >
                <img
                  :src="logo"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
