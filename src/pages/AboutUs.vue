<script setup lang="ts">
import bigScale from "../assets/Abden Icon/ميزان.svg";
import AboutUsCard from "../components/AboutUsCard.vue";
import AboutUsBanner from "../components/AboutUsBanner.vue";
</script>

<template>
  <div>
    <section
      id="about"
      class="relative flex flex-col lg:flex-row items-start justify-between w-auto md:ml-12 mx-auto px-6 py-24"
    >
      <!-- Left Text Content -->
      <div class="flex-1 max-w-2xl">
        <p class="text-[#ECC06F] text-2xl font-semibold mb-2 flex items-center">
          About Us
          <span class="ml-2 text-[#ECC06F]">—</span>
        </p>

        <h2 class="text-4xl md:text-5xl font-semibold text-[#202F66] mb-6">
          Leading Syrian Law Firm
        </h2>

        <h3 class="text-2xl text-[#202F66] mb-4">
          What We <span class="font-bold">Serve</span>
        </h3>

        <p
          class="text-lg md:text-xl leading-relaxed text-[#1F2839]/90 font-medium"
        >
          The Firm Possesses Extensive Experience In Providing Advisory And
          Legal Services Across Various Fields Of Law, Including Commercial,
          Civil, Banking, And Islamic Law.
        </p>

        <AboutUsCard class="pt-12" />
      </div>

      <!-- Right Image -->
      <div
        class="flex-1 flex justify-center lg:justify-end md:mr-16 lg:mt-0 relative"
      >
        <img
          :src="bigScale"
          alt="Golden Scale"
          class="hidden lg:block w-[350px] md:w-[450px] lg:w-[550px] object-contain mt-20"
        />
      </div>
    </section>

    <AboutUsBanner class="pt-12 mb-12" />
  </div>
</template>
