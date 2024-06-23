import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/db";
//

//
export const dynamic = "force-dynamic"; // defaults to auto

// const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request: Request) {}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // adminLoginSchema.parse(data);

    const admin = await prisma.admin.findFirst({
      where: {
        email: data.email,
        id: data.id,
      },
    });
    if (!admin) {
      throw new Error("not valid");
    }
    const res = await bcrypt.compare(data.password, admin.password);
    if (!res) {
      throw new Error("token not valid");
    }
    return NextResponse.json(admin);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      const yupErrors = error.errors;
      return new NextResponse(JSON.stringify({ errors: yupErrors }), { status: 500 });
    } else {
      return new NextResponse(JSON.stringify({ errors: [error.message] }), { status: 500 });
    }
  }

  //   return NextResponse.json(`hi`);
}
