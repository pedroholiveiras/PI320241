<script setup lang="ts">
    import PatientRegisterModal from "@/components/PatientRegisterModal.vue";
    import FilterModal from "@/components/FilterModal.vue";
    import {ref, computed} from "vue";
    import {storeToRefs} from "pinia";
    import {usePatientStore} from "@/stores/patientStore";
    import type {Patient, Procedure} from "@/types";

    const patient = ref<Patient>({} as Patient);
    const patients = usePatientStore().patients;
    const filteredPatients = usePatientStore().filteredPatients;
    const searchedPatients = ref<Patient[]>([]);
    const searchBar = ref("");

    function search() {
        filteredPatients.value = patients.value.filter(p =>
            p.attributes.name.includes(searchBar.value) ||
            p.attributes.cpf.includes(searchBar.value) ||
            p.attributes.sus.includes(searchBar.vaue)
        );
    };
</script>

<template>
    <FilterModal></FilterModal>
    <PatientRegisterModal></PatientRegisterModal>
    <div class="d-flex">
        <div class="input-group me-2">
            <span
                class="input-group-text"
                id="button-addon1"
                @click="search"
                ><i class="bi bi-search"></i>
            </span>
            <input
                type="text"
                class="form-control"
                placeholder="Pesquisar"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="searchBar"
                @keyup.enter="search"
            >
        </div>
        <button
            class="btn btn-outline-primary me-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
            ><i class="bi bi-filter"></i>
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
