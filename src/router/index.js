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
        // {
        //   path: "lark_sso_callback",
        //   component: () => import("@/views/user/LarkSSOReturn.vue"),
        // },
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
          component: () => import("@/layout/groups/video/Main.vue"),
        },
        {
          path: "cover",
          component: () => import("@/layout/groups/cover/Main.vue"),
        },
      ],
    },
    {
      path: "/tools",
      component: () => import("@/layout/groups/tools/Main.vue"),
    },
    {
      path: "/about",
      component: () => import("@/views/about.vue")
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
