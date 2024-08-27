import {createRouter, createWebHistory} from "vue-router";
import Queue from "@/pages/Queue.vue";
import Login from "@/pages/Login.vue";

const routes = [
    {
        path: "/",
        alias: "/lista",
        component: Queue
    },
    {
        path: "/login",
        component: Login
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
