import React from "react";
import { Bars } from "react-loader-spinner";

function ApplicationLoading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Bars
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    </div>
  );
}

export default ApplicationLoading;
