"use client";

import {
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Image,
  // Button
} from "@nextui-org/react";
import useScreenWidth from "@/hooks/useScreenWidth";
import truncateText from "@/lib/tranculateText";

export default function CardHead({ title, desc }: any) {
  let screenWidth = useScreenWidth();

  return (
    <CardHeader className="absolute z-10 top-1 flex-col items-start p-1 pt-0 xl:p-3 ">
      <p className="text-[7px] sm:text-sm text-white/60 uppercase font-black mb-1">Featured</p>
      <div className="flex flex-col gap-1 sm:gap-3 w-full" style={{ maxWidth: `100%` }}>
        <h4 className=" text-center text-[0.7rem] m-auto sm:text-sm xl:text-2xl text-zinc-950 text-with-shadow font-black red-box-shadow-inner sm:py-1 px-[7px] xl:px-3  rounded-sm border capitalize bg-white/20">
          {screenWidth < 600
            ? truncateText(title, 7)
            : screenWidth < 1280
            ? truncateText(title, 8)
            : truncateText(title, 10)}
        </h4>
        {desc && (
          <h4
            className="text-[0.55rem] text-start sm:text-sm xl:text-lg font-bold py-1 px-3 rounded-sm  bg-slate-950 text-white opacity-85"
            style={{ maxWidth: `100%` }}
          >
            {/* {desc} */}

            {screenWidth < 600
              ? truncateText(desc, 10)
              : screenWidth < 1280
              ? truncateText(desc, 11)
              : truncateText(desc, 15)}
            {/* {screenWidth < 500 ? truncateText(desc, 15) : truncateText(desc, 20)} */}
          </h4>
        )}
      </div>
    </CardHeader>
  );
}
{
  /* // truncate */
}
