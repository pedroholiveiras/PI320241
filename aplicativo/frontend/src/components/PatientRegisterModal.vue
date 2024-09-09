<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import {usePatientStore} from "@/stores/patientStore";
    import type {Patient, Procedure} from "@/types";

    const patient = ref<Patient>({} as Patient);
    const patients = usePatientStore().patients;
    const procedures = ref<Procedure[]>([]);

    onMounted(async () => {
        procedures.value = await secretariaService.getProcedures();
    });
    
    async function newPatient() {
        const {
            name,
            cpf,
            sus,
            phone,
            priority,
            procedure
        } = patient.value;
        
        await secretariaService.newPatient(
            name,
            cpf,
            sus,
            phone,
            priority,
            procedure
        );

        patient.value = {} as Patient;
        patients.value = await secretariaService.getPatients();
    }

    function clearForm() {
        patient.value = {} as Patient;
    }
</script>

<template>
    <div class="modal" id="patientRegisterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="patientRegisterModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="patientRegisterModalLabel">Cadastrar paciente</h1>
                </div>
                <div class="modal-body">
                        <div class="col mb-3">
                            <label for="patientFirstName" class="form-label">Nome<span class="req">*</span></label>
                            <input type="text" class="form-control" id="patientName" v-model="patient.name">
                        </div>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="patientCPF" class="form-label">CPF<span class="req">*</span></label>
                                    <input type="text" class="form-control" id="patientCPF" v-model="patient.cpf">
                                </div>
                                <div class="col mb-3">
                                    <label for="patientSUS" class="form-label">Número do SUS<span class="req">*</span></label>
                                    <input type="text" class="form-control" id="patientSUS" v-model="patient.sus">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="patientLastName" class="form-label">Procedimento<span class="req">*</span></label>
                            <select class="form-select" aria-label="Procedimento" v-model="patient.procedure">
                                <option v-for="procedure in procedures" :key="procedures.id" :value="procedure.id">
                                    {{procedure.attributes.name}} ({{procedure.attributes.address}})
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="patientRegisterPriority" class="form-label">Prioridade<span class="req">*</span></label>
                            <div id="patientRegisterPriority">
                                {{typeof(patient.priority)}}
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="patientRegisterPriority" id="patientRegisterPrio1" value="1" v-model="patient.priority">
                                    <label class="form-check-label" for="patientRegisterPrio1">Baixa</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="patientRegisterPriority" id="patientRegisterPrio2" value="2" v-model="patient.priority">
                                    <label class="form-check-label" for="patientRegisterPrio2">Média</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="patientRegisterPriority" id="patientRegisterPrio3" value="3" v-model="patient.priority">
                                    <label class="form-check-label" for="patientRegisterPrio3">Alta</label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="patientPhone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="patientPhone" v-model="patient.phone">
                        </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        data-bs-dismiss="modal"
                        @click="clearForm"
                        > Cancelar
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        @click="newPatient"
                        :disabled="!(patient.name && patient.cpf && patient.sus && patient.procedure && patient.priority)"
                        > Salvar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
