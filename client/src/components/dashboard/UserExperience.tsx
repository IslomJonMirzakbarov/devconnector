import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Moment from "react-moment";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteExperience } from "../../store/slices/profile.thunk";

const UserExperience = ({ exp }: any) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useMutation(() => {
    return axios.delete(`/api/profile/experience/:${exp._id}`);
  });
  return (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            dispatch(deleteExperience({ mutateAsync, id: exp._id }))
          }
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserExperience;
