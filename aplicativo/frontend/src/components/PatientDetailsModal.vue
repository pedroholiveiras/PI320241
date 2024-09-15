<script setup lang="ts">
    import {ref, onBeforeMount, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import {usePatientStore} from "@/stores/patientStore";
    import {isAxiosError} from "axios";
    import type {Patient, Procedure} from "@/types";
    import PatientRemove from "@/components/PatientRemove.vue";

    const props = defineProps<{
        selectedPatient: Patient
    }>();

    const filteredPatients = usePatientStore().filteredPatients;
    const procedures = ref<Procedure[]>([]);
    const patient = ref<Patient>({} as Patient);

    const remover = ref(0);

    onBeforeMount(async () => {
        patient.value = JSON.parse(JSON.stringify(props.selectedPatient));
        const prcd = ref(patient.value);

        try {
            procedures.value = await secretariaService.getProcedures();
        } catch (error) {
            console.error("Erro ao carregar procedimentos:", error);
        }
    });

    async function updatePatient() {
        try {
            for (let p of filteredPatients.value)
                if (p.id == patient.value.id)
                    p.attributes = patient.value.attributes;
            patient.value = JSON.parse(JSON.stringify(props.selectedPatient));

            const updatedPatient = await secretariaService.updatePatient(
                patient.value.id,
                patient.value.attributes.name,
                patient.value.attributes.cpf,
                patient.value.attributes.sus,
                patient.value.attributes.phone,
                patient.value.attributes.priority,
                patient.value.attributes.status,
                patient.value.attributes.procedure.data.id,
                patient.value.attributes.withdrawal,
                patient.value.attributes.withdrawer
            );

        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data);
            }
            console.error("Erro ao atualizar o paciente:", error);
            alert("Erro ao atualizar o paciente.");
        }
    }

    async function resetPatient() {
        patient.value = JSON.parse(JSON.stringify(props.selectedPatient));
    }

    async function removePatient() {
        filteredPatients.value = filteredPatients.value.filter(
            p => p.id != patient.value.id
        );

        await secretariaService.removePatient(props.selectedPatient.id);
    }
</script>

<template>
    <div class="modal" :id="'patientDetailsModal' + props.selectedPatient.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="patientRegisterModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header fs-5" id="patientRegisterModalLabel">
                    <h1 class="modal-title fs-5">Editar Paciente</h1>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="patientName" class="form-label">Nome<span class="req">*</span></label>
                        <input type="text" class="form-control" id="patientName" v-model="patient.attributes.name">
                    </div>
                    <div class="mb-3">
                        <label for="patientCPF" class="form-label">CPF<span class="req">*</span></label>
                        <input type="text" class="form-control" id="patientCPF" v-model="patient.attributes.cpf">
                    </div>
                    <div class="mb-3">
                        <label for="patientSUS" class="form-label">Número do SUS<span class="req">*</span></label>
                        <input type="text" class="form-control" id="patientSUS" v-model="patient.attributes.sus">
                    </div>
                    <div class="mb-3">
                        <label for="patientProcedure" class="form-label">Procedimento<span class="req">*</span></label>
                        <select class="form-control" id="patientProcedure" v-model="patient.attributes.procedure.data.id">
                            <option v-for="procedure in procedures" :key="procedure.id" :value="procedure.id">
                            {{ procedure.attributes.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="patientUpdatePriority" class="form-label">Prioridade<span class="req">*</span></label>
                        {{typeof(patient.attributes.priority)}}
                        <div id="patientUpdatePriority">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="patientUpdatePriority" :id="'patientUpdatePrio0' + patient.id" :value="0" v-model="patient.attributes.priority">
                                <label class="form-check-label" :for="'patientUpdatePrio0' + patient.id">Concluído</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="patientUpdatePriority" :id="'patientUpdatePrio1' + patient.id" :value="1" v-model="patient.attributes.priority">
                                <label class="form-check-label" :for="'patientUpdatePrio1' + patient.id">Baixa</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="patientUpdatePriority" :id="'patientUpdatePrio2' + patient.id" :value="2" v-model="patient.attributes.priority">
                                <label class="form-check-label" :for="'patientUpdatePrio2' + patient.id">Média</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="patientUpdatePriority" :id="'patientUpdatePrio3' + patient.id" :value="3" v-model="patient.attributes.priority">
                                <label class="form-check-label" :for="'patientUpdatePrio3' + patient.id">Alta</label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="patientPhone" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="patientPhone" v-model="patient.attributes.phone">
                    </div>
                    <div class="mb-3">
                        <label for="patientPhone" class="form-label">Data de retirada {{}}</label>
                        <input type="date" class="form-control" id="patientPhone" v-model="patient.attributes.withdrawal">
                    </div>
                    <div class="mb-3">
                        <label for="patientPhone" class="form-label">Quem retirou</label>
                        <input type="text" class="form-control" id="patientPhone" v-model="patient.attributes.withdrawer">
                    </div>
                </div>
                <div class="modal-footer">
                    <div v-if="remover">
                        <span class="me-2">Remover paciente?</span>
                        <button
                            class="btn btn-outline-danger me-2"
                            type="button"
                            data-bs-dismiss="modal"
                            @click="removePatient"
                            >Sim
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-primary me-2"
                            @click="remover = 0"
                            >Não
                        </button>
                    </div>
                    <div v-else>
                        <button
                            class="btn btn-outline-danger me-2"
                            type="button"
                            @click="remover = 1"
                            ><i class="bi bi-trash"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-primary me-2"
                            data-bs-dismiss="modal"
                            @click="resetPatient"
                            >Fechar
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="updatePatient"
                            >Salvar alterações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
