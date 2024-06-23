"use client";

import Gallery from "./Gallery";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

import Button from "@/components/main-button";
import AddToCartIcon from "@/components/icons/AddToCartIcon";
import Link from "next/link";

export default function SingleAccount({
  gallery,
  account,
  gameImgUrl,
  platformImgUrl,
  sellerImg,
}: any) {
  console.log({ gallery });
  return (
    // <div className="mt-32">
    <div className="container flex justify-center text-center  mt-12 capitalize">
      <div className="w-full md:w-8/12  ">
        <div className="border rounded-xl p-4 dark:border-gray-800 lg:px-10">
          <div className="header">
            <h1 className=" text-2xl text-black dark:text-gray-50  mt-10 mb-6">{account?.title}</h1>
          </div>
          <div className="desc  text-base  text-gray-900 dark:text-gray-300">
            {account?.description}
          </div>
          <Gallery images={gallery} className="my-16" />

          <Divider className="mt-4 mb-6" />

          <div className="flex h-5 items-center space-x-4 text-small justify-center " dir="ltr">
            <div className="flex flex-col gap-1">
              <div>البائع</div>
              <Link href={`/profile/${account?.seller?.id}`}>
                <div className="flex gap-1  justify-center items-center">
                  <Avatar
                    src={sellerImg}
                    alt={account?.seller?.firstName + account?.seller?.lastName}
                  />
                  <div>
                    {account?.seller?.firstName} {account?.seller?.lastName}
                  </div>
                </div>
              </Link>
            </div>
            <Divider orientation="vertical" />
            <div className="flex flex-col gap-1">
              <div>اللعبة</div>
              <Link href={`/games/${account?.game?.id}?gameName=${account.game.title}`}>
                <div className="flex gap-1  justify-center items-center">
                  <Avatar src={gameImgUrl} alt={account.game.title} name={account.game.title} />
                  <div>{account?.game?.title}</div>
                </div>
              </Link>
            </div>
            <Divider orientation="vertical" />

            <div className="flex flex-col gap-1">
              <div>المنصة</div>
              <div className="flex gap-1  justify-center items-center">
                <Avatar src={platformImgUrl} alt="platform  image" name={account.platform.title} />
                <div>{account?.platform.title}</div>
              </div>{" "}
            </div>
          </div>
          <Divider className="mt-8 mb-6" />

          {account?.status == `accepted` && (
            <div dir={`ltr`}>
              <Button className="m-auto py-2 px-4 mb-3">
                <div className="flex  gap-4  ">
                  <div className="flex gap-1 md:gap-2 ">
                    <span>ر.س</span>
                    <p>{account.price}</p>
                  </div>
                  <div>
                    <AddToCartIcon className="text-md lg:text-2xl" />
                  </div>
                </div>
              </Button>
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
    // </div>
  );
}
