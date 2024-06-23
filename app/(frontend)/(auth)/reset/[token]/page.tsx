// import { Button } from "@/components/ui/button";
// import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { Input as LightInput } from "@/components/ui/input-light";
// import { adminLogin } from "@/actions/admin";
import { cookies } from "next/headers";
// import cookies from 'next-cookies';

import { jwtVerify } from "jose";
// import prisma from "@/prisma/db";
// import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import ResetCard from "./components/ResetCard";
import WrongId from "@/components/WrongId";

// const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;
// export const dynamic = 'force-no-store'
const JWT_SECRET: string = process.env.JWT_SECRET as string;

async function Reset({ params }: any) {
  let token = params?.token ?? null;

  if (!token) {
    return <WrongId>No Token !</WrongId>;
  }
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return (
      <div className="h-screen flex justify-center items-center">
        <ResetCard payload={payload} token={token} />
      </div>
    );
  } catch (err) {
    return <WrongId>No Token !</WrongId>;
  }
}
export default Reset;
