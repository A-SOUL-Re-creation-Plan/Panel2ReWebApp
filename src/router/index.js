import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

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
        {
          path: "lark_sso_callback",
          component: () => import('@/views/user/LarkSSOReturn.vue')
        }
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



router.beforeEach((to,from,next)=>{
  if(to.path=='/user/login') return next();
  if(to.path=='/user/register') return next();
  if(to.path=="/user/lark_sso_callback") return next();
  const usrID = storeToRefs(useUserStore())
  if(usrID.id.value==''){
    return next("/user/login");
  }
  next()  
})


export default router
