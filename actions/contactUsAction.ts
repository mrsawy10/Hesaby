"use server";
import { Resend } from "resend";
import prisma from "@/prisma/db";
import ContactUsEmail from "@/email-templates/contact-us";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const RESEND_API_KEY: string = process.env.RESEND_API_KEY as string;
const ROUNDS_OF_HASHING = Number(process.env.ROUNDS_OF_HASHING);
const resend = new Resend(RESEND_API_KEY);

interface Props {
  userEmail: string;
  subject: string;
  message: string;
}

export default async function contactUsAction({ userEmail, subject, message }: Props) {
  try {
    let adminEmail = (
      await prisma.siteData.findUnique({
        where: {
          identifier: process.env.ADMIN_EMAIL_IDENTIFIER,
        },
      })
    )?.value;
    if (!adminEmail) return false;
    resend.emails.send({
      from: "New Message From Hesaby <onboarding@resend.dev>",
      to: adminEmail,
      subject: "New Message ",
      react: ContactUsEmail({ userEmail, subject, message }),
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
