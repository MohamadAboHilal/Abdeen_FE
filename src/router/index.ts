import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import NewsDetailPage from "../pages/NewsDetailPage.vue";
import i18n from "../i18n/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Root: redirect to saved lang (browser) or en (fallback)
    {
      path: "/",
      redirect: () => {
        const lang =
          typeof window !== "undefined"
            ? localStorage.getItem("locale") || "en"
            : "en";
        return `/${lang}/`;
      },
    },

    // Language-prefixed routes
    { path: "/:lang(en|ar)/", name: "home", component: Home },
    {
      path: "/:lang(en|ar)/news/:id",
      name: "news-detail",
      component: NewsDetailPage,
    },

    // 404
    { path: "/:pathMatch(.*)*", redirect: "/en/" },
  ],

  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

// Sync i18n + localStorage with URL param
router.beforeEach((to) => {
  const lang = typeof to.params.lang === "string" ? to.params.lang : null;

  if (lang === "en" || lang === "ar") {
    i18n.global.locale.value = lang; // Vue I18n v9
    if (typeof window !== "undefined") localStorage.setItem("locale", lang);
  }
});

export default router;
