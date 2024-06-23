"use client";
import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Link from "next/link";
import React, { useOptimistic, useState } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { TableWrapper } from "@/components/table/table";
import AddNew from "@/components/dashboard/add-new";
import RenderCell from "./render-cell";
import SearchTable from "@/components/search-form";
import StatusGroup from "./StatusGroup";
import { useRouter } from "next/navigation";

//
type Props = {
  tableData?: any;
  keyword?: string;
  status?: "accepted" | "pending" | "declined" | "sold";
};
//
export const Accounts = ({ tableData, keyword, status }: Props) => {
  const [optData, addOptData] = useOptimistic(tableData, (state, newData) => [...state, newData]);

  let router = useRouter();
  const [statusState, setStatusState] = useState(status);

  const handleSearch = (formData: FormData) => {
    let { keyword } = Object.fromEntries(formData.entries());
    if (!keyword) return;
    window.location.href = `/dashboard/account/?keyword=${keyword}`;
  };

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
          <span>Accounts</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Accounts</h3>

      <SearchTable defaultValue={keyword ?? ``} search={handleSearch} />
      <hr></hr>
      <StatusGroup
        status={statusState}
        onChange={(e: any) => {
          setStatusState(e);
          window.location.href = `/dashboard/account/?status=${e}${keyword ? `&keyword=${keyword}` : ``}`;
          // router.push(`/dashboard/account/?status=${e}${keyword ? `&keyword=${keyword}` : ``}`);
        }}
      />
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          RenderCell={RenderCell}
          columns={[
            { name: "Image", uid: "image" },
            { name: "Title", uid: "Title" },
            { name: "Description", uid: "Description" },
            { name: "Platform", uid: "Platform" },
            { name: "Game", uid: "Game" },
            { name: "Status", uid: "Status" },
            { name: "Seller", uid: "Seller" },
            { name: "Is Featured", uid: "Is_Featured" },
            { name: "ACTIONS", uid: "actions" },
          ]}
          bodyData={optData}
        />
      </div>
    </div>
  );
};
