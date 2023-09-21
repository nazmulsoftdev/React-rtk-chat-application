import React from "react";
import ChatBody from "../components/ChatBody";
import Sidebar from "../components/chatbox/Sidebar";
import NavBar from "../components/NavBar";

function InboxPage() {
  return (
    <>
      <NavBar />
      <div className="w-[90%] m-auto grid grid-cols-3">
        <div className="col-span-1 w-full h-[calc(100vh_-_70px)]">
          <Sidebar />
        </div>
        <div className="col-span-2 ">
          <ChatBody />
        </div>
      </div>
    </>
  );
}

export default InboxPage;
