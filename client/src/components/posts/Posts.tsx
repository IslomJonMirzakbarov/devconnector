import React, { useState } from "react";
import usePostApi from "../../hooks/usePostApi";
import Spinner from "../layout/Spinner";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const Posts = () => {
  const [refetchTime, setRefetchTime] = useState(false);
  const { posts, postsLoading } = usePostApi({
    refetchTime,
  });
  if (postsLoading) return <Spinner />;

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm setRefetchTime={setRefetchTime} />
      <div className="posts">
        {posts &&
          posts.map((post: any) => <PostItem key={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default Posts;
