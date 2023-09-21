import React from "react";
import NotfoundImg from "../../assets/notfound.png";
function MessageError() {
  return (
    <div>
      <img src={NotfoundImg} alt="error" className="shrink-0 " />
    </div>
  );
}

export default MessageError;
