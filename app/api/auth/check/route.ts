import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function POST(request: Request) {
  try {
    let email = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      //   return new NextResponse(JSON.stringify(`User with same email already exist`), {
      //     status: 500,
      //   });
      return NextResponse.json({ userExist: true });
    }
    return NextResponse.json({ userExist: false });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ userExist: true });

    // return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
