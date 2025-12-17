import { ref, readonly } from "vue";
import { useI18n } from "vue-i18n";

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface Client {
  icon: string;
  url: string;
}

interface TeamMember {
  name: string;
  job_title: string;
  image: string;
}

interface Blog {
  id: string;
  title: string;
  category: string;
  image: string;
  badge_class: string;
  created_at: string;
}

interface ApiResponse {
  services: Service[];
  clients: Client[];
  teamMembers: TeamMember[];
  blogs: Blog[];
}

// ---- GLOBAL (singleton) state ----
const services = ref<Service[]>([]);
const clients = ref<Client[]>([]);
const teamMembers = ref<TeamMember[]>([]);
const blogs = ref<Blog[]>([]);

const loading = ref(false);
const error = ref<string | null>(null);
const currentLanguage = ref<string | null>(null);

// ---- composable ----
export function useAppData() {
  const { locale } = useI18n();

  async function fetchAppData(langOverride?: string) {
    const lang =
      langOverride ||
      (locale.value as string) ||
      localStorage.getItem("locale") ||
      "en";

    // avoid unnecessary refetch if we already have data for this lang
    if (currentLanguage.value === lang && services.value.length > 0) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch("https://api.abdeenlegal.com/api/home", {
        headers: {
          "Content-Type": "application/json",
          language: lang,
        },
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = (await res.json()) as ApiResponse;

      services.value = data.services ?? [];
      clients.value = data.clients ?? [];
      teamMembers.value = data.teamMembers ?? [];
      blogs.value = data.blogs ?? [];

      currentLanguage.value = lang;
    } catch (e: any) {
      console.error(e);
      error.value = e?.message ?? "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  return {
    // readonly so nobody mutates from components
    services: readonly(services),
    clients: readonly(clients),
    teamMembers: readonly(teamMembers),
    blogs: readonly(blogs),
    loading: readonly(loading),
    error: readonly(error),
    currentLanguage: readonly(currentLanguage),

    fetchAppData,
  };
}
