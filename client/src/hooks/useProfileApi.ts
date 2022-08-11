import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const useProfileApi = ({
  isAllProfile = false,
  id,
  isProfile = false,
}: any) => {
  const { data: profiles, isLoading } = useQuery(
    "get-all-profiles",
    async () => {
      const res = await axios.get("/api/profile");
      return res.data;
    },
    {
      enabled: !!isAllProfile,
    }
  );

  const { data: profile, isLoading: profileLoading } = useQuery(
    `get-profile-by-${id}`,
    async () => {
      const res = await axios.get(`/api/profile/user/${id}`);
      return res.data;
    },
    {
      enabled: !!isProfile,
    }
  );

  return {
    profile,
    profiles,
    isLoading,
    profileLoading,
  };
};

export default useProfileApi;
