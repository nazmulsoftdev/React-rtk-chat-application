import React from "react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function Error({ Message }) {
  return (
    <div>
      <Alert color="failure" icon={HiInformationCircle}>
        <span>
          <p>
            <span className="font-medium">{Message}</span>
          </p>
        </span>
      </Alert>
    </div>
  );
}

export default Error;
