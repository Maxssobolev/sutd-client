export interface Client {
    id: number, 
    fio: string,
    dob: string,
    mentor: {
        id: number,
        fio: string
    },
    orders: {
        id: number,
        createdAt: string,
    },
    abonements: {
        id: number,
        title: string,
    } | null
}