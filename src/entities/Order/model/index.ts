import { OrderStatus } from "../types/order.statuses";

export interface Order {
    order_id: number | null,
    order_client_id: number | null,
    order_mentor_id: number | null,
    order_notes: string | null,
    order_status: OrderStatus,
    order_createdat: string,
}