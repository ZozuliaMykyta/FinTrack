import { configureStore } from "@reduxjs/toolkit";
import { FinTrackApi } from "./services/api";
import authReducer from "@/lib/features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [FinTrackApi.reducerPath]: FinTrackApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(FinTrackApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
