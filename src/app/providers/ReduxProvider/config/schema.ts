import { AbonementScheme } from "entities/Abonement";
import { ClientScheme } from "entities/Client";
import { OrderScheme } from "entities/Order";
import { PurchaseScheme } from "entities/Purchase";
import { ToastScheme } from 'entities/Toast';

export interface RootStateSchema {
    client: ClientScheme,
    toast: ToastScheme,
    purchase: PurchaseScheme,
    abonement: AbonementScheme,
    order: OrderScheme
}
