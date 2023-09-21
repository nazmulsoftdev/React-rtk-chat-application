import React, { useEffect, useState } from "react";
import { AiOutlineSend as SendIcon } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEditConversationMutation } from "../featured/conversation/conversationApi";

function Option({ messages = [], id }) {
  const [message, setMessage] = useState("");
  const auth = useSelector((state) => state.auth);

  const { email: myEmail } = auth?.user || {};

  const [editConversation, { isSuccess }] = useEditConversationMutation(id, {});

  useEffect(() => {
    if (isSuccess) {
      setMessage("");
    }
  }, [isSuccess]);

  const info =
    messages.receiver.email === myEmail ? messages?.sender : messages?.receiver;

  // form submitHandler

  const formSubmitHandler = (e) => {
    e.preventDefault();
    editConversation({
      id: messages?.conversationId,
      sender: myEmail,
      data: {
        participants: `${myEmail}-${info.email}`,
        users: [
          { name: auth.user.name, email: auth.user.email },
          { name: info?.name, email: info?.email },
        ],
        message,
        timestamp: new Date().getTime(),
      },
    });
  };

  return (
    <form onSubmit={formSubmitHandler} className="relative w-full">
      <input
        type="text"
        className="w-full border border-gray-200 focus:ring-transparent"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      {/* Send Button */}
      <button>
        <SendIcon
          type="submit"
          className="cursor-pointer absolute right-2 top-[10px]"
          size={25}
        />
      </button>
    </form>
  );
}

export default Option;
