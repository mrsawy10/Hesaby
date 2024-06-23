import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Button,
  //   Tailwind/,
  Text,
} from "@react-email/components";

import { Tailwind } from "@react-email/components";

// Tailwind
import * as React from "react";

interface Props {
  token?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BASE_URL
  ? process.env.BASE_URL
  : `http://localhost:3000/`;

export const ResetPasswordEmail = ({ token }: Props) => (
  <Html>
    <Head />
    <Tailwind>
      <Body style={main}>
        <Container style={container}>
          <Img
            // src={`${baseUrl}/logo.png`}
            src={`${baseUrl}/logo.png`}
            width="90"
            height="88"
            alt="Hesaby logo"
            style={logo}
          />
          <Text style={tertiary}>Reset Your Password</Text>
          <Link
            className="flex justify-center items-center w-ful "
            href={`${baseUrl}/reset/${token}`}
            style={linkButton}
          >
            {/* <Butt */}
            <Text
              className="bg-red-500 py-2 px-7 m-auto hover:bg-red-900 text-white rounded-md cursor-pointer"
              //   style={paragraph}
            >
              Reset Your Password
            </Text>

            {/* <Button className="bg-red-500 py-2 px-7 m-auto hover:bg-red-900 text-white rounded-md ">
              Reset Your Password
            </Button> */}
          </Link>
          <Heading className="m-auto" style={secondary}>
            Follow the Following Link.
          </Heading>
          <Text style={paragraph}>Not expecting this email?</Text>
          <Text style={paragraph}>
            Contact{" "}
            <Link href="mailto:info@hesaby.com" style={link}>
              mailto:info@hesaby.com
            </Link>{" "}
            if you did not request this code.
          </Text>
        </Container>
        <Text style={footer}>Securely powered by Hesaby .</Text>
      </Body>
    </Tailwind>
  </Html>
);

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(20,50,70,.2)",
  marginTop: "20px",
  maxWidth: "360px",
  margin: "0 auto",
  padding: "68px 0 130px",
};

const logo = {
  margin: "0 auto",
};

const tertiary = {
  color: "#0a85ea",
  fontSize: "11px",
  fontWeight: 700,
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  height: "16px",
  letterSpacing: "0",
  lineHeight: "16px",
  margin: "16px 8px 8px 8px",
  textTransform: "uppercase" as const,
  textAlign: "center" as const,
};

const secondary = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "24px",
  marginBottom: "0",
  marginTop: "0",
  textAlign: "center" as const,
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#444",
  fontSize: "15px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  letterSpacing: "0",
  lineHeight: "23px",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};

const link = {
  color: "#444",
  textDecoration: "underline",
};

const linkButton = {
  color: "#444",
  textDecoration: "none",
};

const footer = {
  color: "#000",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0",
  lineHeight: "23px",
  margin: "0",
  marginTop: "20px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
};
