import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for dispatching typed actions
export const useAppDispatch: () => AppDispatch = useDispatch;
