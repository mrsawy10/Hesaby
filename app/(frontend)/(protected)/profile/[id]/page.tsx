import { cookies } from "next/headers";
// import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
// import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import prisma from "@/prisma/db";
import { jwtVerify } from "jose";
import { getSingleUrl, getCoverUrl } from "@/lib/backend/getImageUrl";
import Tooltip from "@/components/tooltip";
import getImageUrl from "@/lib/backend/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "./components/UserInfo";
import UserSittings from "./components/UserSittings";
import { applyTax } from "@/lib/utils";

export default async function Page({ params, searchParams }: any) {
  let path = searchParams?.path ?? false;

  const cookieStore = cookies();
  let id = params?.id ?? null;
  let user = await prisma.user.findUnique({
    where: { id },
    include: {
      accounts: true,
    },
  });
  if (!user) throw new Error(`User Not Found`);

  let sameUser = false;

  try {
    const userToken = cookieStore.get("hesaby-user-token");
    // console.log({ userToken });
    const { payload } = await jwtVerify(
      `${userToken?.value}` as string,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    // console.log(payload);
    if (payload.id == id) {
      sameUser = true;
    }
  } catch (error) {
    // console.log(error);
  }

  let profileUrl = await getSingleUrl({ key: user.profileImg });
  let coverUrl = await getCoverUrl({ key: user.coverImg });
  let finalUser: any = { ...user, profileUrl, coverUrl };

  finalUser.accounts = await applyTax(
    await getImageUrl({ data: user.accounts, key: "accountImg" })
  );

  return (
    <>
      <div className="w-full h-40 md:h-80 lg:h-[22rem] mt-[3.8rem] sm:mt-[3rem]">
        <Image
          className="w-full h-full relative object-cover"
          src={coverUrl}
          width={500}
          height={400}
          alt="cover image"
        />
      </div>
      {/* <div className="h-screen flex flex-col  dark:text-zinc-400 justify-start w-full  "> */}
      <div className="flex gap-10 p-2 sm:p-4 md:py-5 md:px-16  2xl:px-64 flex-wrap sm:flex-nowrap">
        <UserInfo user={finalUser} />

        <div className="w-full md:w-3/4 p-5 border dark:border-zinc-600 rounded-md">
          <UserSittings path={path} user={finalUser} sameUser={sameUser} />
        </div>
      </div>

      {/* <br /> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
