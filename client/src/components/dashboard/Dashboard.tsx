import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useAppDispatch } from "../../hooks/hooks";
import { getProfile, profileError } from "../../store/slices/ProfileSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useQuery("get-profile", async () => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfile(res.data));
    } catch (err: any) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
