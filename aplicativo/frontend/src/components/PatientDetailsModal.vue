<script setup lang="ts">
    import {ref, onBeforeMount, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import type {Patient, Procedure} from "@/types";
    
    const props = defineProps<{
        patient: Patient
    }>();

    const procedures = ref<Procedure[]>([]);
    const selectedPatient = ref<Patient>({} as Patient);
    
    onBeforeMount(() => {
        selectedPatient.value = {...props.patient}; // Garantir que fazemos uma cópia
    });
    
    async function updatePatient() {
        try {
            const priority = selectedPatient.value.priority?.toString() || '';
            const status = selectedPatient.value.status?.toString() || '';

            console.log('Dados enviados para atualização:', selectedPatient.value);

            const updatedPatient = await secretariaService.updatePatient(
                selectedPatient.value.id,
                selectedPatient.value.name,
                selectedPatient.value.cpf,
                selectedPatient.value.sus,
                selectedPatient.value.phone || '',
                priority,
                status,
                selectedPatient.value.withdrawal || undefined,
                selectedPatient.value.withdrawer || '',
                selectedPatient.value.procedure
            );

            alert('Paciente atualizado com sucesso!');
            location.reload(); // Atualiza a página após a atualização
        } catch (error) {
            console.error('Erro ao atualizar o paciente:', error);
            alert('Erro ao atualizar o paciente.');
        }
    }

    // Carrega os procedimentos disponíveis ao montar o componente
    onMounted(async () => {
        try {
            procedures.value = await secretariaService.getProcedures();
        } catch (error) {
            console.error('Erro ao carregar procedimentos:', error);
        }
    });
</script>

<template>
    <div class="modal" id="patientDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="patientRegisterModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header fs-5" id="patientRegisterModalLabel">
                    <h1 class="modal-title fs-5">Editar Paciente</h1>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="patientName" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="patientName" v-model="selectedPatient.attributes.name">
                    </div>
                    <div class="mb-3">
                        <label for="patientCPF" class="form-label">CPF</label>
                        <input type="text" class="form-control" id="patientCPF" v-model="selectedPatient.attributes.cpf">
                    </div>
                    <div class="mb-3">
                        <label for="patientSUS" class="form-label">SUS</label>
                        <input type="text" class="form-control" id="patientSUS" v-model="selectedPatient.attributes.sus">
                    </div>
                    <div class="mb-3">
                        <label for="patientPhone" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="patientPhone" v-model="selectedPatient.attributes.phone">
                    </div>
                    <div class="mb-3">
                        <label for="patientProcedure" class="form-label">Procedimento</label>
                        <!-- Select para procedimentos disponíveis 
                        <select class="form-control" id="patientProcedure" v-model="selectedPatient.procedure.id">
                            <option v-for="procedure in procedures" :key="procedure.id" :value="procedure.id">
                            {{ procedure.attributes.name }}
                            </option>
                        </select>
                        -->
                    </div>
                    <!-- Adicione mais campos conforme necessário -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" @click="updatePatient">Salvar alterações</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
