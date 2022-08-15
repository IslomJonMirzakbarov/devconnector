import { addAlert } from "./AlertSlice";
import { v4 as uuid } from "uuid";
import { postError, updatePost } from "./PostSlice";

// Add post
export const addPost = (data: any) => async (dispatch: any) => {
  try {
    const idx: string = uuid();
    const res = await data.mutateAsync(data.formData);
    console.log(res);

    dispatch(updatePost(res));

    dispatch(addAlert({ msg: "post added", alertType: "success", id: idx }));
  } catch (err: any) {
    dispatch(
      postError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};
