import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const usePostApi = ({refetchTime}: any) => {
  const {
    data: posts,
    isLoading: postsLoading,
    refetch,
  } = useQuery(
    "get-all-posts",
    async () => {
      const res = await axios.get("/api/posts");
      return res.data;
    },
    {
      refetchInterval: refetchTime,
    }
  );

  return {
    posts,
    postsLoading,
    refetch,
  };
};

export default usePostApi;
