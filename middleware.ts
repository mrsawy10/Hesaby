import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import prisma from "@/prisma/db";

// const prisma = new PrismaClient();

// const prismaClientSingleton = () => {
//   return new PrismaClient().$extends(withAccelerate());
// };

const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;
const BASE_URL: string = process.env.BASE_URL as string;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname.includes(`/dashboard/login`)) {
      return;
    }
    if (!request.cookies.has("admin-token")) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
    let tokenCookie = request.cookies.get("admin-token");
    if (typeof tokenCookie?.value == `string`) {
      const { payload } = await jwtVerify(
        tokenCookie.value,
        new TextEncoder().encode(
          JWT_SECRET_ADMIN && `${JWT_SECRET_ADMIN}`.length > 0
            ? JWT_SECRET_ADMIN
            : "pshviroessing-environ"
        )
      );
      if (!payload) {
        return NextResponse.redirect(new URL("/dashboard/login", request.url));
      }
      let response = await fetch(`${BASE_URL}/api/admin/check-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Token invalid`);
      }
    }

    return;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
