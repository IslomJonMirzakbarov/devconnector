import React from "react";
import UserEducation from "./UserEducation";

const Education = ({ education }: any) => {
  const educations =
    education &&
    education.map((edu: any) => <UserEducation key={edu._id} edu={edu} />);

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
