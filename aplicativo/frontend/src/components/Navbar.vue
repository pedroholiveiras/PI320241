<script setup lang="ts">
    import {useUserStore} from "@/stores/userStore";
    import AccountDropdown from "@/components/AccountDropdown.vue";
    const userStore = useUserStore();
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm border-bottom">
        <div class="container-fluid">
            <router-link to="/lista" class="navbar-brand text-primary">
                <img src="@/assets/ssq.svg" height="32" alt="Brasão de Quixadá">
                <span class="ms-2">Secretaria de Saúde</span>
            </router-link>
            <div class="d-flex" v-if="userStore.user.username">
                <AccountDropdown></AccountDropdown>
            </div>
        </div>
    </nav>
</template>
