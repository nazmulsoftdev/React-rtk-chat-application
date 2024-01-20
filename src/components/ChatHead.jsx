import React from "react";
import gravatar from "gravatar";
import { useSelector } from "react-redux";
import { useGetConversationSileItemQuery } from "../featured/conversation/conversationApi";
import { getPartnerInfo } from "../utils/getPartnerInfo";
import ChatHeadSkeleton from "./UI/ChatHeadSkeleton";

function ChatHead({ name, email, id }) {
  const auth = useSelector((state) => state.auth);
  const { email: loginEmail } = auth.user || {};

  const {
    data: singleConversation,
    isLoading,
    isError,
    error,
  } = useGetConversationSileItemQuery(id, {});

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <ChatHeadSkeleton />;
  } else if (!isLoading && isError) {
    content = null;
  } else if (!isLoading && !isError && singleConversation?.length > 0) {
    content = singleConversation?.map((item) => {
      const { users, id } = item || {};

      const partner = getPartnerInfo(users, loginEmail);
      const { name, email: partnerEmail } = partner || {};

      return (
        <div key={id} className="w-full p-3 border">
          <div className="flex items-center space-x-3">
            <img
              src={gravatar.url(partnerEmail)}
              alt="profile.png"
              className="w-[45px] h-[45px] border rounded-full"
            />
            <h3 className="text-sm font-semibold">{name}</h3>
          </div>
        </div>
      );
    });
  }

  return <>{content}</>;
}

export default ChatHead;
