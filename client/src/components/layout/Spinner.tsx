import React from "react";

const src = require('../../img/spinner.gif');

const Spinner = () => {
  return (
    <>
      <img
        src={src}
        alt="spinner"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </>
  );
};

export default Spinner;
