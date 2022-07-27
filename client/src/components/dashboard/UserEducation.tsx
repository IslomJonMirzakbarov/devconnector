import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Moment from "react-moment";
import { useAppDispatch } from "../../hooks/hooks";
import {
  deleteEducation,
} from "../../store/slices/profile.thunk";

const UserEducation = ({ edu }: any) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useMutation(() => {
    return axios.delete(`/api/profile/education/:${edu._id}`);
  });
  return (
    <tr>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            dispatch(deleteEducation({ mutateAsync, id: edu._id }))
          }
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserEducation;
