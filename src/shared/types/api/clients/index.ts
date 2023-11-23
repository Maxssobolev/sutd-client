import { Abonement } from "entities/Abonement/model";
import { Client } from "entities/Client";
import { Mentor } from "entities/Mentor/model";
import { Purchase } from "entities/Purchase/model";

export interface GetAllClients extends Omit<Client, 'mentorId'>{
    last_order_date:string | null,
    abonement_status:string | null,
    mentor_name: string | null,
    purchase_enddate: string | null,
    purchase_ispaid: boolean | null,
}

export interface GetOneClient extends Client, Abonement, Purchase, Mentor {
    
}