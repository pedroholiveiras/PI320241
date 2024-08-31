<script setup lang="ts">
    import {useUserStore} from "@/stores/userStore";

    const userStore = useUserStore();
</script>

<template>
    <div class="dropdown">
        <button class="btn btn-light dropdown-toggle border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Conta
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
                <span class="dropdown-item disabled">
                    Logado como:<br>
                    {{userStore.user.username}}
                </span>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="userStore.logout">Sair</a></li>
        </ul>
    </div>
</template>
