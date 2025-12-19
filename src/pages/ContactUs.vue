<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import Map from "../components/Map.vue";

const { t, locale } = useI18n();

// compute alignment classes based on active locale (Arabic -> RTL)
const headingAlignClass = computed(() =>
  locale.value === "ar"
    ? "text-center lg:text-right"
    : "text-center lg:text-left"
);

// Simple form state
const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");

// Request state
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref<string | null>(null);

async function onSubmit() {
  if (isSubmitting.value) return;

  submitSuccess.value = false;
  submitError.value = null;
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("message", message.value);

    const res = await fetch("https://api.abdeenlegal.com/api/contact_us", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "Application/Json",
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    // Optional: read response if needed
    // const data = await res.json();

    submitSuccess.value = true;

    // clear form
    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
  } catch (err: any) {
    submitError.value =
      err?.message ?? "Something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

// script setup
const inputDir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));
const inputAlignClass = computed(() =>
  locale.value === "ar" ? "text-right" : "text-left"
);
</script>

<template>
  <section id="contact" class="w-full bg-[#F7F8FC] py-12 px-4 mb-20">
    <div class="max-w-7xl mx-auto flex flex-col gap-6">
      <!-- Heading -->
      <h1
        class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#ECC06F] text-center"
      >
        <span class="mx-4 text-[#ECC06F]">—</span>
        {{ t("contact.title") }}
        <span class="mx-4 text-[#ECC06F]">—</span>
      </h1>

      <p
        class="text-[#120E08] font-normal pt-2 pb-6 text-xl md:text-2xl text-center"
      >
        {{ t("contact.subtitle") }}
      </p>

      <div
        class="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16"
      >
        <!-- Left: Map + Info -->
        <div class="w-full lg:w-1/2 flex flex-col">
          <h2
            :class="[
              'text-2xl sm:text-3xl font-semibold mb-4 text-[#202F66]',
              headingAlignClass,
            ]"
          >
            {{ t("contact.findUs") }}
          </h2>

          <div
            class="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Map />
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="w-full lg:w-1/2">
          <h2
            :class="[
              'text-2xl sm:text-3xl font-semibold mb-6 text-[#202F66]',
              headingAlignClass,
            ]"
          >
            {{ t("contact.formTitle") }}
          </h2>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Name / Email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="name"
                type="text"
                :placeholder="t('contact.fields.name')"
                :dir="inputDir"
                :class="[
                  'w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]',
                  inputAlignClass,
                ]"
              />
              <input
                v-model="email"
                type="email"
                :placeholder="t('contact.fields.email')"
                :dir="inputDir"
                :class="[
                  'w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]',
                  inputAlignClass,
                ]"
              />
            </div>

            <!-- Phone -->
            <input
              v-model="phone"
              type="tel"
              :placeholder="t('contact.fields.phone')"
              :dir="inputDir"
              :class="[
                'w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]',
                inputAlignClass,
              ]"
            />

            <!-- Message -->
            <textarea
              v-model="message"
              rows="6"
              :placeholder="t('contact.fields.message')"
              class="w-full rounded-lg bg-[#ECEEF9] p-4 shadow-sm resize-none placeholder-[#202F66] placeholder:opacity-75 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#ECC06F]"
            ></textarea>

            <!-- Submit -->
            <div class="flex flex-col gap-2 justify-center lg:justify-end">
              <div class="flex justify-center lg:justify-end">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="bg-[#ECC06F] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{
                    isSubmitting ? t("contact.send") + "..." : t("contact.send")
                  }}
                </button>
              </div>

              <!-- Status messages -->
              <p
                v-if="submitSuccess"
                class="text-sm text-green-600 text-center lg:text-right"
              >
                {{
                  t("contact.success") ||
                  "Your message has been sent successfully."
                }}
              </p>
              <p
                v-if="submitError"
                class="text-sm text-red-600 text-center lg:text-right"
              >
                {{ submitError }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
