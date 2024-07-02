"use client";

import React, { ReactNode, useEffect } from "react";
import Card1 from "@/components/cards/nextui-card";
import Carde3d from "@/components/cards/3d-card";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

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
import { ProductCard } from "../cards/product-card";
import clsx from "clsx";
import useTax from "@/hooks/useTax";
// import { applyTax } from "@/lib/utils";

export default function CarouselSize({
  data,
  label,
  btnTxt,
  btnTextPrice,
  btnUrlPrefix,
  type,
  cardClassName,
  carouselItemClassName,
}: {
  data?: any[];
  btnTxt?: string;
  btnTextPrice: boolean;
  label?: string | React.ReactNode;
  btnUrlPrefix: string;
  type: string;
  cardClassName?: string;
  carouselItemClassName?: string;
}) {
  let finalResult: any[] = [];
  const finalAccResult = useTax(data);
  if (type == `account`) {
    finalResult = finalAccResult;
  } else if (type == `game` && data) {
    finalResult = data;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        active: true,
      }}
      className="w-full lg:my-24"
    >
      {label && (
        <label className="text-center  font-bold lg:text-[3rem] py-8 flex justify-start">
          {label}
        </label>
      )}

      <CarouselContent className="gap-0 lg:gap-0 xl:gap-1 justify-start   " dir="ltr">
        {finalResult &&
          finalResult.map((d, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "basis-full md:basis-1/3 xl:basis-1/3 2xl:basis-1/4 ",
                `   sm:w-auto`,
                carouselItemClassName
              )}
            >
              <div className="p-1 h-full">
                <ProductCard
                  btnUrlPrefix={btnUrlPrefix}
                  type={type}
                  btnTxt={btnTxt ?? ``}
                  product={d}
                  cartClassName={clsx(
                    // `w-9  md:w-10  xl:w-11 `,
                    `p-2 h-9md:h-10   xl:h-11 border border-zinc-950 md:p-[0.55rem]`,
                    ` md:text-[2.3rem] rounded-full z-[38] transition-all duration-700 flex justify-center bg-gray-100/50 text-zinc-900`
                  )}
                  cartSelectedClassName={`bg-gray-100 text-zinc-900 border-zinc-950 bg-gray-900 text-white`}
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
