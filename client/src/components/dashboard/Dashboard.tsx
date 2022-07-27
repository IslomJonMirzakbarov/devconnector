import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getProfile, profileError } from "../../store/slices/ProfileSlice";
import { RootState } from "../../store/store";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";
import { deleteAccount } from "../../store/slices/profile.thunk";

const Dashboard = () => {
  const { profile, loading } = useAppSelector(
    (store: RootState) => store.profile.value
  );
  // console.log(profile);
  const { user } = useAppSelector((store: RootState) => store.auth.value);
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => {
    return axios.delete("/api/profile");
  });

  useQuery("get-profile", async () => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfile(res.data));
    } catch (err: any) {
      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  });

  if (loading && profile === null) <Spinner />;

  return profile !== null ? (
    <>
      <DashboardActions />
      <Experience experience={profile?.payload?.experience} />
      <Education education={profile?.payload?.education} />

      <div className="my-2">
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteAccount({ mutateAsync }))}
        >
          <i className="fas fa-user-minus"></i> Delete My Account
        </button>
      </div>
    </>
  ) : (
    <>
      <div>
        <p className="lead text-muted">Welcome {user && user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
