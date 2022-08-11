import React from "react";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import useProfileApi from "../../hooks/useProfileApi";

const Profiles = () => {
  const { profiles, isLoading } = useProfileApi({ isAllProfile: true });

  let profileItems;

  if (!profiles || isLoading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map((profile: any) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No profiles found...</h4>;
    }
  }

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
