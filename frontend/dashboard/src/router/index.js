import {createWebHistory, createRouter} from 'vue-router'


import Login from "@/pages/login/Login.vue";
import LayoutV1 from "@/Layout/LayoutV1.vue";
import notFoundPage from "@/pages/notFoundPage/404page.vue"
import PermissionPage from "@/pages/default/permission/PermissionPage.vue";

const routes = [
    {   path: '/layout',
        name: "layoutV1",
        component: LayoutV1,
        children:[
            {
                path: "/permissions",
                name: "permissions",
                component: PermissionPage,
            }
        ],
    },

    {
        path: '/login',
        name: "login",
        component: Login
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: notFoundPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router