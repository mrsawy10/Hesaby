"use client";

import LoadingComponent from "@/components/is-loading";

export default function Loading() {
  return (
    <LoadingComponent loading={true}>
      <div className="w-full h-screen flex fl"></div>
    </LoadingComponent>
  );
}
