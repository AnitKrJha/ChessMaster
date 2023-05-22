import { Providers } from "@/lib/Chakra/Providers";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";
export function Cardloading({}) {
  return (
    <div className="w-full m-auto shadow-sm shadow-gray-500 px-4 md:max-w-sm">
      <Providers>
        <Skeleton height={"30px"} my="2" />
        <SkeletonCircle size="10" />
        <Skeleton height={"25px"} my="2" />
        <Skeleton height={"25px"} my="2" />
        <Skeleton height={"25px"} my="2" />
        <Skeleton height={"25px"} my="2" />
      </Providers>
    </div>
  );
}
