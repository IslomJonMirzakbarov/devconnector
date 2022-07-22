import { addAlert, removeAlert } from "./AlertSlice";
import { v4 as uuid } from "uuid";
import { getProfile, profileError, updateProfile } from "./ProfileSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
// export const addEducation = createAsyncThunk(
//   "add/education",
//   async (data: any, { dispatch }) => {
//     try {
//       const id: string = uuid();
//       const res = await data.mutateAsynch(data.formData);
//       dispatch(updateProfile(res));
//       dispatch(addAlert({ msg: "education added", alertType: "success", id }));
//       setTimeout(() => dispatch(removeAlert(id)), 2000);

//       data.navigate("/dashboard");
//     } catch (err: any) {
//       const id: string = uuid();
//       // console.error(err.response.data.errors);
//       err.response.data.errors.forEach((error: any) => {
//         dispatch(addAlert({ msg: error.msg, alertType: "danger", id }));
//         setTimeout(() => dispatch(removeAlert(id)), 2000);
//       });

//       dispatch(
//         profileError({
//           msg: err.response.data.msg,
//           status: err.response.status,
//         })
//       );
//     }
//   }
// );
