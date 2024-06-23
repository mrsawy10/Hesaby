"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { useSidebarContext } from "../layout/layout-context";
import { StyledBurgerButton } from "./navbar.styles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const pathname = usePathname();

  const sideNav =
    !pathname.includes(`login`) &&
    !pathname.includes(`signUp`) &&
    !pathname.includes(`sighup`) &&
    !pathname.includes(`auth`);

  if (!sideNav) {
    return <></>;
  }
  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
