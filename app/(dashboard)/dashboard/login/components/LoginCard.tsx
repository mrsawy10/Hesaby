// import { Button } from "@/components/ui/button";
// import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { Input as LightInput } from "@/components/ui/input-light";
// import { adminLogin } from "@/actions/admin";
import { cookies } from "next/headers";
// import cookies from 'next-cookies';

import { jwtVerify } from "jose";
// import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import Card from "./Card";

// const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;
// export const dynamic = 'force-no-store'

async function LoginCard() {
  const cookieStore = cookies();
  if (cookieStore.has(`admin-token`) && cookieStore.get("admin-token")) {
    const adminToken = cookieStore.get("admin-token");
    try {
      const { payload } = await jwtVerify(
        `${adminToken?.value || ``}`,
        new TextEncoder().encode(
          process.env.JWT_SECRET_ADMIN ? process.env.JWT_SECRET_ADMIN : "pshviroessing-environ"
        )
      );
    } catch (error) {
      console.log(error);
      // return redirect(`/dashboard`);
      return <Card />;
    }
    return redirect(`/dashboard`);
  }
  return <Card />;
}
export default LoginCard;
