"use client";
import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Link from "next/link";
import React, { useOptimistic } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { TableWrapper } from "@/components/table/table";
import AddNew from "@/components/dashboard/add-new";
import RenderCell from "./render-cell";
//
type Props = {
  tableData?: any;
};
//
export const Slides = ({ tableData }: Props) => {
  const [optData, addOptData] = useOptimistic(tableData, (state, newData) => [...state, newData]);

  const inputs = [
    { title: `Main Image`, name: `image`, type: `file`, multiple: false },
    { title: `Title Image`, name: `titleImage`, type: `file`, multiple: false },
    { title: `Button Text`, name: `btnTxt`, type: `text` },
    { title: `Button Url`, name: `btnUrl`, type: `text` },
  ];

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Dashboard</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Slides</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Slides</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        {/* <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search Platforms"
          />
        </div> */}
        <div className="flex flex-row gap-3.5 flex-wrap ml-auto">
          <AddNew tableName={`slide`} inputs={inputs} label="Add New Slide" />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          RenderCell={RenderCell}
          columns={[
            { name: "Main Image", uid: "imageMain" },
            { name: "Title Image", uid: "Title_image" },
            { name: "Button Text", uid: "Button Text" },
            { name: "Button Url", uid: "Button Url" },
            { name: "ACTIONS", uid: "actions" },
          ]}
          bodyData={optData}
        />
      </div>
    </div>
  );
};
