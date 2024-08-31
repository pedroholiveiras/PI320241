<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import {isAxiosError} from "axios";
    import {type Patient} from "@/types";
    import {usePatientStore} from "@/stores/patientStore";

    import Filter from "@/components/Filter.vue";
    import QueueItem from "@/components/QueueItem.vue";
    import PatientRegisterModal from "@/components/PatientRegisterModal.vue";
  
    const patients = usePatientStore().patients;
    const loading = ref(true);
    const error = ref("");
    
    onMounted(async () => {
        try {
            patients.value = await secretariaService.getPatients();
        } catch(e) {
            if (isAxiosError(e)) {
                error.value = e.response?.data.error.message;
            } else if (e instanceof Error) {
                error.value = e.message;
            }
        } finally {
            loading.value = false;
        }
    });
</script>

<template>
    <div class="row mt-4">
        <div class="d-flex text-primary mb-2">
            <h1>Lista de espera</h1>
        </div>
        <Filter></Filter>
        <table class="table ms-3 mt-3">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Procedimento</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-for="patient in patients.value" :key="patient.id">
                <QueueItem
                    :id="patient.id"
                    :name="patient.attributes.name"
                    :cpf="patient.attributes.cpf"
                    :sus="patient.attributes.cpf"
                    :phone="patient.attributes.phone"
                    :priority="patient.attributes.priority"
                    :status="patient.attributes.status"
                    :withdrawal="patient.attributes.withdrawal"
                    :withdrawer="patient.attributes.withdrawer"
                    :procedure="patient.attributes.procedure.data"
                ></QueueItem>
            </tbody>
        </table>
    </div>
</template>
