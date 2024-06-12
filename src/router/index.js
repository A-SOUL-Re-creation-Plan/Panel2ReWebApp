import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Index.vue"),
    },
    {
      path: "/user",
      children: [
        {
          path: "login",
          component: () => import("@/views/user/Login.vue"),
        },
        {
          path: "register",
          component: () => import("@/views/user/Register.vue"),
        },
      ],
      meta: {
        fs: true,
      },
    },
    {
      path: "/groups",
      children: [
        {
          path: "video",
          component: () => import("@/views/groups/video/Main.vue")
        },
        {
          path: "cover",
          component: () => import("@/views/groups/cover/Main.vue")
        },
      ]
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
      hidden: true,
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: {
        fs: true,
      },
    },
  ],
});

export default router
