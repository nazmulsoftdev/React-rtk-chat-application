import moment from "moment/moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
import gravatar from "gravatar";

function Chatitems({ name, email, message, timestamp, id }) {
  const param = useParams();

  return (
    <>
      <Link to={`/inbox/${id}`}>
        <div className="p-3 shadow-sm flex justify-between items-center cursor-pointer">
          <div className="flex items-center space-x-4">
            <img
              src={gravatar.url(email)}
              alt="profile.png"
              className="w-[45px] h-[45px] border rounded-full"
            />
            <div>
              <h3 className="text-sm font-semibold">{name}</h3>
              <p className="text-sm">{message}</p>
            </div>
          </div>
          <p className="hidden  lg:block md:block">
            {moment(timestamp).fromNow()}
          </p>
        </div>
      </Link>
    </>
  );
}

export default Chatitems;
