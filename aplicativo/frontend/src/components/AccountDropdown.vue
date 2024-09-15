<script setup lang="ts">
    import {useUserStore} from "@/stores/userStore";
    const userStore = useUserStore();
</script>

<template>
    <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Conta
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
                <a class="dropdown-item" href="#" @click="userStore.logout">
                    Procedimentos
                </a>
            </li>
            <li><a class="dropdown-item" href="#" @click="userStore.logout">Sair</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
                <span class="dropdown-item disabled">
                    Logado como:<br>
                    {{userStore.user.username}}
                </span>
            </li>
        </ul>
    </div>
</template>
