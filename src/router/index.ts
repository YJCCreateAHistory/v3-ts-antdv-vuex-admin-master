import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/ ",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: "/role",
        name: "Role",
        component: () => import("../components/role/Role.vue"),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/classes',
        name: "Classes",
        component: () => import("../components/blogclasses/Classes.vue"),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/friend',
        name: "Friend",
        component: () => import("../components/friendLink/Friend.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/site',
        name: "Site",
        component: () => import("../components/webSite/Site.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/comment',
        name: "Comment",
        component: () => import("../components/comment/Comment.vue"),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/socials',
        name: "Socials",
        component: () => import("../components/socials/Socials.vue"),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/music',
        name: "Music",
        component: () => import("../components/music/Music.vue"),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/tag',
        name: "Tag",
        component: () => import("../components/tag/Tag.vue"),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/blog/:id',
        name: "Blog",
        component: () => import("../components/blog/Blog.vue"),
        meta: {
          keepAlive: true,
          title:["客户端管理","博客管理"]
        }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name === "Login") {
    return next()
  }
  if (to.name !== "Login" && !window.sessionStorage.getItem("token")) {
    return next({ name: "Login" });
  }

  next()
});
export default router;
