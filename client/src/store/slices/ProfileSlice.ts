import { createSlice } from "@reduxjs/toolkit";

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
    getAllProfiles: (state, payload) => {
      state.value = {
        ...state.value,
        profiles: payload,
        loading: false,
      };
    },
    getProfileById: (state, payload) => {
      state.value = {
        ...state.value,
        profile: payload,
        loading: false,
      };
    },
    getRepos: (state, payload) => {
      state.value = {
        ...state.value,
        repos: payload,
        loading: false,
      };
    },
    updateProfile: (state, payload) => {
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
        profile: null,
        repos: [],
      };
    },
    clearProfile: (state) => {
      state.value = {
        ...state.value,
        profile: null,
        repos: [],
        loading: false,
        error: {},
      };
    },
  },
});

export const {
  getProfile,
  updateProfile,
  profileError,
  clearProfile,
  getAllProfiles,
  getProfileById,
  getRepos,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
