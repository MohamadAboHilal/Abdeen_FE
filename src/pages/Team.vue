<script setup lang="ts">
import TeamCarousel from "../components/TeamCarousel.vue";
</script>

<template>
  <section class="py-20 px-4 bg-[#F7F8FC]">
    <div
      class="max-w-full 3xl:max-w-7/12 mx-auto bg-white rounded-2xl shadow-[0_0_40px_10px_rgba(0,0,0,0.08)] px-6 sm:px-12 py-16 text-center"
    >
      <!-- Section Heading -->
      <div class="mb-10">
        <h4
          class="text-[#ECC06F] font-semibold tracking-wide text-2xl md:text-4xl flex items-center justify-center gap-3"
        >
          <span class="block h-px w-8 bg-[#ECC06F]"></span>
          Our Team
          <span class="block h-px w-8 bg-[#ECC06F]"></span>
        </h4>

        <h2 class="text-3xl md:text-4xl font-semibold text-[#202F66] mt-2">
          Meet Our Legal Team
        </h2>

        <p
          class="mt-6 text-xl md:text-2xl text-[#120E08] max-w-3xl mx-auto leading-relaxed"
        >
          Our team of experienced attorneys combines deep legal knowledge with a
          commitment to excellence, providing clients with trusted guidance and
          strategic solutions across all areas of law.
        </p>
      </div>

      <!-- Placeholder for your cards -->
      <div class="mt-10 flex flex-wrap justify-center gap-8">
        <TeamCarousel />
      </div>
    </div>
  </section>
</template>
