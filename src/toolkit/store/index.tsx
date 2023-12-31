import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

export type AppState = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: reducers(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
