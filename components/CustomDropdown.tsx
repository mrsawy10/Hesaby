"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "@/components/icons/acme-icon";
import { AcmeLogo } from "@/components/icons/acmelogo";
import { BottomIcon } from "@/components/icons/sidebar/bottom-icon";

interface item {
  title: string;
  description: string;
  logo: React.ReactNode;
}

export default function CustomDropdown({ items }: { items: item[] }) {
  const [selected, setSelected] = useState<item>({
    title: items[0]?.title,
    description: items[0]?.description,
    logo: items[0]?.logo,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {items[0].logo}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              {items[0].title}
            </h3>
            <span className="text-xs font-medium text-default-700">{items[0].description}</span>
          </div>
          <BottomIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          console.log(e);
          //   if (e === "1") {
          //     setSelected({
          //       name: "Hesaby",
          //       location: "Saudi Arabia",
          //       logo: <AcmeIcon width={100} />,
          //     });
          //   }
        }}
        aria-label="Avatar Actions"
      >
        <DropdownSection title="Dropdown">
          {/* {items.map((item, i) => (
            <DropdownItem
              key={i}
              startContent={item.logo}
              description={item.description}
              classNames={{
                base: "py-4",
                title: "text-base font-semibold",
              }}
            >
              {item.title}
            </DropdownItem>
          ))} */}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
