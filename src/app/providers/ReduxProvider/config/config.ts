import { RootStateSchema } from "./schema";
import { abonementReducer } from "entities/Abonement";
import { clientReducer } from "entities/Client";
import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "entities/Order";
import { purchaseReducer } from "entities/Purchase";
import { toastReducer } from "entities/Toast";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {
      client: clientReducer,
      toast: toastReducer,
      abonement: abonementReducer,
      purchase: purchaseReducer,
      order: orderReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
