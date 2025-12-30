// router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import NewsDetailPage from "../pages/NewsDetailPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Redirect root to default language
    { path: "/", redirect: "/en/" },
    // Language-prefixed routes
    { path: "/:lang(en|ar)/", name: "home", component: Home },
    {
      path: "/:lang(en|ar)/news/:id",
      name: "news-detail",
      component: NewsDetailPage,
    },
    // Optionally, catch-all for 404s
    // { path: '/:pathMatch(.*)*', redirect: '/en' },
  ],

  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
