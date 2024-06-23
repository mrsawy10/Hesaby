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
export const Faq = ({ tableData }: Props) => {
  const [optData, addOptData] = useOptimistic(tableData, (state, newData) => [...state, newData]);

  const inputs = [
    { title: `Question`, name: `question`, type: `text` },
    { title: `Answer`, name: `answer`, type: `text` },
    // { title: `Game Image`, name: `gameImg`, type: `file`, multiple: false },
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
          <span>FAQ</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All FAQ</h3>
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
          <AddNew tableName={`faq`} inputs={inputs} label="Add New Faq" />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          RenderCell={RenderCell}
          columns={[
            // { name: "Image", uid: "image" },

            { name: `question`, uid: `question` },
            { name: `answer`, uid: `answer` },
            { name: "ACTIONS", uid: "actions" },

          ]}
          bodyData={optData}
        />
      </div>
    </div>
  );
};
