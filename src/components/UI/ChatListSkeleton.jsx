import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ChatListSkeleton() {
  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center cursor-pointer">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-[45px] h-[45px] border rounded-full" />
          <div>
            <Skeleton width={60} height={5} />
            <Skeleton width={60} height={5} />
          </div>
        </div>
        <Skeleton width={30} height={5} />
      </div>
    </>
  );
}

export default ChatListSkeleton;
