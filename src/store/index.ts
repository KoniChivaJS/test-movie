import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "../services/movie-api";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
