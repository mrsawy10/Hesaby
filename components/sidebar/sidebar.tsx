"use client";

import React from "react";
import GavelIcon from "@mui/icons-material/Gavel";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import GamepadIcon from "@mui/icons-material/Gamepad";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
//
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import QuizIcon from "@mui/icons-material/Quiz";
import Logo from "@/components/Logo";
import { DarkModeSwitch } from "../navbar/darkmodeswitch";

//
export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[41] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === "/"} href="/" />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname.includes("/dashboard/user")}
                title="users"
                href="/dashboard/user"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname.includes("/dashboard/platform")}
                title="Platforms"
                href="/dashboard/platform"
                // icon={<GamepadIcon className="text-gray-400" />}

                icon={<VideogameAssetIcon className="text-gray-400" />}
              />
              <SidebarItem
                isActive={pathname.includes("/dashboard/game")}
                title="Games"
                href="/dashboard/game"
                icon={<GamepadIcon className="text-gray-400" />}
              />
              <SidebarItem
                isActive={pathname.includes("/dashboard/account")}
                title="Accounts"
                href="/dashboard/account"
                icon={<SportsEsportsIcon className="text-gray-400" />}
              />
            </SidebarMenu>
            <SidebarMenu title="Post Types">
              <SidebarItem
                isActive={pathname.includes("/dashboard/faq")}
                title="FAQ"
                href="/dashboard/faq"
                icon={<QuizIcon className="text-gray-400" />}
              />
              <SidebarItem
                isActive={pathname.includes("/dashboard/slides")}
                title="Slides"
                href="/dashboard/slides"
                icon={<BurstModeIcon className="text-gray-400" />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <CollapseItems
                // isActive={true}
                className={
                  pathname.includes(`/dashboard/site-data`) &&
                  !pathname.includes(`/site-data/general`)
                    ? `bg-blue-500/15`
                    : ``
                }
                icon={<ViewIcon />}
                items={[
                  { text: "Home Page", href: `/dashboard/site-data/home-page` },
                  { text: "About Page", href: `/dashboard/site-data/about-page` },
                  { text: "Contact Page", href: "/dashboard/site-data/contact-page" },
                ]}
                title="Site Data"
              />

              {/* <SidebarItem isActive={pathname === "/view"} title="Site Data" icon={<ViewIcon />} /> */}
              <SidebarItem
                isActive={pathname.includes(`/dashboard/site-data/general`)}
                title="Settings"
                href="/dashboard/site-data/general"
                icon={<SettingsIcon />}
              />
              <SidebarItem
                isActive={pathname.includes(`/dashboard/terms-and-conditions`)}
                title="Terms And Conditions"
                href="/dashboard/terms-and-conditions"
                titleClassName="text-sm"
                icon={<GavelIcon className="text-gray-400" />}
              />

              {/* GavelIcon */}
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            {/* <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip> */}
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <DarkModeSwitch />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Logo width={50} />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
