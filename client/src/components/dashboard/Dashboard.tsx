import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getProfile, profileError } from "../../store/slices/ProfileSlice";
import { RootState } from "../../store/store";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

const Dashboard = () => {
  const { profile, loading } = useAppSelector(
    (store: RootState) => store.profile.value
  );
  // console.log(profile);
  const { user } = useAppSelector((store: RootState) => store.auth.value);
  const dispatch = useAppDispatch();

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
