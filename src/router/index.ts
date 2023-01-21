import { createRouter, createWebHistory } from "vue-router";

import NoteList from "../views/NoteList.vue";
import NoteRedactor from "../views/NoteRedactor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "NoteList",
      component: NoteList,
    },
    {
      path: "/about",
      name: "NoteRedactor",
      component: NoteRedactor,
    },
  ],
});

export default router;
