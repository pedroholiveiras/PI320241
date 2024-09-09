<script setup lang="ts">
    import {ref, onBeforeMount, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import {usePatientStore} from "@/stores/patientStore";
    import type {Patient, Procedure} from "@/types";

    const patients = usePatientStore().patients;
    const procedures = ref<Procedure[]>([]);
    const selectedProcedures = ref<Procedure[]>([]);
    const checkedProcedures = ref([]);

    onMounted(async () => {
        procedures.value = await secretariaService.getProcedures();
        patients.value = await secretariaService.getPatients();
        const procIDs = new Set();
        
        for (const patient of patients.value) {
            procIDs.add(patient.attributes.procedure.data.id);
        }

        console.log(Array.from(procIDs));
    });

    function selectProcedures() {
        for (let i = 0; i < procedures.value.length; i++) {
            selectedProcedures.value.push(
                procedures.value.filter(pcd => pcd.id === checkedProcedures[i])
            );
        }

        procedures.value = selectedProcedures.value;
        selectedProcedures.value = {};
    }
</script>

<template>
    <div class="modal" id="filterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="filterModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-filter">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="filterModalLabel">Configurações do filtro</h1>
                </div>
                <div class="modal-body">
                    <label class="form-label" for="procedureList">Procedimentos<span class="req">*</span></label>
                    <div id="procedureList" v-for="procedure in procedures" :key="procedure.id">
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                :value="procedure.id"
                                :id="'procedure-' + procedure.id"
                                v-model="checkedProcedures">
                            <label class="form-check-label" :for="'procedure-' + procedure.id">
                                <span v-if="procedure.attributes.address == 'Município'">
                                    <abbr class="text-primary b" title="Município">Ⓜ</abbr>
                                </span>
                                <span v-else>
                                    <abbr class="text-primary b" title="Policlínica">Ⓟ </abbr>
                                </span>
                                {{procedure.attributes.name}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        data-bs-dismiss="modal"
                        > Cancelar
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        @click="selectProcedures"
                        > Salvar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    abbr {
        text-decoration: none;
        font-weight: bold;
    }
</style>
