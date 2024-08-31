import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from "@/stores/userStore";
import {api} from "@/api";

import Queue from "@/pages/Queue.vue";
import Login from "@/pages/Login.vue";
import Error from "@/pages/error/Error.vue";
import Unauthorised from "@/pages/error/Unauthorised.vue";
import NotFound from "@/pages/error/NotFound.vue";

const routes = [
    {
        path: "/",
        alias: "/lista",
        component: Queue,
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/entrar",
        component: Login
    },
    {
        path: "/401",
        name: "401",
        component: Unauthorised
    },
    {
        path: "/404",
        name: "404",
        component: NotFound
    },
    {
        path: "/:pathMatch(.*)*",
        name: "error",
        component: Error
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    const userStore = useUserStore();
    const user = userStore.user.username;

    if (to.meta.requireAuth && user == null) {
        return {path: "/entrar"};
    }
});

api.interceptors.response.use(response => response, error => {
    const {response} = error;

    if (response && response.status != 400) {
        router.push({
            name: `${response.status}`
        })
    } else {
        return Promise.reject(error);
    }
})
