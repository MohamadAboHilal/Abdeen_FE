// router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import NewsDetailPage from "../pages/NewsDetailPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/news/:id", name: "news-detail", component: NewsDetailPage },
  ],

  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
