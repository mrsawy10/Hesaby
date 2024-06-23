import React from "react";
import { Tooltip, Button } from "@nextui-org/react";

export default function App({ children, content }: { content: string; children: React.ReactNode }) {
  return (
    <Tooltip color="primary" showArrow={true} content={content}>
      {children}
    </Tooltip>
  );
}
