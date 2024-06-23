import { NextResponse, NextRequest } from "next/server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import * as yup from "yup";

import { cookies } from "next/headers";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const ROUNDS_OF_HASHING = Number(process.env.ROUNDS_OF_HASHING);

export const POST = async (req: Request) => {
  try {
    // await waitForFourSeconds();
    let data = await req.json();
    let { email, password } = data;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("Invalid Email ");
    }

    const res = await bcrypt.compare(password, user.password);

    if (!res) {
      throw new Error(`Wrong Password`);
    }
    const token = await new SignJWT({ email: user.email, password: password })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1y")
      .sign(new TextEncoder().encode(JWT_SECRET));

    cookies().set(`token`, token);

    return NextResponse.json(user);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      return new NextResponse(JSON.stringify({ errors: [error.message] }), { status: 500 });
    } else {
      console.error("Error:", error);
      return new NextResponse(JSON.stringify({ errors: [error.message] }), { status: 500 });
    }
  }

  //   return new Response(JSON.stringify({ id: `1` }), { status: 200 });
};

export const GET = async (req: Request) => {
  return new Response(JSON.stringify({ id: `1` }), { status: 200 });
};
