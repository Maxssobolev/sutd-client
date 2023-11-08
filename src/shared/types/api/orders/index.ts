import { Abonement } from 'entities/Abonement';
import { Client } from 'entities/Client';
import { Mentor } from 'entities/Mentor';
import { Order } from 'entities/Order';
import { Purchase } from 'entities/Purchase';

export interface GetAllOrders extends Order, Client {
    mentor_name: string;
}

export interface GetOneOrder extends Order, Client, Purchase, Mentor, Abonement {}