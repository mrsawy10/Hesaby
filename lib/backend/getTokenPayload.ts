import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function getTokenPayload(tokenName: string) {
  const cookieStore = cookies();
  const userToken = cookieStore.get(tokenName);

  const { payload } = await jwtVerify(
    `${userToken?.value || ``}`,
    new TextEncoder().encode(process.env.JWT_SECRET as string)
  );

  return payload;
}
