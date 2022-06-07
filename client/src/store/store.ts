import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import alertReducer from "./slices/AlertSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
