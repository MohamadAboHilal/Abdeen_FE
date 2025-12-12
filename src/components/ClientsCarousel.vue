<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useAppData } from "../composables/useAppData";
import { gsap } from "gsap";

type Client = { icon: string; url?: string };

const { clients } = useAppData();

// Refs for the marquee elements
const topMarqueeRef = ref<HTMLElement | null>(null);
const bottomMarqueeRef = ref<HTMLElement | null>(null);

// Base list of clients, split into two rows
const topRow = computed<Client[]>(() => {
  const list = clients.value ?? [];
  const half = Math.ceil(list.length / 2);
  return list.slice(0, half);
});

const bottomRow = computed<Client[]>(() => {
  const list = clients.value ?? [];
  const half = Math.ceil(list.length / 2);
  return list.slice(half);
});

// Animation speed (pixels per second)
const speed = 200;

let topTimeline: gsap.core.Timeline | null = null;
let bottomTimeline: gsap.core.Timeline | null = null;

const killTimelines = () => {
  topTimeline?.kill();
  bottomTimeline?.kill();
  topTimeline = null;
  bottomTimeline = null;
};

const initAnimations = () => {
  killTimelines();

  // Animate top row
  if (topMarqueeRef.value) {
    const firstChild = topMarqueeRef.value.querySelector(
      ".clients-marquee__inner"
    ) as HTMLElement | null;

    if (firstChild) {
      const width = firstChild.offsetWidth;
      const duration = width / speed;

      if (width > 0) {
        // Set initial position to 0
        gsap.set(topMarqueeRef.value, { x: 0 });

        // Create seamless loop
        topTimeline = gsap.timeline({
          repeat: -1,
          onRepeat: () => {
            gsap.set(topMarqueeRef.value, { x: 0 });
          },
        });

        topTimeline.to(topMarqueeRef.value, {
          x: -width,
          duration,
          ease: "none",
          modifiers: {
            x: (x) => {
              const xVal = parseFloat(x);
              return `${xVal % width}px`;
            },
          },
        });
      }
    }
  }

  // Animate bottom row
  if (bottomMarqueeRef.value) {
    const firstChild = bottomMarqueeRef.value.querySelector(
      ".clients-marquee__inner"
    ) as HTMLElement | null;

    if (firstChild) {
      const width = firstChild.offsetWidth;
      const duration = width / speed;

      if (width > 0) {
        // Set initial position to 0
        gsap.set(bottomMarqueeRef.value, { x: 0 });

        // Create seamless loop
        bottomTimeline = gsap.timeline({
          repeat: -1,
          onRepeat: () => {
            gsap.set(bottomMarqueeRef.value, { x: 0 });
          },
        });

        bottomTimeline.to(bottomMarqueeRef.value, {
          x: -width,
          duration,
          ease: "none",
          modifiers: {
            x: (x) => {
              const xVal = parseFloat(x);
              return `${xVal % width}px`;
            },
          },
        });
      }
    }
  }
};

const reinitOnResize = async () => {
  await nextTick();
  initAnimations();
};

onMounted(async () => {
  await nextTick();
  // Small timeout to ensure fonts/images are laid out
  setTimeout(initAnimations, 100);
  window.addEventListener("resize", reinitOnResize);
});

// Re-init when clients change (e.g. after API load)
watch(
  () => clients.value,
  async () => {
    await nextTick();
    initAnimations();
  }
);

onUnmounted(() => {
  killTimelines();
  window.removeEventListener("resize", reinitOnResize);
});
</script>

<template>
  <section class="w-full py-12">
    <div
      class="mx-auto overflow-hidden px-4 sm:px-8 lg:px-12"
      style="max-width: 1200px"
    >
      <div class="space-y-4 select-none py-4">
        <!-- TOP ROW - infinite scroll -->
        <div class="clients-row">
          <div ref="topMarqueeRef" class="clients-marquee pt-8">
            <!-- First sequence -->
            <div class="clients-marquee__inner">
              <div
                v-for="(client, idx) in topRow"
                :key="'top-1-' + idx"
                class="client-card"
              >
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="client.icon"
                    alt="Client logo"
                    class="max-w-full max-h-full object-contain"
                  />
                </a>
                <img
                  v-else
                  :src="client.icon"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <!-- Second sequence (duplicate for seamless loop) -->
            <div class="clients-marquee__inner">
              <div
                v-for="(client, idx) in topRow"
                :key="'top-2-' + idx"
                class="client-card"
              >
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="client.icon"
                    alt="Client logo"
                    class="max-w-full max-h-full object-contain"
                  />
                </a>
                <img
                  v-else
                  :src="client.icon"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <!-- Third sequence (extra for buffer) -->
            <div class="clients-marquee__inner">
              <div
                v-for="(client, idx) in topRow"
                :key="'top-3-' + idx"
                class="client-card"
              >
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="client.icon"
                    alt="Client logo"
                    class="max-w-full max-h-full object-contain"
                  />
                </a>
                <img
                  v-else
                  :src="client.icon"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM ROW - infinite scroll, shifted like brick wall -->
        <div class="clients-row clients-row--shifted py-4">
          <div ref="bottomMarqueeRef" class="clients-marquee pb-8">
            <!-- First sequence -->
            <div class="clients-marquee__inner">
              <div
                v-for="(client, idx) in bottomRow"
                :key="'bottom-1-' + idx"
                class="client-card client-card--small"
              >
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="client.icon"
                    alt="Client logo"
                    class="max-w-full max-h-full object-contain"
                  />
                </a>
                <img
                  v-else
                  :src="client.icon"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <!-- Second sequence -->
            <div class="clients-marquee__inner">
              <div
                v-for="(client, idx) in bottomRow"
                :key="'bottom-2-' + idx"
                class="client-card client-card--small"
              >
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="client.icon"
                    alt="Client logo"
                    class="max-w-full max-h-full object-contain"
                  />
                </a>
                <img
                  v-else
                  :src="client.icon"
                  alt="Client logo"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <!-- Third sequence -->
            <div class="clients-marquee__inner">
              <div
                v-for="(client, idx) in bottomRow"
                :key="'bottom-3-' + idx"
                class="client-card client-card--small"
              >
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :src="client.icon"
                    alt="Client logo"
                    class="max-w-full max-h-full object-contain"
                  />
                </a>
                <img
                  v-else
                  :src="client.icon"
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

<style scoped>
/* Row wrapper */
.clients-row {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

/* Bottom row: brick-wall look → slightly shifted to the right */
.clients-row--shifted {
  margin-left: 0;
}

@media (min-width: 768px) {
  .clients-row--shifted {
    margin-left: 4rem;
  }
}

/* Outer track that scrolls horizontally */
.clients-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
}

/* Inner sequence */
.clients-marquee__inner {
  display: flex;
}

/* -------------------------
   CLIENT CARD – TOP ROW
   ------------------------- */
.client-card {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 0.75rem;
  margin-right: 1.5rem;

  /* ★ Bigger base size to prevent clipping */
  width: 11rem;
  height: 6rem;
}

@media (min-width: 640px) {
  .client-card {
    width: 12rem;
    height: 6.5rem;
  }
}

@media (min-width: 768px) {
  .client-card {
    width: 13rem;
    height: 7rem;
  }
}

@media (min-width: 1024px) {
  .client-card {
    width: 14rem;
    height: 7.5rem;
  }
}

/* -------------------------
   CLIENT CARD – BOTTOM ROW (smaller)
   ------------------------- */
.client-card--small {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 0.75rem;
  margin-right: 1.5rem;

  width: 10rem;
  height: 5rem;
}

@media (min-width: 640px) {
  .client-card--small {
    width: 11rem;
    height: 5.5rem;
  }
}

@media (min-width: 768px) {
  .client-card--small {
    width: 12rem;
    height: 6rem;
  }
}

@media (min-width: 1024px) {
  .client-card--small {
    width: 12.5rem;
    height: 6.5rem;
  }
}

/* -------------------------
   LOGO INSIDE CARDS
   ------------------------- */

.client-card img,
.client-card--small img {
  object-fit: contain;

  /* ★ Prevent image overflow */
  max-width: 70%;
  max-height: 70%;

  /* Smooth scaling */
  transition: transform 0.2s ease;
}

/* Optional hover effect */
.client-card:hover img,
.client-card--small:hover img {
  transform: scale(1.05);
}
</style>
