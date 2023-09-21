import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function OptionSkeleton() {
  return (
    <div className="relative mt-20 w-full">
      <Skeleton className="w-full h-[40px] " />
    </div>
  );
}

export default OptionSkeleton;
