import React from "react";
import ChatHead from "./ChatHead";
import Message from "./Message";
import Option from "./Option";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../featured/messages/messagesApi";
import MessagesSkeleton from "./UI/MessagesSkeleton";
import MessageError from "./UI/MessageError";

function ChatBody() {
  const param = useParams();
  const { id: conversationId } = param || {};

  const { data, isLoading, isError, error } =
    useGetMessagesQuery(conversationId);

  const { data: messages, totalCount } = data || {};

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <MessagesSkeleton />;
  } else if (!isLoading && isError) {
    content = <MessageError />;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead id={conversationId} />
        <Message
          messages={messages}
          totalCount={totalCount}
          conversationId={conversationId}
        />
        <Option messages={messages[0]} id={conversationId} />
      </>
    );
  }

  return <div>{content}</div>;
}

export default ChatBody;
