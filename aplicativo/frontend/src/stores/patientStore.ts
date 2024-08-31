import {ref, computed} from "vue";
import {defineStore} from "pinia";
import {type Patient} from "@/types";

export const usePatientStore = defineStore("patient", () => {
    const patients = ref<Patient[]>([]);
    return {patients};
});
