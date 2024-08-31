import {api} from "@/api";
import type {Patient, Procedure} from "@/types";
import {useUserStore} from "@/stores/userStore";

class SecretariaService {
    constructor() {};

    async getPatients(page = 1, pageSize = 24): Promise<Patient[]> {
        const {data} = await api.get("/patients?sort=id:desc", {
            params: {
                populate: "procedure"
            }
        });

        return data.data;
    };

    async newPatient(
        name: string,
        cpf: string,
        sus: string,
        phone: string,
        priority: string,
        procedure: number
    ): Promise<Patient> {
        const userStore = useUserStore();
        const {data} = await api.post("/patients", {
            data: {
                name: name,
                cpf: cpf,
                sus: sus,
                phone: phone,
                priority: phone,
                procedure: {
                    connect: [procedure]
                }
            }
        },
        {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }    
        });

        return data.data;
    }

    async updatePatient(
        id: number,
        name: string,
        cpf: string,
        sus: string,
        phone?: string,
        priority: string,
        status: string,
        withdrawal?: Date,
        withdrawer?: string,
        procedure: Procedure
    ): Promise<Patient> {
        const userStore = useUserStore();
        const {data} = await api.put(`/patients/${id}`, {
            data: {
                name: name,
                cpf: cpf,
                sus: sus,
                phone: phone,
                priority: phone,
                status: status,
                procedure: procedure.id
            }
        },
        {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        });

        return data.data;
    }

    async getProcedures(page = 1, pageSize = 24): Promise<Procedure[]> {
        const {data} = await api.get("/procedures");

        return data.data;
    };
    
}

export const secretariaService = new SecretariaService();
