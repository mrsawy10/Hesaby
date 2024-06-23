"use server";
import * as yup from "yup";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { jwtVerify, SignJWT } from "jose";

//
const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;

//
const adminLoginSchema = yup.object().shape({
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
});
async function adminLogin(formData: FormData) {
  try {

    const rawFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    await adminLoginSchema.validate(rawFormData, { abortEarly: false });
    const admin = await prisma.admin.findFirst({
      where: {
        email: rawFormData.email,
      },
    });
    if (!admin) {
      throw new Error("Invalid Email ");
    }

    const res = await bcrypt.compare(rawFormData.password, admin.password);

    if (!res) {
      throw new Error(`Wrong Password`);
    }
    if (res) {
      const token = await new SignJWT({ email: admin.email, password: rawFormData.password })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1y")
        .sign(new TextEncoder().encode(JWT_SECRET_ADMIN));

      // console.log(token);
      cookies().set(`admin-token`, token);
    }
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      // Handle validation errors
      console.error("Validation Error:", error.errors);
      throw new Error(error.errors[0]);
    } else {
      // Handle other errors
      console.error("Error:", error);
      throw new Error(error.message);
    }
  }
  redirect(`/dashboard`);
}
// 
export async function addNewAction() {}




















export { adminLogin };
