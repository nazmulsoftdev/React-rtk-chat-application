import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ChatHeadSkeleton() {
  return (
    <div className="w-full p-3 ">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-[45px] h-[45px] border rounded-full" />
        <Skeleton width={50} />
      </div>
    </div>
  );
}

export default ChatHeadSkeleton;
