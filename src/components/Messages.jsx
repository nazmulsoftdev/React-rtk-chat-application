import React from "react";

function Messages({ justify, message }) {
  return (
    <li className={`flex justify-${justify}`}>
      <div
        className={`relative max-w-xl px-4 py-2 rounded shadow ${
          justify === "start" ? "bg-slate-900" : "bg-green-300"
        }`}
      >
        <p className="block text-white">{message}</p>
      </div>
    </li>
  );
}

export default Messages;
