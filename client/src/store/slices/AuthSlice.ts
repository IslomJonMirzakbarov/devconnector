import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PayloadItem {
  token: string;
}

const initialState: any = {
  value: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<PayloadItem>) => {
      state.value = {
        ...state.value,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    },
    registerFail: (state) => {
      state.value = {
        ...state.value,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    },
  },
});

export const { registerSuccess, registerFail } = AuthSlice.actions;

export default AuthSlice.reducer;
