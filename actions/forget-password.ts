"use server";

import { Resend } from "resend";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { jwtVerify, SignJWT } from "jose";
import { resetPasswordSchema } from "@/lib/formSchemas";
import ResetPasswordEmail from "@/email-templates/reset-password";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const RESEND_API_KEY: string = process.env.RESEND_API_KEY as string;
const ROUNDS_OF_HASHING = Number(process.env.ROUNDS_OF_HASHING);
const resend = new Resend(RESEND_API_KEY);

// export const dynamic = "force-dynamic";

const sendForgetPasswordEmail = async (email: string) => {
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const token = await new SignJWT({ email: email, id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("20minutes")
    .sign(new TextEncoder().encode(JWT_SECRET));

  resend.emails.send({
    from: "Reset Password <onboarding@resend.dev>",
    to: email,
    subject: "Reset Your Password ",
    react: ResetPasswordEmail({ token }),
  });
  return true;
};

// Reset Password

// const ROUNDS_OF_HASHING = Number(process.env.ROUNDS_OF_HASHING);
export const resetPassword = async ({ email, id, token, password, confirmPassword }: any) => {
  resetPasswordSchema.validateSync({ email, id, token, password, confirmPassword });
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

  if (email !== payload.email || id !== payload.id) throw new Error(`Invalid Token`);

  const hashedPassword = await bcrypt.hash(password, ROUNDS_OF_HASHING);
  let user = await prisma.user.update({
    where: {
      email,
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return true;
};

export default sendForgetPasswordEmail;
