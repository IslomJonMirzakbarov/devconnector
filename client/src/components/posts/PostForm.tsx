import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useAppDispatch } from "../../hooks/hooks";
import { addPost } from "../../store/slices/post.thunk";

const PostForm = ({ setRefetchTime }: any) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useMutation((data: any) => {
    return axios.post("/api/posts", { text: data });
  });
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ mutateAsync, formData: text }));
          setText("");
          setRefetchTime(500);
          setTimeout(() => {
            setRefetchTime(false);
          }, 600);
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
