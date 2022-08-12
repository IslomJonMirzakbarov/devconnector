import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}: any) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : "Now"}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
