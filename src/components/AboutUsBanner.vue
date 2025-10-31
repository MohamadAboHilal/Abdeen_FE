<script setup lang="ts">
import established from "../assets/Abden Icon/Est 1996.svg";
import research from "../assets/Abden Icon/global Reach.svg";
import smallScale from "../assets/Abden Icon/م.svg";
import expert from "../assets/Abden Icon/Expert Team.svg";
</script>
<template>
  <div class="h-auto md:h-56 w-full bg-[#F7F4ED]">
    <div
      class="max-w-7xl mx-auto h-full grid grid-cols-2 space-y-8 md:grid-cols-4 items-center px-6 pb-12 md:px-0"
    >
      <div class="flex flex-col items-center space-y-2">
        <img
          :src="established"
          alt="Established Icon"
          class="h-16 w-16 md:h-18 md:w-18"
        />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          Est.1996
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          Years of Exellence
        </p>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <img
          :src="expert"
          alt="Expert Team Icon"
          class="h-16 w-16 md:h-18 md:w-18"
        />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          Expert Team
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          Specialized Lawyers
        </p>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <img
          :src="research"
          alt="Research Icon"
          class="h-16 w-16 md:h-18 md:w-18"
        />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          International
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          Golbal Reach
        </p>
      </div>
      <div class="flex flex-col items-center space-y-2 pb-6">
        <img
          :src="smallScale"
          alt="Small Scale Icon"
          class="h-16 w-16 md:h-18 md:w-18"
        />
        <p class="text-center text-xl md:text-2xl font-medium text-[#202F66]">
          All Courts
        </p>
        <p class="text-[#202F66] text-base md:text-lg font-semibold">
          Complete Coverage
        </p>
      </div>
    </div>
  </div>
</template>
