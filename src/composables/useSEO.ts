import { ref, readonly } from "vue";

export interface SeoPayload {
  // basic
  favicon?: string;
  title?: string;
  description?: string;
  canonical?: string;

  // API returns keywords as string[]
  keywords?: string[];

  // Open Graph
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;

  // Twitter
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

type SeoApiResponse = {
  favicon?: string;
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];

  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_url?: string;

  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
};

const homeSeo = ref<SeoPayload | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

function normalizeSeo(api: SeoApiResponse): SeoPayload {
  return {
    favicon: api.favicon,
    title: api.title,
    description: api.description,
    canonical: api.canonical,
    keywords: api.keywords,

    ogType: api.og_type,
    ogTitle: api.og_title,
    ogDescription: api.og_description,
    ogImage: api.og_image,
    ogUrl: api.og_url,

    twitterTitle: api.twitter_title,
    twitterDescription: api.twitter_description,
    twitterImage: api.twitter_image,
  };
}

export function useSeoFromApi() {
  async function fetchHomeSeo(lang: string, force = false) {
    if (!force && homeSeo.value) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch("https://api.abdeenlegal.com/api/seo", {
        headers: { language: lang },
      });

      if (!res.ok) throw new Error(`SEO home failed: ${res.status}`);

      const data = (await res.json()) as SeoApiResponse;
      homeSeo.value = normalizeSeo(data);
    } catch (e: any) {
      error.value = e?.message ?? "Unknown error";
      homeSeo.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    homeSeo: readonly(homeSeo),
    seoLoading: readonly(loading),
    seoError: readonly(error),
    fetchHomeSeo,
  };
}
