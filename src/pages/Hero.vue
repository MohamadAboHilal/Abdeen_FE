<script setup lang="ts">
import fairMansion from "../assets/Abden Icon/fairMansion.png";
import scale from "../assets/Abden Icon/Leading Expertise.svg";
import smallScale from "../assets/Abden Icon/small_scale.svg";
import badge from "../assets/Abden Icon/badge.svg";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section
    id="hero"
    class="relative flex h-10/12 w-full items-start justify-start bg-[#171B27] text-white overflow-hidden"
  >
    <!-- Background image -->
    <img
      :src="fairMansion"
      alt="Fair Mansion"
      class="absolute inset-0 h-full w-full object-cover opacity-5"
    />

    <!-- Content -->
    <div
      class="relative z-10 max-w-6xl px-6 flex flex-col items-center md:items-start pt-24 md:ml-12"
    >
      <!-- Top title row -->
      <div class="flex justify-start items-center space-x-4">
        <img :src="scale" alt="Scale Icon" class="h-8 w-8 text-[#ECC06F]" />
        <span
          class="text-xl md:text-2xl font-semibold text-[#ECC06F] tracking-wide"
        >
          {{ t("hero.miniTitle") }}
        </span>
      </div>

      <h2
        class="text-4xl text-center md:text-start md:text-6xl font-semibold pt-12 leading-tight"
      >
        {{ t("hero.title") }}
      </h2>

      <p
        class="text-xl text-center md:text-start md:text-2xl pt-12 font-medium max-w-4xl"
      >
        {{ t("hero.description") }}
        <span class="text-[#ECC06F]">{{ t("hero.span") }}</span
        >{{ t("hero.restDescription") }}
      </p>

      <div class="flex flex-col md:flex-row flex-wrap gap-12 pt-12">
        <!-- Proven Track Record -->
        <div class="flex items-center space-x-4">
          <div
            class="bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm"
          >
            <img :src="badge" alt="badge" class="h-8 w-8 text-[#ECC06F]" />
          </div>
          <div class="text-xl md:text-2xl font-semibold leading-snug">
            <p>{{ t("hero.track") }}</p>
            <p class="font-normal text-gray-100">{{ t("hero.established") }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div
            class="bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm"
          >
            <img
              :src="smallScale"
              alt="badge"
              class="h-8 w-8 text-[#ECC06F] scale-175"
            />
          </div>
          <div class="text-xl md:text-2xl font-semibold leading-snug">
            <p>{{ t("hero.expertise") }}</p>
            <p class="font-normal text-gray-100">
              {{ t("hero.top") }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row pt-36 space-x-0 md:space-x-4 mb-20 space-y-4 md:space-y-0"
      >
        <a
          href="#contact"
          role="button"
          aria-label="Go to contact section"
          class="bg-[#ECC06F] text-white font-semibold text-[20px] py-4 px-3 rounded-[10px] w-full md:w-auto inline-flex items-center justify-center"
        >
          {{ t("hero.button1") }}
        </a>

        <a
          href="#about"
          role="button"
          aria-label="Go to about section"
          class="bg-transparent border-4 text-white font-semibold text-[20px] py-4 px-3 rounded-[10px] w-full md:w-auto inline-flex items-center justify-center"
        >
          {{ t("hero.button2") }}
        </a>
      </div>
    </div>
  </section>
</template>
