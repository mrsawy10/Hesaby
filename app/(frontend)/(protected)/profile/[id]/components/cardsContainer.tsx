import { ProductCard } from "@/components/cards/product-card";
import { Account } from "@prisma/client";
import clsx from "clsx";
import React from "react";

function CardsContainer({ data }: { data: Account[] }) {
  return (
    <div
      style={{ minHeight: `70vh` }}
      className="border rounded-xl py-4 gap-x-5  md:gap-x-6 dark:border-gray-800 lg:px-3 flex flex-wrap justify-center items-start gap-y-5 w-auto m-auto md:mx-1"
    >
      {!data || (data.length < 1 && <p>لا يوجد بيانات ~</p>)}
      {data &&
        data.map((e: any, index: number) => {
          return (
            <ProductCard
              btnUrlPrefix={`/accounts/`}
              type={`account`}
              key={`${index}_${e.id}`}
              product={e}
              btnTxt={`Add To Cart`}
              className={clsx(`basis-[80%] md:basis-[50%] xl:basis-[30%] 2xl:basis-[30%]`)}
              // cartClassName={clsx(
              //   `p-2  md:h-10  xl:w-11  xl:h-11 border border-zinc-950 md:p-[0.55rem] md:text-[2.3rem] rounded-full z-[38] transition-all duration-700 flex justify-center bg-gray-100/50 text-zinc-900`
              // )}
              // cartSelectedClassName={`bg-gray-100 text-zinc-900 border-zinc-950 bg-gray-900 text-white`}
            />
          );
        })}
    </div>
  );
}

export default CardsContainer;
