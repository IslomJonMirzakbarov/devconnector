import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  value: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
  },
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, payload) => {
      state.value = {
        ...state.value,
        profile: payload,
        loading: false,
      };
    },
    profileError: (state, payload) => {
      state.value = {
        ...state.value,
        error: payload,
        loading: false,
      };
    },
  },
});

export const { getProfile, profileError } = ProfileSlice.actions;

export default ProfileSlice.reducer;
