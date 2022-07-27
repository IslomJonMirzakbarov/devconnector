import React from "react";
import UserExperience from "./UserExperience";

const Experience = ({ experience }: any) => {

  const experiences =
    experience &&
    experience.map((exp: any) => <UserExperience key={exp._id} exp={exp} />);

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default Experience;
