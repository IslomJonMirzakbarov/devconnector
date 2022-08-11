import { addAlert, removeAlert } from "./AlertSlice";
import { v4 as uuid } from "uuid";
import {
  clearProfile,
  getAllProfiles,
  getProfile,
  getProfileById,
  getRepos,
  profileError,
  updateProfile,
} from "./ProfileSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { accountDeleted } from "./AuthSlice";
import { useQuery } from "react-query";

export const createProfile = createAsyncThunk(
  "create/new-profile",
  async (data: any, { dispatch }) => {
    try {
      const id: string = uuid();
      const res = await data.mutateAsynch(data.formData);
      dispatch(getProfile(res));
      dispatch(
        addAlert(
          data.edit
            ? { msg: "updated", alertType: "success", id }
            : { msg: "created", alertType: "success", id }
        )
      );
      setTimeout(() => dispatch(removeAlert(id)), 2000);

      if (!data.edit) {
        data.navigate("/dashboard");
      }
    } catch (err: any) {
      const id: string = uuid();
      // console.error(err.response.data.errors);
      err.response.data.errors.forEach((error: any) => {
        dispatch(addAlert({ msg: error.msg, alertType: "danger", id }));
        setTimeout(() => dispatch(removeAlert(id)), 2000);
      });

      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  }
);

export const addExperience = createAsyncThunk(
  "add/new-experience-newest",
  async (data: any, { dispatch }) => {
    try {
      const id: string = uuid();
      const res = await data.mutateAsync(data.formData);
      dispatch(updateProfile(res));
      dispatch(addAlert({ msg: "experience added", alertType: "success", id }));
      setTimeout(() => dispatch(removeAlert(id)), 2000);

      data.navigate("/dashboard");
    } catch (err: any) {
      const id: string = uuid();
      console.error(err.response.data.errors);
      err.response.data.errors.forEach((error: any) => {
        dispatch(addAlert({ msg: error.msg, alertType: "danger", id }));
        setTimeout(() => dispatch(removeAlert(id)), 2000);
      });

      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  }
);

export const addEducation = (data: any) => async (dispatch: any) => {
  try {
    const id: string = uuid();
    const res = await data.mutateAsync(data.formData);
    dispatch(updateProfile(res));
    dispatch(addAlert({ msg: "education added", alertType: "success", id }));
    setTimeout(() => dispatch(removeAlert(id)), 2000);

    data.navigate("/dashboard");
  } catch (err: any) {
    const id: string = uuid();
    console.error(err.response.data.errors);
    err.response.data.errors.forEach((error: any) => {
      dispatch(addAlert({ msg: error.msg, alertType: "danger", id }));
      setTimeout(() => dispatch(removeAlert(id)), 2000);
    });

    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

export const deleteExperience = (data: any) => async (dispatch: any) => {
  try {
    const idx: string = uuid();
    const res = await data.mutateAsync(data.id);
    dispatch(updateProfile(res));
    dispatch(
      addAlert({ msg: "experience removed", alertType: "success", id: idx })
    );
    setTimeout(() => dispatch(removeAlert(idx)), 2000);
  } catch (err: any) {
    console.error(err);
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

export const deleteEducation = (data: any) => async (dispatch: any) => {
  try {
    const idx: string = uuid();
    const res = await data.mutateAsync(data.id);
    dispatch(updateProfile(res));
    dispatch(
      addAlert({ msg: "education removed", alertType: "success", id: idx })
    );
    setTimeout(() => dispatch(removeAlert(idx)), 2000);
  } catch (err: any) {
    console.error(err);
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

export const deleteAccount = (data: any) => async (dispatch: any) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const idx: string = uuid();
      await data.mutateAsync();
      dispatch(clearProfile());
      dispatch(accountDeleted());
      dispatch(
        addAlert({ msg: "account deleted", alertType: "success", id: idx })
      );
      setTimeout(() => dispatch(removeAlert(idx)), 2000);
    } catch (err: any) {
      console.error(err);
      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  }
};

export const getProfiles = () => async (dispatch: any) => {
  dispatch(clearProfile());
  const { data } = useQuery("get-profiles", async () => {
    const { data } = await axios.get("/api/profile");
    return data;
  });
  try {
    const idx: string = uuid();
    await dispatch(getAllProfiles(data));
    dispatch(
      addAlert({ msg: "got all profiles", alertType: "success", id: idx })
    );
    setTimeout(() => dispatch(removeAlert(idx)), 2000);
  } catch (err: any) {
    console.error(err);
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

export const getProfileByUserId = (userId: any) => async (dispatch: any) => {
  const { data } = useQuery("get-profile-by-userId", async () => {
    const { data } = await axios.get(`/api/profile/user/${userId}`);
    return data;
  });
  try {
    const idx: string = uuid();
    await dispatch(getProfileById(data));
    dispatch(
      addAlert({ msg: "got profile by id", alertType: "success", id: idx })
    );
    setTimeout(() => dispatch(removeAlert(idx)), 2000);
  } catch (err: any) {
    console.error(err);
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

export const getGithubRepos = (username: any) => async (dispatch: any) => {
  const { data } = useQuery("get-profile-github-repos", async () => {
    const { data } = await axios.get(`/api/profile/github/${username}`);
    return data;
  });
  try {
    const idx: string = uuid();
    await dispatch(getRepos(data));
    dispatch(
      addAlert({ msg: "got profile repos", alertType: "success", id: idx })
    );
    setTimeout(() => dispatch(removeAlert(idx)), 2000);
  } catch (err: any) {
    console.error(err);
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};
