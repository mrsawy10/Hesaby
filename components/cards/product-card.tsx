"use client";

import * as React from "react";
import Image from "next/image";

// import { Image } from "@nextui-org/react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons/chad";
import { PlaceholderImage } from "@/components/placeholder-image";
import useScreenWidth from "@/hooks/useScreenWidth";
import truncateText from "@/lib/tranculateText";
import CartIcon from "../icons/cart";
import WishListIcon from "../icons/whishList";
import Button from "../main-button";
import clsx from "clsx";
import useAuthStore from "@/store/authStore";

//    Pick<Product, "id" | "name" | "price" | "images" | "inventory">
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: any;
  btnTxt: string;
  variant?: "default" | "switchable";
  btnUrlPrefix: string;
  type: string;
  cartClassName?: string;
  cartSelectedClassName?: string;
  smallAspects?: string;
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  btnTxt,
  btnUrlPrefix = ``,
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  cartClassName,
  cartSelectedClassName,
  className,
  smallAspects,
  type,
  ...props
}: ProductCardProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  let { user, isLogged } = useAuthStore();

  // console.log(`product-card =->`, { user, isLogged });
  // let screenWidth = useScreenWidth();
  return (
    <Card
      className={cn("size-full overflow-hidden rounded-md h-full product-dard ", className)}
      {...props}
    >
      {/* <Link aria-label={product.title} href={`/product/${product.id}`}> */}
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3} className="relative">
          {product?.imgUrl ? (
            <Image
              src={product?.imgUrl ?? "/images/product-placeholder.webp"}
              alt={product.title}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              priority
              // loading="lazy"
            />
          ) : (
            <PlaceholderImage className="rounded-none" asChild />
          )}
          {type == `account` && (
            <div className="absolute mt-2 mx-2 flex flex-col gap-2 left-0 card">
              <CartIcon
                account={product}
                className={clsx(cartClassName)}
                smallAspects={smallAspects}
              />
              {isLogged && user && (
                <WishListIcon
                  account={product}
                  className={clsx(cartClassName)}
                  smallAspects={smallAspects}
                />
              )}
            </div>
          )}
        </AspectRatio>
      </CardHeader>

      <span className="sr-only">{product.title}</span>
      <div className="flex flex-col justify-between" dir="rtl">
        <Link
          href={`${btnUrlPrefix}${product.id}${type == `game` ? `?gameName=${product.title}` : ``}`}
          tabIndex={-1}
        >
          <CardContent className="space-y-1.5 p-4">
            <CardTitle className=" line-clamp-2 text-sm sm:text-sm xl:text-xl text-start ">
              {product.title}
            </CardTitle>
            <CardDescription className=" line-clamp-2 text-tiny text-start sm:text-sm xl:text-lg dark:text-zinc-400  ">
              {product.description}
            </CardDescription>
            {product?.price && !isNaN(parseFloat(product?.price)) && (
              <CardDescription className="line-clamp-1">{product?.price}</CardDescription>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-1 ">
            <Button
              aria-label={btnTxt}
              // size="sm"
              className="h-8 w-full rounded-sm"
              disabled={isUpdatePending}
            >
              {isUpdatePending && (
                <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />
              )}
              {btnTxt}
            </Button>
          </CardFooter>
        </Link>
      </div>
    </Card>
  );
}
