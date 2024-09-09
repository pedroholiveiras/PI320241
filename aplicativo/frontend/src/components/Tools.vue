<script setup lang="ts">
    import PatientRegisterModal from "@/components/PatientRegisterModal.vue";
    import FilterModal from "@/components/FilterModal.vue";
    import {ref} from "vue";
    import {usePatientStore} from "@/stores/patientStore";
    import type {Patient, Procedure} from "@/types";

    const patient = ref<Patient>({} as Patient);
    const patients = usePatientStore().patients;
</script>

<template>
    <FilterModal></FilterModal>
    <PatientRegisterModal></PatientRegisterModal>
    <div class="d-flex">
        <div class="input-group me-2">
            <span class="input-group-text" id="button-addon1">
                <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <button
            class="btn btn-outline-primary me-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
            @click="teste">
            <i class="bi bi-filter"></i>
        </button>
        <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#patientRegisterModal">
            Cadastrar paciente
        </button>
    </div>
</template>

<style scoped>
    .input-group {
        max-width: 30%;
    }
</style>
