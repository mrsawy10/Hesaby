import React from "react";

import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import LoginForm from "./LoginForm";

function CardComponent() {
  return (
    <Card className="py-4 w-full m-2  md:w-[400px]   ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex items-between justify-between w-full ">
          <h2 className="text-lg font-semibold">Sign in to your account .</h2>
          <DarkModeSwitch />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <LoginForm />
      </CardBody>
    </Card>
  );
}

export default CardComponent;
