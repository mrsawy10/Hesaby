import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Section,
    Text,
  } from "@react-email/components";
  import { Tailwind } from "@react-email/components";
  import * as React from "react";
  
  interface Props {
    userEmail: string;
    subject: string;
    message: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL
    ? process.env.BASE_URL
    : `http://localhost:3000/`;
  
  export const ContactUsEmail = ({
    userEmail,
    subject,
    message,
  }: Props) => (
    <Html>
      <Head />
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Heading style={heading}>New Contact Us Message</Heading>
            <Section>
              <Text style={label}>From:</Text>
              <Text style={value}>{userEmail}</Text>
            </Section>
            <Section>
              <Text style={label}>Subject:</Text>
              <Text style={value}>{subject}</Text>
            </Section>
            <Section>
              <Text style={label}>Message:</Text>
              <Text style={messageStyle}>{message}</Text>
            </Section>
            <Text style={paragraph}>
              Please respond to this inquiry as soon as possible. If you need to follow up, you can contact the user directly at{" "}
              <Link href={`mailto:${userEmail}`} style={link}>
                {userEmail}
              </Link>.
            </Text>
          </Container>
          <Text style={footer}>Powered by Hesaby</Text>
        </Body>
      </Tailwind>
    </Html>
  );
  
  export default ContactUsEmail;
  
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
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  };
  
  const heading = {
    color: "#0a85ea",
    fontSize: "18px",
    fontWeight: 700,
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center" as const,
    marginBottom: "20px",
  };
  
  const label = {
    color: "#000",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    marginBottom: "5px",
  };
  
  const value = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    marginBottom: "15px",
  };
  
  const messageStyle = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    whiteSpace: "pre-wrap" as const,
  };
  
  const paragraph = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    lineHeight: "23px",
    margin: "20px 0",
    textAlign: "center" as const,
  };
  
  const link = {
    color: "#0a85ea",
    textDecoration: "underline",
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
  