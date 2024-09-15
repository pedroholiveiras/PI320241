<script setup lang="ts">
    import {ref, onBeforeMount, onMounted} from "vue";
    import {secretariaService} from "@/api/SecretariaService";
    import {usePatientStore} from "@/stores/patientStore";
    import type {Patient, Procedure} from "@/types";

    const procedures = ref<Procedure[]>([]);
    const patients = usePatientStore().patients;
    const filteredPatients = usePatientStore().filteredPatients;

    const filterOptions = ref({
        priorities: [],
        procedures: []
    });
    
    function filterPatients() {
        filteredPatients.value = patients.value;

        filteredPatients.value = patients.value.filter(
            p => filterOptions.value.priorities.includes(
                p.attributes.priority
            )
        );

        filteredPatients.value = filteredPatients.value.filter(
            p => filterOptions.value.procedures.includes(
                p.attributes.procedure.data.id
            )
        );
    }

    onMounted(async () => {
        procedures.value = await secretariaService.getProcedures();
    });
</script>

<template>
    <div class="modal" id="filterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="filterModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-filter">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="filterModalLabel">Filtrar resultados</h1>
                </div>
                <div class="modal-body">
                    <div class="col mb-3">
                        <label for="filterPriority" class="form-label">Prioridade</label>
                        <div id="filterPriority">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="filterPriority" id="filterPrio0" :value="0" v-model="filterOptions.priorities">
                                <label class="form-check-label" for="filterPrio0">Concluído</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="filterPriority" id="filterPrio1" :value="1" v-model="filterOptions.priorities">
                                <label class="form-check-label" for="filterPrio1">Baixa</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="filterPriority" id="filterPrio2" :value="2" v-model="filterOptions.priorities">
                                <label class="form-check-label" for="filterPrio2">Média</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="filterPriority" id="filterPrio3" :value="3" v-model="filterOptions.priorities">
                                <label class="form-check-label" for="filterPrio3">Alta</label>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label" for="procedureList">Procedimentos</label>
                        <div id="procedureList" v-for="procedure in procedures" :key="procedure.id">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="procedure.id"
                                    :id="'procedure-' + procedure.id"
                                    v-model="filterOptions.procedures">
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
                        @click="filterPatients"
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
