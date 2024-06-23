import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import getTokenPayload from "@/lib/backend/getTokenPayload";

export async function GET(request: Request) {}

//
export async function PUT(request: Request) {
  try {
    let payload = await getTokenPayload("hesaby-user-token");
    //
    const { account_id } = await request.json();
    //
    const res = await prisma.cart.upsert({
      where: {
        Unique_Account_User: {
          user_id: payload.id as string,
          account_id,
        },
      },
      update: {},
      create: {
        account_id,
        user_id: payload.id as string,
      },
    });

    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof yup.ValidationError) {
      const yupErrors = error.errors;
      return new NextResponse(JSON.stringify({ errors: yupErrors }), { status: 500 });
    } else {
      return new NextResponse(JSON.stringify({ errors: [error.message] }), { status: 500 });
    }
  }
}

// ______________________________________________________________________________________________________________________

export async function POST(request: Request) {
  try {
    let payload = await getTokenPayload("hesaby-user-token");
    const account_id_arr = await request.json();

    const createRes = await prisma.cart.createMany({
      data: account_id_arr.map((id: string) => ({
        user_id: payload.id as string,
        account_id: id,
      })),
    });

    return new NextResponse(JSON.stringify(1), { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof yup.ValidationError) {
      const yupErrors = error.errors;
      return new NextResponse(JSON.stringify({ errors: yupErrors }), { status: 500 });
    } else {
      return new NextResponse(JSON.stringify({ errors: [error.message] }), { status: 500 });
    }
  }
}

// _________________________________________________________
export async function DELETE(request: Request) {
  try {
    let payload = await getTokenPayload("hesaby-user-token");
    const { account_id } = await request.json();
    const res = await prisma.cart.deleteMany({
      where: {
        user_id: payload.id as string,
        account_id,
      },
    });
    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof yup.ValidationError) {
      const yupErrors = error.errors;
      return new NextResponse(JSON.stringify({ errors: yupErrors }), { status: 500 });
    } else {
      return new NextResponse(JSON.stringify({ errors: [error.message] }), { status: 500 });
    }
  }
}
