"use client";

import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import Tooltip from "@/components/tooltip";
import Image from "next/image";
import Link from "next/link";
import { t } from "i18next";

export default function UserInfo({ user }: any) {
  return (
    <div className="w-full md:w-1/4 border dark:border-zinc-700 rounded-md px-4">
      <div className=" w-28 h-28 rounded-md border -translate-y-11 overflow-hidden">
        <Image
          className="w-full h-full relative object-cover "
          src={user.profileUrl}
          width={500}
          height={400}
          alt="cover image"
        />
      </div>
      <div className="flex flex-col gap-2 -translate-y-9">
        <h1 className="text-xl font-bold capitalize dark:text-zinc-100">
          {user.firstName} {user.lastName}
        </h1>
        {/* <Link href={`mailto:${user.email}`} className="dark:text-zinc-300">
          {user.email}
        </Link> */}
        <p>{user.bio}</p>
        {/*  */}
        <hr className="w-1/2 dark:border-zinc-700 m-auto my-4" />
        <p className="text-sm md:text-lg flex justify-center items-center">
          {t(`Number of done deals`)} : {user.numberOfDeals}
        </p>
        <p className="text-sm md:text-lg flex justify-center items-center">
          {t(`Total Earning`)} : {user.earnings}
        </p>
        <hr className="w-1/2 dark:border-zinc-700 m-auto my-4" />
        <div className="flex-center gap-3">
          {!user.isEmailVerified && (
            <Tooltip content="Email Verified">
              <DomainVerificationIcon />
            </Tooltip>
          )}

          {!user.isPhoneVerified && (
            <Tooltip content="phone Verified">
              <MobileFriendlyIcon />
            </Tooltip>
          )}
        </div>

        {/* Tooltip */}
        {/* MobileFriendlyIcon */}
        {/* DomainVerificationIcon */}
      </div>
    </div>
  );
}
