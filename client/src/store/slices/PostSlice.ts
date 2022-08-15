import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  value: {
    posts: [],
    post: null,
    loading: true,
    error: {},
  },
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, payload) => {
      state.value = {
        ...state.value,
        posts: [payload, ...state.value.posts],
        loading: false,
      };
    },
    postError: (state, payload) => {
      state.value = {
        ...state.value,
        error: payload,
        loading: false,
      };
    },
  },
});

export const { updatePost, postError } = PostSlice.actions;

export default PostSlice.reducer;
