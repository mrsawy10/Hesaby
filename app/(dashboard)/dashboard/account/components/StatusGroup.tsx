import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

export default function StatusGroup({
  status,
  onChange,
}: {
  status?: "accepted" | "pending" | "declined" | "sold" | "";
  onChange: Function;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "success";
      case "pending":
        return "warning";
      case "sold":
        return "primary";
      case "declined":
        return "danger";
      default:
        return undefined;
    }
  };

  let [selected, setSelected] = React.useState(status);
  let [color, setColor] = React.useState<"primary" | "success" | "warning" | "danger" | undefined>(
    getStatusColor(status || "")
  );

  return (
    <div className="flex w-full flex-row gap-2">
      <Tabs
        selectedKey={selected}
        className="w-full te child-w-full flex flex-col sm:flex-row flex-wrap-child-sm"
        aria-label="Dynamic tabs"
        color={color}
      >
        <Tab
          key="accepted"
          className="w-full py-5"
          title={
            <div
              onClick={() => {
                setSelected("accepted");
                onChange("accepted");
                setColor("success");
              }}
              className="flex items-center space-x-2 w-full py-1 px-10"
            >
              <ThumbUpIcon />
              <span>Accepted</span>
            </div>
          }
        />
        <Tab
          key="pending"
          className="w-full py-5"
          title={
            <div
              onClick={() => {
                setSelected("pending");
                onChange("pending");
                setColor("warning");
              }}
              className="flex items-center space-x-2"
            >
              <HourglassFullIcon />
              <span>Pending</span>
            </div>
          }
        />
        <Tab
          key="declined"
          className="w-full py-5"
          title={
            <div
              onClick={() => {
                setSelected("declined");
                onChange("declined");
                setColor("danger");
              }}
              className="flex items-center space-x-2 w-full h-full"
            >
              <ThumbDownAltIcon />
              <span>Declined</span>
            </div>
          }
        />
        <Tab
          key="sold"
          className="w-full py-5"
          title={
            <div
              onClick={() => {
                setSelected("sold");
                onChange("sold");
                setColor("primary");
              }}
              className="flex items-center space-x-2 w-full h-full"
            >
              <PriceCheckIcon />
              <span>Sold</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
