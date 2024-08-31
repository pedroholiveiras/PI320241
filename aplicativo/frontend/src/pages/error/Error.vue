<script setup lang="ts">
    import {computed} from "vue";
    import {useUserStore} from "@/stores/userStore"

    const userStore = useUserStore();
    const props = defineProps<{
        status: string,
        msg: string
    }>();

    const icon = computed(() => {
        switch(Number(props.status)) {
            case 401:
                return "hands-thumbs-down";
            case 404:
                return "exclamation-octagon";
            case 500:
                return "tropical-storm";
            default:
                return "info-square";
        }
    });
</script>

<template>
    <h1 class="text-primary mt-4"><i :class="'bi bi-' + icon"/> Algo deu errado…</h1>
    <h2 v-if="msg != undefined" class="text-muted">{{msg}}</h2>
    <router-link to="/lista" v-if="userStore.user">Voltar</router-link>
    <router-link to="/entrar" v-else>Entrar</router-link>
</template>
