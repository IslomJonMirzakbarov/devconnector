import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertItem {
  msg: string;
  alertType: string;
  id: any;
}

export type AlertId = any;

const initialState: any = {
  value: [],
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertItem>) => {
      state.value = [...state.value, action.payload];
    },
    removeAlert: (state, action: PayloadAction<AlertId>) => {
      state.value = state.value.filter(
        (alertItem: AlertItem) => alertItem.id !== action.payload
      );
    },
  },
});

export const { addAlert, removeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
