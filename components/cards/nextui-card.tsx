// "use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  // Button
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Button from "@/components/main-button";
import classes from "./styles.module.css";
// import useScreenWidth from "@/hooks/useScreenWidth";
import CardHead from "./cardHead";

export default function App({
  className,
  img,
  id,
  title,
  btnTxt,
  btnUrl,
  desc,
}: {
  btnTxt: string | React.ReactNode;
  btnUrl: string;
  className?: string;
  img: string;
  id: string;
  title: string;
  desc: string | undefined;
}) {
  // let screenWidth = useScreenWidth();
  return (
    <Card
      isFooterBlurred
      className={cn(
        "col-span-12 sm:col-span-5 cursor-pointer",
        className,
        classes["form-container"]

        //  `w-[320px] md:w-[450px] h-[300px] md:h-[500px] `
      )}
    >
      <CardHead title={title} desc={desc} />

      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={img}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-end py-1 sm:py-3">
        {/* <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div> */}
        <Link href={btnUrl} className={`max-[500px]:m-auto`}>
          <Button className="text-[0.6rem]  px-2 sm:px-5  md:text-lg 2xl:text-lg ">
            {btnTxt}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
