<script setup lang="ts">
import { ref } from "vue";
import Map from "../components/Map.vue";

// Simple form state
const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");

function onSubmit() {
  // replace with real submit logic / API call as needed
  console.log("Contact form submitted", {
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
  });
  // clear form after submit
  name.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-12">
    <div class="flex flex-col lg:flex-row gap-16 items-start">
      <!-- Left: Map -->
      <div class="w-full lg:w-1/2 flex flex-col">
        <h2 class="text-3xl font-semibold mb-6 text-[#202F66]">
          Where you can find us
        </h2>
        <p class="text-2xl text-[#120E08] font-light pb-4">
          Reach out today and let our experts guide you with reliable legal
          insight and strategic solutions
        </p>
        <div class="h-[290px] w-[650px] rounded-xl overflow-hidden shadow-lg">
          <Map />
        </div>
      </div>

      <!-- Right: Contact form -->
      <div class="w-full lg:w-1/2">
        <h2 class="text-3xl font-semibold mb-6 text-[#202F66]">
          Contact Us To Get Logical Consultation
        </h2>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              v-model="name"
              type="text"
              placeholder="Name"
              class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder: opacity-75 placeholder: font-semibold"
            />
            <input
              v-model="email"
              type="email"
              placeholder="E-Mail"
              class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder: opacity-75 placeholder: font-semibold"
            />
          </div>

          <input
            v-model="phone"
            type="tel"
            placeholder="Phone number"
            class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder: opacity-75 placeholder: font-semibold"
          />

          <textarea
            v-model="message"
            placeholder="Your Message"
            rows="8"
            class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm resize-none placeholder-[#202F66] placeholder: opacity-75 placeholder: font-semibold"
          ></textarea>

          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-95"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
