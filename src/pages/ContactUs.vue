<script setup lang="ts">
import { ref } from "vue";
import Map from "../components/Map.vue";

// Simple form state
const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");

function onSubmit() {
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
  <section id="contact" class="w-full bg-[#F7F8FC] py-12 px-4 mb-20">
    <div class="max-w-7xl mx-auto flex flex-col gap-6">
      <!-- Heading -->
      <h1
        class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#ECC06F] text-center"
      >
        <span class="mx-4 text-[#ECC06F]">—</span>Contact Us<span
          class="mx-4 text-[#ECC06F]"
          >—</span
        >
      </h1>
      <p
        class="text-[#120E08] font-normal pt-2 pb-6 text-xl md:text-2xl text-center wrap-break-word whitespace-normal"
      >
        Reach out today and let our experts guide you with reliable legal
        insight and strategic solutions.
      </p>

      <!-- Main content -->
      <div
        class="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16"
      >
        <!-- Left: Map + Info -->
        <div class="w-full lg:w-1/2 flex flex-col">
          <h2
            class="text-2xl sm:text-3xl font-semibold mb-4 text-[#202F66] text-center lg:text-left"
          >
            Where You Can Find Us
          </h2>

          <!-- Responsive map -->
          <div
            class="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Map />
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="w-full lg:w-1/2">
          <h2
            class="text-2xl sm:text-3xl font-semibold mb-6 text-[#202F66] text-center lg:text-left"
          >
            Contact Us To Get Legal Consultation
          </h2>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Name / Email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="name"
                type="text"
                placeholder="Name"
                class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]"
              />
              <input
                v-model="email"
                type="email"
                placeholder="E-Mail"
                class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]"
              />
            </div>

            <!-- Phone -->
            <input
              v-model="phone"
              type="tel"
              placeholder="Phone Number"
              class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]"
            />

            <!-- Message -->
            <textarea
              v-model="message"
              placeholder="Your Message"
              rows="6"
              class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm resize-none placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]"
            ></textarea>

            <!-- Submit -->
            <div class="flex justify-center lg:justify-end">
              <button
                type="submit"
                class="bg-[#ECC06F] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
