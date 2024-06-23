"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import LoadingComponent from "@/components/is-loading";
import useGeneralStore from "@/store/generalStore";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  // const
  let generalIsLoading = useGeneralStore((s) => s.generalIsLoading);

  const sideNav =
    !pathname.includes(`login`) &&
    !pathname.includes(`signUp`) &&
    !pathname.includes(`sighup`) &&
    !pathname.includes(`auth`);

  // console.log(pathname, sideNav);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        {!sideNav && children}
        {sideNav && (
          <>
            <SidebarWrapper />
            <NavbarWrapper>{children}</NavbarWrapper>
            {/* <IsLoadingC */}
            <LoadingComponent loading={generalIsLoading} />
          </>
        )}
      </section>
    </SidebarContext.Provider>
  );
};
