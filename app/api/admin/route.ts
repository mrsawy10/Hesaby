import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/db";
//
const adminLoginSchema = yup.object().shape({
  name: yup.string().optional(),
  password: yup.string().required().min(6, "Password must be at least 6 characters"),
  email: yup.string().required().email(),
  isSuper: yup.boolean().default(false).optional(),
  phoneNumber: yup.string().min(10).optional(),
});
//
export const dynamic = "force-dynamic"; // defaults to auto

// const JWT_SECRET = process.env.JWT_SECRET;
const ROUNDS_OF_HASHING = Number(process.env.ROUNDS_OF_HASHING);

export async function GET(request: Request) {}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // adminLoginSchema.parse(data);
    await adminLoginSchema.validate(data, { abortEarly: false });

    const admin = await prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });
    if (admin) {
      throw new Error("Admin Already exist with the same email");
    }
    const hashedPassword = await bcrypt.hash(data.password, ROUNDS_OF_HASHING);
    const newAdmin = await prisma.admin.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        isSuper: data.isSuper,
        phoneNumber: data.phoneNumber,
      },
    });

    return NextResponse.json(newAdmin);
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
