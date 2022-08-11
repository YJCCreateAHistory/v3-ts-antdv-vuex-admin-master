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
      keepAlive: true,
      title: "首页"
    },
    children: [
      {
        path: "/client",
        name: "Client",
        component: () => import("../components/client/ClientPage.vue"),
        meta: {
          keepAlive: true,
          title: "客户端管理"
        },
        children: [
          {
            path: '/client/classes',
            name: "Classes",
            component: () => import("../components/blogclasses/Classes.vue"),
            meta: {
              keepAlive: true,
              title: "分类管理"

            }
          },
          {
            path: '/client/friend',
            name: "Friend",
            component: () => import("../components/friendLink/Friend.vue"),
            meta: {
              keepAlive: true,
              title: "友链管理"

            }
          },
          {
            path: '/client/site',
            name: "Site",
            component: () => import("../components/webSite/Site.vue"),
            meta: {
              keepAlive: true,
              title: "站点管理"

            }
          },
          {
            path: '/client/socials',
            name: "Socials",
            component: () => import("../components/socials/Socials.vue"),
            meta: {
              keepAlive: true,
              title: "社交管理"

            }
          },
          {
            path: '/client/tag',
            name: "Tag",
            component: () => import("../components/tag/Tag.vue"),
            meta: {
              keepAlive: true,
              title: "标签管理"

            }
          },
          {
            path: '/client/blog',
            name: "Blog",
            component: () => import("../components/blog/Blog.vue"),
            meta: {
              keepAlive: true,
              title: "博文管理"

            }
          }
        ]
      },
      {
        path: "/system",
        name: "System",
        component: () => import("../components/sys/System.vue"),
        meta:{
          keepAlive: true,
          title:"系统管理"
        },
        children: [
          {
            path: "/system/role",
            name: "Role",
            component: () => import("../components/role/Role.vue"),
            meta: {
              keepAlive: true,
              title: "角色管理"
            }
          },
          {
            path:"/system/user",
            name:"User",
            component:() => import("../components/user/User.vue"),
            meta:{
              keepAlive: true,
              title: "用户管理"
            }
          }
        ]
      }
    ]
  },
]

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
