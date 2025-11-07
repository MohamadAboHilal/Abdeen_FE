<script setup lang="ts">
import ClientsCarousel from "../components/ClientsCarousel.vue";
</script>

<template>
  <div id="clients" class="mt-20 mb-12">
    <div class="shadow-[0_0_40px_10px_rgba(0,0,0,0.08)]">
      <div
        class="flex flex-col items-center justify-center relative z-10 px-4 max-w-7xl mx-auto"
      >
        <h1 class="text-3xl md:text-4xl font-semibold pt-12 text-[#ECC06F]">
          <span class="mx-8 text-[#ECC06F]">—</span>Our Clients<span
            class="mx-8 text-[#ECC06F]"
            >—</span
          >
        </h1>
        <h2
          class="text-[#202F66] font-semibold pt-4 text-2xl md:text-4xl text-center wrap-break-word whitespace-normal"
        >
          Clients who trust us
        </h2>
        <p
          class="text-[#120E08] font-normal pt-4 text-xl md:text-2xl text-center wrap-break-word whitespace-normal"
        >
          We are proud to serve a diverse portfolio of clients who trust us to
          protect their interests and achieve their goals. From individuals to
          leading corporations, our clients value our dedication, integrity, and
          results-driven approach.
        </p>
        <div class="w-full pt-10">
          <ClientsCarousel />
        </div>
      </div>
    </div>
  </div>
</template>
