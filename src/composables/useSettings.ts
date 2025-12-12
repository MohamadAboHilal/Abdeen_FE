import { ref, readonly } from "vue";

interface Settings {
  facebookUrl: string;
  linkedinUrl: string;
  phoneNumber: string;
  mail: string;
  longitude: string;
  latitude: string;
}

// ---- GLOBAL (singleton) state ----
const settings = ref<Settings | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useSettings() {
  async function fetchSettings(force = false) {
    if (!force && settings.value) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch("https://api.abdeenlegal.com/api/settings", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = (await res.json()) as Settings;

      settings.value = data ?? null;
    } catch (e: any) {
      console.error(e);
      error.value = e?.message ?? "Unknown error";
      settings.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    settings: readonly(settings),
    settingsLoading: readonly(loading),
    settingsError: readonly(error),
    fetchSettings,
  };
}
