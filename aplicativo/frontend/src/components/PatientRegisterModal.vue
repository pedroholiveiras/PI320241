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
        patients.value = await secretariaService.getPatients();
        console.log(patients.value);
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
        patient.attributes = patient.value;
        patient.attributes.procedure.attributes.name = "eu ae";
        console.log(patient.attributes);
        patients.value.unshift(patient);
    }
</script>

<template>
    <div class="modal" id="patientRegisterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="patientRegisterModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="patientRegisterModal">Cadastrar paciente</h1>
                </div>
                <div class="modal-body">
                    <form>
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
                            <label for="patientLastName" class="form-label">Prioridade<span class="req">*</span></label>
                            <select class="form-select" aria-label="Prioridade" v-model="patient.priority">
                                <option value="0">Baixa</option>
                                <option value="1">Média</option>
                                <option value="2">Alta</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="patientPhone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="patientPhone" v-model="patient.phone">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancelar
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
