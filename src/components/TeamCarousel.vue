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

import firstPerson from "../assets/Abden Icon/1st.jpg";
import secondPerson from "../assets/Abden Icon/2nd.jpg";
import thirdPerson from "../assets/Abden Icon/3rd.jpg";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

const team: TeamMember[] = [
  { name: "Ahmad Abden", role: "Lawyer", photo: firstPerson },
  { name: "Sarah Khalil", role: "Attorney", photo: secondPerson },
  { name: "Omar Hassan", role: "Legal Consultant", photo: thirdPerson },
  { name: "Lina Barakat", role: "Corporate Lawyer", photo: firstPerson },
  { name: "Hadi Nasser", role: "Litigation Lead", photo: secondPerson },
  { name: "Rama Ziad", role: "IP Specialist", photo: thirdPerson },
];

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
const slides = computed(() => chunk(team, cardsPerSlide.value));

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
