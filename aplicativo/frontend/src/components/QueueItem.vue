<script setup lang="ts">
<<<<<<< HEAD
import { ref, onMounted } from 'vue';
import { secretariaService } from '@/api/SecretariaService';
import type { Procedure } from "@/types";

const selectedPatient = ref({
  id: 0,
  name: '',
  cpf: '',
  sus: '',
  phone: '',
  priority: 0,
  status: 0,
  withdrawal: '',
  withdrawer: '',
  procedure: {
    id: 0,
    attributes: {
      name: ''
    }
  }
});

const procedures = ref<Procedure[]>([]);

const props = defineProps<{
  id: number,
  name: string,
  cpf: string,
  sus: string,
  phone?: string,
  priority?: number,
  status?: number,
  withdrawal?: Date,
  withdrawer?: string,
  procedure: {
    id: number,
    attributes: {
      name: string
    }
  }
}>();

function openModal(patient: typeof selectedPatient.value) {
  selectedPatient.value = { ...patient }; // Garantir que fazemos uma cópia
}

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
  <tr>
    <td>{{ name }}</td>
    <td style="font-family: monospace">{{ cpf }}</td>
    <td>{{ procedure.attributes.name }}</td>
    <td class="text-center">
      <button 
        type="button" 
        class="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
        @click="openModal({ id, name, cpf, sus, phone, priority, status, withdrawal, withdrawer, procedure })"
      >
        <i class="bi bi-eye"></i>
      </button>
    </td>
  </tr>
  
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Paciente</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="patientName" class="form-label">Nome</label>
            <input type="text" class="form-control" id="patientName" v-model="selectedPatient.name">
          </div>
          <div class="mb-3">
            <label for="patientCPF" class="form-label">CPF</label>
            <input type="text" class="form-control" id="patientCPF" v-model="selectedPatient.cpf">
          </div>
          <div class="mb-3">
            <label for="patientSUS" class="form-label">SUS</label>
            <input type="text" class="form-control" id="patientSUS" v-model="selectedPatient.sus">
          </div>
          <div class="mb-3">
            <label for="patientPhone" class="form-label">Telefone</label>
            <input type="text" class="form-control" id="patientPhone" v-model="selectedPatient.phone">
          </div>
          <div class="mb-3">
            <label for="patientProcedure" class="form-label">Procedimento</label>
            <!-- Select para procedimentos disponíveis -->
            <select class="form-control" id="patientProcedure" v-model="selectedPatient.procedure.id">
              <option v-for="procedure in procedures" :key="procedure.id" :value="procedure.id">
                {{ procedure.attributes.name }}
              </option>
            </select>
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
=======
    const props = defineProps<{
        id: number,
        name: string,
        cpf: string,
        sus: string,
        phone?: string,
        priority?: number,
        status?: number,
        withdrawal?: Date,
        withdrawer?: string,
        procedure: Procedure
    }>();
</script>

<template>
    <tr>
        <td>{{name}}</td>
        <td style="font-family: monospace">{{cpf}}</td>
        <!--<td>{{procedure.attributes.name}}</td>-->
        <td class="text-center">
            <button type="button" class="btn btn-primary">
                <i class="bi bi-eye"></i>
            </button>
        </td>
    </tr>
>>>>>>> 28e4072262ba3fabfe2f2c621d1225cc7d12d4b9
</template>
