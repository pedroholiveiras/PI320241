<script setup lang="ts">
    import {useUserStore} from "@/stores/userStore";

    const userStore = useUserStore();
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm border-bottom">
        <div class="container-fluid">
            <router-link to="/lista" class="navbar-brand text-primary">
                <img src="@/assets/ssq.svg" height="32" alt="Brasão de Quixadá">
                <span class="ms-2">Secretaria de Saúde</span>
            </router-link>
            <div class="d-flex">{{userStore.user.username ? userStore.user.username : "Não logado"}}</div>
        </div>
    </nav>
</template>
