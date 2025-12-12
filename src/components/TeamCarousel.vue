<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  nextTick,
  watch,
} from "vue";
import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

import TeamCard from "./TeamCard.vue";

import { useAppData } from "../composables/useAppData";

const { teamMembers } = useAppData();

// responsive chunking
const getCardsPerSlide = () => {
  const w = window.innerWidth;
  if (w < 640) return 1; // phone
  if (w < 1024) return 2; // tablet
  return 3; // desktop
};

const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const cardsPerSlide = ref(getCardsPerSlide());
const slides = computed(() =>
  chunk(
    [...teamMembers.value].map((member) => ({
      ...member,
      role: member.job_title ?? (member as any).role ?? "",
      photo: (member as any).photo ?? member.image ?? "",
      ["photots-plugin"]: (member as any)["photots-plugin"] ?? "",
    })),
    cardsPerSlide.value
  )
);

const viewportRef = ref<HTMLElement | null>(null);
let embla: EmblaCarouselType | null = null;

const options: EmblaOptionsType = {
  loop: true,
  align: "start",
  containScroll: "keepSnaps", // <-- important to avoid trimmed snaps on small screens
  slidesToScroll: 1,
  dragFree: false,
};

let resizeT: number | null = null;
const handleResize = () => {
  if (resizeT) window.clearTimeout(resizeT);
  resizeT = window.setTimeout(async () => {
    const next = getCardsPerSlide();
    if (next !== cardsPerSlide.value) {
      cardsPerSlide.value = next;
      await nextTick();
    }
    embla?.reInit();
  }, 100);
};

onMounted(() => {
  if (!viewportRef.value) return;
  embla = EmblaCarousel(viewportRef.value, options, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  embla?.destroy();
  window.removeEventListener("resize", handleResize);
});

watch(slides, async () => {
  await nextTick();
  embla?.reInit();
});
</script>

<template>
  <section class="w-full">
    <!-- viewport (padding lives here) -->
    <div ref="viewportRef" class="overflow-hidden px-4 sm:px-2 lg:px-8 py-6">
      <!-- track: NO gap; use gutter pattern -->
      <div class="flex -mx-3 pb-2" :key="cardsPerSlide">
        <!-- each slide is exactly one viewport width -->
        <div
          v-for="(group, i) in slides"
          :key="i"
          class="shrink-0 basis-full min-w-0 px-3"
        >
          <!-- grid per slide -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center"
          >
            <TeamCard
              v-for="(member, j) in group"
              :key="`${i}-${j}-${member.name}`"
              :member="member"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
