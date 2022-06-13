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
        user: null,
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
    loadUser: (state, action: any) => {
      state.value = {
        ...state.value,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    },
    setAuthError: (state) => {
      state.value = {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    },
    loginSuccess: (state, action: any) => {
      state.value = {
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: null,
      };
    },
    loginFail: (state) => {
      state.value = {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
  },
});

export const {
  registerSuccess,
  registerFail,
  loadUser,
  setAuthError,
  loginSuccess,
  loginFail,
} = AuthSlice.actions;

export default AuthSlice.reducer;
