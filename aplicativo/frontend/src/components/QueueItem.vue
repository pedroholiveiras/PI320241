<script setup lang="ts">
    import {ref} from "vue";
    import type {Patient} from "@/types";
    import PatientDetailsModal from "@/components/PatientDetailsModal.vue";

    const selectedPatient = ref<Patient>({} as Patient);
    const props = defineProps<{
        patient: Patient
    }>();
</script>

<template>
    <PatientDetailsModal :patient="patient"></PatientDetailsModal>
    <div class="container card mb-2">
        <div
            type="button" 
            class="text-primary z-3 position-absolute mt-2 align-self-end"
            data-bs-toggle="modal"
            data-bs-target="#patientDetailsModal"
            ><i class="bi bi-pencil-square"/>
        </div>
        <div class="row p-2 mt-2">
            <div class="col-md-4">
                <h6>Nome</h6>
                <div class="mb-2">{{patient.attributes.name}}</div>
            </div>
            <div class="col-md-4 row">
                <div class="col">
                    <h6>CPF</h6>
                    <div class="mb-2 mono">{{patient.attributes.cpf}}</div>
                </div>
                <div class="col">
                    <h6>Nº SUS</h6>
                    <div class="mb-2 mono">{{patient.attributes.sus}}</div>
                </div>
            </div>
            <div class="col-md-4 row">
                <div class="col">
                    <h6>Procedimento</h6>
                    <div class="mb-2">
                        <span v-if="patient.attributes.procedure.data.attributes.address == 'Município'">
                            <abbr class="text-primary b" title="Município">Ⓜ</abbr>
                        </span>
                        <span v-else>
                            <abbr class="text-primary b" title="Policlínica">Ⓟ </abbr>
                        </span>
                        {{patient.attributes.procedure.data.attributes.name}}
                    </div>
                </div>
                <div class="col">
                    <h6>Contato</h6>
                    <div v-if="patient.attributes.phone" class="mb-2 mono">{{patient.attributes.phone}}</div>
                    <div v-else class="mb-2 mono">—</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    h6 {
        margin: 0;
        font-size: 10pt;
    }
    abbr {
        text-decoration: none;
        font-weight: bold;
    }
    .mono {
        font-family: monospace;
    }
</style>
