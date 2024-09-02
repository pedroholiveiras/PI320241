<script setup lang="ts">
    import {ref, computed} from "vue";
    import {isAxiosError} from "axios";
    import {useRouter} from "vue-router";
    import {authenticationService} from "@/api/AuthenticationService";

    const errorMessage = ref("");
    const submitted = ref(false);
    const router = useRouter();

    const cpf = ref("");
    const password = ref("");

    async function authenticate() {
        submitted.value = true;

        try {
            const user = await authenticationService.login(cpf.value, password.value);
            if (user.role.name == "Authenticated") {
                router.push("/");
            } else {
                router.push("/login");
            }
        } catch(e) {
            if(isAxiosError(e)) {
                console.log(e.response?.data);
                errorMessage.value = e.response?.data.error.message;
            }
        }
    }
</script>

<template>
    <div class="card mt-4">
        <div class="card-body mx-2">
            <h1 class="my-4">Entrar</h1>
            <form novalidate @submit.prevent="authenticate" :class="{'was-validated': submitted}">
                <div class="mb-3">
                    <label for="cpfInput" class="form-label">E-mail<span class="req">*</span></label>
                    <input
                        v-model="cpf"
                        type="text"
                        class="form-control"
                        id="cpfInput"
                        required
                    >
                </div>
                <div class="mb-4">
                    <label for="passwordInput" class="form-label">Senha<span class="req">*</span></label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="passwordInput"
                        required
                    >
                </div>
                <div class="alert alert-danger" role="alert" v-if="errorMessage">
                    {{errorMessage}}
                </div>
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!(cpf && password)"
                    > Entrar
                </button>
            </form>
        </div>
    </div>
</template>

<style>
    .card {
        max-width: 512px !important;
        margin: auto;
    }
    .req{
        color: red;
        margin-left: 2px;
    }
</style>
