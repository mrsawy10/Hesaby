"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { usePathname } from "next/navigation";

import { DarkModeSwitch } from "./darkmodeswitch";
// import Logo from "@/components/ogo";

// import Logo, { logoSrc, logoSrcDark } from "@/components/Logo";
//
import { useTheme as useNextTheme } from "next-themes";

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import useGeneralStore from "@/store/generalStore";

export const UserDropdown = () => {
  // const cookieStore = cookies();

  let { getSingleValue } = useGeneralStore();

  const router = useRouter();
  const adminLogOut = () => {
    let adminToken = getCookie(`admin-token`)?.toString();
    if (typeof adminToken == `undefined`) {
      deleteCookie(`admin-token`);
    }
    if (typeof adminToken == `string`) {
      deleteCookie(`admin-token`);
    }
    router.replace("/dashboard/login");
    // return;
  };
  // let adminToken = getCookie(`admin-token`)?.toString();

  const pathname = usePathname();
  const { theme } = useNextTheme();

  const sideNav =
    !pathname.includes(`login`) &&
    !pathname.includes(`signUp`) &&
    !pathname.includes(`sighup`) &&
    !pathname.includes(`auth`);

  if (!sideNav) {
    return <></>;
  }
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            className="rounded-sm"
            as="button"
            size="lg"
            src={getSingleValue(`general_logo_img`)}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="profile" className="flex flex-col justify-start w-full items-start">
          <p>Signed in as</p>
          <p>zoey@example.com</p>
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
        {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem onClick={adminLogOut} key="logout" color="danger" className="text-danger ">
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
