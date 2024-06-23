"use client";

// import SideBar from "./SideBar";
import Card from "@/components/cards/nextui-card";
import useTax from "@/hooks/useTax";
import { cn } from "@/lib/utils";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import clsx from "clsx";

import { ProductCard } from "../cards/product-card";

export default function Container({
  data,
  breadCrumb,
  SideBar,
  btnUrlPrefix,
  btnTextPrice,
  type,
  className,
  btnTxt,
  smallAspects,
}: {
  data: any[] | undefined;
  breadCrumb?: React.ReactNode;
  SideBar?: React.ReactNode;
  className?: string;
  btnTxt?: string;
  type: string;
  btnUrlPrefix: string;
  smallAspects: string;
  btnTextPrice: boolean;
}) {
  data = useTax(data);
  return (
    <>
      {SideBar && <>{SideBar}</>}
      <div className={"w-auto m-auto " + className}>
        {breadCrumb && <div className="p-4">{breadCrumb}</div>}
        <div
          style={{ minHeight: `70vh` }}
          className="border rounded-xl py-4 gap-x-5  md:gap-x-6 dark:border-gray-800 lg:px-3 flex flex-wrap justify-center items-start gap-y-5 w-auto m-auto md:mx-1"
        >
          {data && data.length < 1 && <div>No Data Were Found</div>}
          {data &&
            data.map((e: any, index: number) => {
              return (
                <ProductCard
                  btnUrlPrefix={btnUrlPrefix}
                  type={type}
                  key={`${index}_${e.id}`}
                  product={e}
                  btnTxt={btnTxt ?? `Add To Cart`}
                  className={cn(`basis-[45%] md:basis-[29%] xl:basis-[29%] 2xl:basis-[20%]`)}
                  smallAspects={smallAspects}
                />
              );
            })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
