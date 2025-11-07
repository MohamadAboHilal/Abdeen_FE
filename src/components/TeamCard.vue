<script setup lang="ts">
interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

defineProps<{ member: TeamMember }>();
</script>

<template>
  <article
    class="relative bg-white overflow-hidden rounded-3xl w-[300px] sm:w-[280px] md:w-[320px] lg:w-[360px]"
  >
    <!-- Member photo -->
    <img
      :src="member.photo"
      :alt="member.name"
      class="object-cover w-full h-[340px] md:h-[360px] lg:h-[400px]"
    />

    <!-- Floating info card -->
    <div
      class="absolute left-3 right-3 -bottom-4 bg-white rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.12)] px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 mb-8"
    >
      <h3 class="text-lg sm:text-base md:text-xl font-semibold text-[#111827]">
        {{ member.name }}
      </h3>
      <p class="text-slate-600 mt-1 text-sm sm:text-sm md:text-base">
        {{ member.role }}
      </p>
    </div>

    <!-- Soft outline -->
    <div
      class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5"
    ></div>
  </article>
</template>
