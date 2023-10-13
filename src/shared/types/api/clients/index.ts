import { Client } from "entities/Client";


export interface GetAllClients extends Omit<Client, 'mentorId' | 'isMember'>{
    last_order_date:string | null,
    abonement_status:string,
    mentor_name:string    
}