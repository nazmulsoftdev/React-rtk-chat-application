import { useState, useEffect } from "react";
import Chatitems from "./Chatitems";
import conversationApi, {
  useGetConversationsQuery,
} from "../../featured/conversation/conversationApi";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerInfo } from "../../utils/getPartnerInfo";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { AiFillMessage } from "react-icons/ai";
import { BiRefresh as RefreshIcon } from "react-icons/bi";
import ChatListSkeleton from "../UI/ChatListSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

function ChatItem() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { email: loginEmail, name: loginName } = auth.user || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError, error, refetch } =
    useGetConversationsQuery(loginEmail);

  const { data: conversations, totalCount } = data || {};

  // fetching more conversations

  const fetchMoreData = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        conversationApi.endpoints.getMoreConversations.initiate({
          email: loginEmail,
          page,
        })
      );
    }
  }, [dispatch, loginEmail, page]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(import.meta.env.VITE_CONVERSATIONS_LIMIT_LIST)
        ) > page;

      setHasMore(more);
    }
  }, [page, totalCount]);

  // decide to what to render

  let content = null;

  if (isLoading) {
    content = (
      <>
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
      </>
    );
  } else if (!isLoading && isError) {
    content = (
      <Alert color="failure" icon={HiInformationCircle}>
        <div>
          <span className="font-medium">Hey {loginName}</span>
          <br />
          <div className="flex items-center space-x-2">
            <span className="font-medium">{error.message || error?.data}</span>
            <RefreshIcon
              onClick={refetch}
              size={20}
              className="cursor-pointer"
              color="green"
            />
          </div>
        </div>
      </Alert>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = (
      <Alert color="gray" icon={AiFillMessage}>
        <span>
          <p>
            <span className="font-medium">Hey {loginName} your</span>
            <br />
            <span className="font-medium">Conversation box is empty</span>
          </p>
        </span>
      </Alert>
    );
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={conversations.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ChatListSkeleton />}
        height={window.innerHeight - 100}
        className="scrollbar scrollbar-thumb-slate-300 scrollbar-track-gray-100 scrollbar-w-[2px] border"
      >
        {conversations.map((conversations) => {
          const { id, users, message, timestamp } = conversations || {};
          const partner = getPartnerInfo(users, loginEmail);
          const { name, email: partnerEmail } = partner || {};
          return (
            <div key={id}>
              <Chatitems
                name={name}
                email={partnerEmail}
                message={message}
                timestamp={timestamp}
                id={id}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    );
  }

  return <div>{content}</div>;
}

export default ChatItem;
