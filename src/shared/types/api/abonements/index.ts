import { Abonement } from "entities/Abonement/model";

export interface GetAllAbonements extends Abonement {}

export interface GetOneAbonement extends Abonement {}

export interface GetStats {
    abonement_title: string;
    abonement_quantity: number;
    abonement_totalprice: number;

}

export interface GetCommonStats {
    clients_total_count: string,
    purchases_total_count: string,
    purchases_total_amount: string,
    orders_total_open_count: string,
}