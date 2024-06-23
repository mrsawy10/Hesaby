import React from "react";
import type { Metadata } from "next";


export const dynamic = "force-dynamic";
export const revalidate = 20;



export const metadata: Metadata = {
    title: "Hesaby",
    description: "Hesaby Site Data",
  };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
