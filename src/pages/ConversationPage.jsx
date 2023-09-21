import React from "react";
import BlankInbox from "../components/BlankInbox";
import Sidebar from "../components/chatbox/Sidebar";
import NavBar from "../components/NavBar";

function ConversationPage() {
  return (
    <>
      <NavBar />
      <div className=" w-[90%] m-auto grid grid-cols-3">
        <div className="col-span-1 w-full  ">
          <Sidebar />
        </div>
        <div className="col-span-2 hidden md:flex md:justify-center md:items-center ">
          <BlankInbox />
        </div>
      </div>
    </>
  );
}

export default ConversationPage;
