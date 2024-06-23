"use client";
import { TableCell, TableRow } from "@nextui-org/react";
import Button from "@/components/main-button";

import Link from "next/link";
import React, { useState } from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { TableWrapper } from "@/components/table/table";
import AddNew from "@/components/dashboard/add-new";
import RenderCell from "./render-cell";
import { User } from "@prisma/client";
import { Input } from "@/components/ui/input-light";
import { useRouter } from "next/navigation";
import SearchTable from "@/components/search-form";
//
type Props = {
  tableData: User[];
  keyword?: string;
};
//
export const Users = ({ tableData, keyword }: Props) => {
  const router = useRouter();
  const handleSearch = (formData: FormData) => {
    let { keyword } = Object.fromEntries(formData.entries());
    if (!keyword) return;
    window.location.href = `/dashboard/user/?keyword=${keyword}`;
  };

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div>
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

        <h3 className="text-xl font-semibold">All Users</h3>
      </div>
      <SearchTable defaultValue={keyword} search={handleSearch} />
      <div className="max-w-[95rem] mx-auto w-full">
        {tableData.length < 1 ? (
          <div className="flex m-auto w-full text-center">~ No Data Found ~</div>
        ) : (
          <TableWrapper
            RenderCell={RenderCell}
            columns={[
              { name: "Image", uid: "image" },
              { name: "Name", uid: "Name" },
              { name: "Email", uid: "Email" },
              { name: "Phone", uid: "Phone" },
              { name: "Balance", uid: "Balance" },
              { name: "Actions", uid: "Actions" },
            ]}
            bodyData={tableData}
          />
        )}
      </div>
    </div>
  );
};
