import { RootStateSchema } from "./schema";
import { clientReducer } from "entities/Client/slice";
import { configureStore } from "@reduxjs/toolkit";

export function createReduxStore(initialState?: RootStateSchema) {
  return configureStore<RootStateSchema>({
    reducer: {
      client: clientReducer
    },
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
