import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import messagesApi from "../featured/messages/messagesApi";

function Message({ messages = [], totalCount, conversationId }) {
  const auth = useSelector((state) => state.auth);
  const { email: loginEmail } = auth?.user || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const fetchData = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        messagesApi.endpoints.getMoreMessages.initiate({
          id: conversationId,
          page,
        })
      );
    }
  }, [conversationId, dispatch, page]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(import.meta.env.VITE_MESSAGES_LIMIT_LIST)
        ) > page;
      setHasMore(more);
    }
  }, [page, totalCount]);

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={window.innerHeight - 182}
      inverse={true}
      className="w-full  p-4
        border
         flex flex-col-reverse scrollbar scrollbar-thumb-teal-200 scrollbar-track-gray-100 scrollbar-w-[2px]"
    >
      <ul className="space-y-3">
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((item) => {
            const { id, sender, message } = item || {};
            const justify = sender?.email !== loginEmail ? "start" : "end";

            return (
              <div key={id}>
                <Messages justify={justify} message={message} />
              </div>
            );
          })}
      </ul>
    </InfiniteScroll>
  );
}

export default Message;
