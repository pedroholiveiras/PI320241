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
                priority: priority,
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
        phone: string,
        priority: string,
        status: number,
        procedure: number
    ): Promise<Patient> {
        const userStore = useUserStore();
        const {data} = await api.put(`/patients/${id}`, {
            data: {
                name: name,
                cpf: cpf,
                sus: sus,
                phone: phone,
                priority: priority,
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
/*
    async updatePatient(
        id: number,
        name: string,
        cpf: string,
        sus: string,
        phone: string,
        priority: string,
        status: string,
        withdrawal?: Date,
        withdrawer?: string,
        procedure: Procedure
    ): Promise<Patient> {
        const userStore = useUserStore();
    
        // Preparando payload com checagem de tipos
        const payload: any = {
            name: name,
            cpf: cpf,
            sus: sus,
            phone: phone,
            priority: priority !== '' ? parseInt(priority, 10) : undefined, // Convertendo para número
            status: status !== '' ? parseInt(status, 10) : undefined, // Convertendo para número
            procedure: procedure.id
        };
    
        // Adicionando campos opcionais apenas se existirem
        if (withdrawal) payload.withdrawal = withdrawal;
        if (withdrawer) payload.withdrawer = withdrawer;
    
        console.log('Dados enviados para a API:', payload);
    
        try {
            const {data} = await api.put(`/patients/${id}`, {
                data: payload
            },
            {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            });
    
            return data.data;
        } catch (error) {
            console.error('Erro na API:', error);
            throw error; // Re-throw o erro para ser capturado no componente
        }
    }
    */
    
    async getProcedures(page = 1, pageSize = 24): Promise<Procedure[]> {
        const {data} = await api.get("/procedures");

        return data.data;
    };
    
    async removePatient(id: number): Promise<Patient> {
        const userStore = useUserStore();

        const {data} = await api.delete(`/patients/${id}`,{
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        });

        return data.data;
    }
}

export const secretariaService = new SecretariaService();
