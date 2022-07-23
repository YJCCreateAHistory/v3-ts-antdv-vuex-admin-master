import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
const routes:Array<RouteRecordRaw> = [
     {
        path:"/",
        name:"Login",
        component:()=>import("../views/Login.vue")
    },
    {
        path:"/home",
        name:"Home",
        component:()=>import("../views/Home.vue")
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router
