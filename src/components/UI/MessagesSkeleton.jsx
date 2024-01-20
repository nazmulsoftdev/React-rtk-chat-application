import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MessagesSkeleton() {
  return (
    <div className="relative w-full p-4 h-[calc(100vh_-_197px)] borderflex flex-col-reverse overflow-y-auto scrollbar scrollbar-thumb-teal-200 scrollbar-track-gray-100 scrollbar-w-[2px]">
      <div className="space-y-5">
        <div className="flex justify-start">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="w-[30px] md:w-[100px]" />
        </div>
      </div>
    </div>
  );
}

export default MessagesSkeleton;
