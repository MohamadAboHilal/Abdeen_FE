<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import whiteLogo from "../assets/Abden Icon/Logo white.svg";
import facebook from "../assets/Abden Icon/facebook_white.svg";
import linkedin from "../assets/Abden Icon/linkedin_white.svg";

import call from "../assets/Abden Icon/Call.png";
import location from "../assets/Abden Icon/Location.png";
import email from "../assets/Abden Icon/Message.png";

import { useSettings } from "../composables/useSettings";

const { t, locale } = useI18n();
const isArabic = computed(() => locale.value === "ar");

// settings composable
const { settings, fetchSettings } = useSettings();

// load settings once
onMounted(() => {
  fetchSettings();
});
</script>

<template>
  <footer class="bg-[#152032] text-slate-100">
    <!-- Top line -->
    <div class="w-full h-px bg-white/15"></div>

    <div class="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      <div
        class="grid grid-cols-1 md:[grid-template-columns:1fr_auto_1fr] items-start gap-12 text-center"
      >
        <!-- About Us -->
        <section
          :class="[
            'space-y-5 order-2 md:order-1',
            isArabic
              ? 'md:justify-self-end md:text-right'
              : 'md:justify-self-start md:text-left',
          ]"
        >
          <h3 class="text-2xl font-semibold">
            {{ t("footer.about.title") }}
          </h3>
          <p class="text-slate-300 leading-relaxed max-w-md mx-auto md:mx-0">
            {{ t("footer.about.text") }}
          </p>

          <!-- Social icons -->
          <div
            class="flex items-center justify-center md:justify-start gap-4 pt-2"
          >
            <!-- Facebook -->
            <a
              v-if="settings?.facebookUrl"
              :href="settings.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <img :src="facebook" alt="Facebook" class="h-5 w-5" />
            </a>

            <!-- LinkedIn -->
            <a
              v-if="settings?.linkedinUrl"
              :href="settings.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <img :src="linkedin" alt="LinkedIn" class="h-5 w-5" />
            </a>
          </div>
        </section>

        <!-- Center Logo -->
        <div
          class="flex justify-start md:justify-center items-start md:items-center order-1 md:order-2 place-self-center"
        >
          <img
            :src="whiteLogo"
            alt="Abdeen Law Firm"
            class="h-14 w-auto md:h-16 select-none"
          />
        </div>

        <!-- Contact Us -->
        <section
          :class="[
            'space-y-5 order-3 md:order-3',
            isArabic
              ? 'md:justify-self-start md:text-right'
              : 'md:justify-self-end md:text-left',
          ]"
        >
          <h3 class="text-2xl font-semibold">
            {{ t("footer.contact.title") }}
          </h3>

          <ul class="space-y-4 text-slate-300">
            <!-- Phone -->
            <li class="flex items-start justify-center md:justify-start gap-3">
              <div
                class="mt-1 h-7 w-7 rounded-md bg-white/10 flex items-center justify-center"
              >
                <img :src="call" alt="Call" class="h-5 w-5" />
              </div>
              <a
                v-if="settings?.phoneNumber"
                :href="`tel:${settings.phoneNumber}`"
                class="text-lg"
              >
                {{ settings.phoneNumber }}
              </a>
              <span v-else class="text-lg">—</span>
            </li>

            <!-- Location -->
            <li class="flex items-start justify-center md:justify-start gap-3">
              <div
                class="mt-1 h-7 w-7 rounded-md bg-white/10 flex items-center justify-center"
              >
                <img :src="location" alt="Location" class="h-6 w-5" />
              </div>

              <!-- If you want this to show actual formatted coordinates -->
              <span class="text-lg">
                <template v-if="settings?.latitude && settings?.longitude">
                  {{ t("footer.contact.location") }}<br />
                </template>
                <template v-else>
                  {{ t("footer.contact.location") }}
                </template>
              </span>
            </li>

            <!-- Email -->
            <li class="flex items-start justify-center md:justify-start gap-3">
              <div
                class="mt-1 h-7 w-7 rounded-md bg-white/10 flex items-center justify-center"
              >
                <img :src="email" alt="Email" class="h-5 w-5" />
              </div>

              <a
                v-if="settings?.mail"
                :href="`mailto:${settings.mail}`"
                class="text-lg hover:text-white transition"
              >
                {{ settings.mail }}
              </a>
              <span v-else class="text-lg">—</span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Bottom line -->
    <div class="w-full h-px bg-white/15"></div>

    <!-- Footer note -->
    <div class="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-slate-400">
      © {{ new Date().getFullYear() }} {{ t("footer.copyright") }}
    </div>
  </footer>
</template>
