// "use client"

import * as React from "react";
import Card1 from "@/components/cards/nextui-card";
import Carde3d from "@/components/cards/3d-card";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import sliderContent from "@/constants/slidersContent";
import SliderButton from "@/components/slider/SliderButton";

// import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import classes from "@/components/cards/styles.module.css";
// "./styles.module.css"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function SliderAdSection() {
  //     {
  //     data,
  //   label,
  //   enableDecs,
  //   btnTxt,
  //   btnTextPrice,
  //   btnUrlPrefix,
  // }: {
  //     data: any[];
  //   btnTxt: string | React.ReactNode;
  //   btnTextPrice: boolean;
  //   label: string;
  //   enableDecs: boolean;
  //   btnUrlPrefix: string;
  // }
  // console.log(`enableDecs CarouselSize index`, enableDecs);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      //   style={{ maxWidth: `100%` }}
      className=" sm:w-[89vw] lg:my-24 mx-auto max-[500px]:bg-black container w-[70vw]"
      //   <div
      //   >
      //   className="flex gap-4 px-16 lg:px-32 xl:36 2xl:px-40 py-3 flex-wrap w-full  "
    >
      {/* <label className="text-center  font-bold lg:text-[3rem] py-8 flex justify-start">
        {label}
      </label> */}

      <CarouselContent className=" lg:gap-0 xl:gap-1 justify-start  w-full ">
        {sliderContent.map((e, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
            {/* <div className="p-1">
              <div
                // key={e.id}
                // data-src={e.background}
                style={{ background: `url(${e.background})` }}
                className="w-full h-full md:ps-32 md:pe-32  text-end flex justify-end  pt-12 md:pt-0"
              >
                <div className=" text-center m-1 w-1/3 flex flex-col gap-4 justify-center items-center  ">
                  <Image
                    // width={500}
                    // height={500}
                    fill
                    className="w-32 lg:w-full   relative z-50 "
                    src={e.titleAsImage ? e.titleAsImage : ``}
                    alt="game banner"
                  />
                  <div className=" w-32 lg:w-full   pl-16 pr-16 m-auto ">
                    <SliderButton price={e.price} url={e.url} />
                  </div>
                </div>
              </div>
            </div> */}

            {/* lg:w-[20rem] xl:w-[24rem]  */}
            {/* <Carde3d /> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
