export type Patient = {
    id: number,
    fname: string,
    lname: string,
    cpf: string,
    sus: string,
    phone?: string,
    priority: string,
    status?: string,
    withdrawal?: Date,
    withdrawer?: string,
    procedure: number
};

export type Procedure = {
    id: number,
    name: string,
    address: string
};

export type User = {
    jwt: string,
    id: number,
    username: string,
    email: string
    role: string
};
