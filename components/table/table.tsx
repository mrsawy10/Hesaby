// "use client";
import { Link, Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import React from "react";
export const TableWrapper = ({
  columns,
  RenderCell,
  bodyData,
}: {
  columns?: any[];
  RenderCell: any;
  bodyData?: any;
}) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      {Array.isArray(bodyData) && Array.isArray(columns) && columns.length > 0 && (
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {columns.map((column: any) => (
              <TableColumn key={column?.uid} align={column?.uid === "actions" ? "center" : "start"}>
                {column?.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={bodyData}>{bodyData?.map(RenderCell)}</TableBody>
        </Table>
      )}
    </div>
  );
};
