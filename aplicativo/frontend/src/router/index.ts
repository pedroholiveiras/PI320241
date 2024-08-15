import {createRouter, createWebHistory} from "vue-router";
import Queue from "@/pages/Queue.vue";

const routes = [
    {
        path: "/",
        alias: "/fila",
        component: Queue
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
