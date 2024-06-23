"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
type Element = {
  url?: string;
  icon?: React.ReactNode;
  text: string;
};

type Props = Element[];

export default function Breadcrumb({ elements }: { elements: Props }) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        className="container text-gray-700 dark:text-gray-300 text-tiny md:text-lg"
      >
        {elements.map((element: Element, i: number) => (
          <Link
            key={i}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={element.url ? element.url : `#`}
            className="flex gap-1"
          >
            {element.icon && element.icon}
            {element?.text}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
