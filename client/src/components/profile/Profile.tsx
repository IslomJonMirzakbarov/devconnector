import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import useProfileApi from "../../hooks/useProfileApi";
import Spinner from "../layout/Spinner";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAppSelector((store: any) => store.auth.value);
  console.log(user);
  const { profile, profileLoading } = useProfileApi({ isProfile: true, id });

  if (!profile || profileLoading) return <Spinner />;

  return (
    <div>
      <Link to="/profiles">Back to profiles</Link>
      <div>
        {user && user._id === id && <Link to="/edit-profile">Edit</Link>}
      </div>
    </div>
  );
};

export default Profile;
