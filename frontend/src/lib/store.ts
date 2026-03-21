import { configureStore } from "@reduxjs/toolkit";
import { FinTrackApi } from "./services/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [FinTrackApi.reducerPath]: FinTrackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(FinTrackApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
