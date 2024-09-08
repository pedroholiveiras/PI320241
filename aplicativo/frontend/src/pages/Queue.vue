<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import {isAxiosError} from "axios";
    import {type Patient} from "@/types";
    import {usePatientStore} from "@/stores/patientStore";

    import Tools from "@/components/Tools.vue";
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
        <Tools></Tools>
        <div class="mt-2">
            <div v-for="patient in patients.value" :key="patient.id">
                <QueueItem :patient="patient"></QueueItem>
            </div>
        </div>
    </div>
</template>
