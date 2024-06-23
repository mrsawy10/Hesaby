import Image from "next/image";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
// import { type CartLineItemSchema } from "@/lib/validations/cart"
import { ScrollArea } from "@/components/ui/scroll-area";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/seperator";
import { UpdateCart } from "@/components/checkout/update-cart";
import { Icons } from "@/components/icons/chad";
import { Button } from "@/components/ui/button";

import getUrl from "@/lib/backend/getImageUrl";
import { t } from "i18next";
import { Avatar, Divider } from "@nextui-org/react";
import Link from "next/link";

import useCartStore from "@/store/cartStore";

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: any[];
  isScrollable?: boolean;
  isEditable?: boolean;
  variant?: "default" | "minimal";
}

export function CartLineItems({
  items,
  isScrollable = true,
  isEditable = true,
  variant = "default",
  className,
  ...props
}: CartLineItemsProps) {
  const Comp = isScrollable ? ScrollArea : Slot;
  let { removeFromCart } = useCartStore();
  // ____________

  // getUrl()
  // _____________

  return (
    <Comp className="h-full">
      <div
        className={cn("flex w-full flex-col gap-5", isScrollable && "pr-6", className)}
        {...props}
      >
        {items.map((item) => (
          <div key={item.id} className="space-y-3" dir="rtl">
            <div
              className={cn(
                "flex items-start justify-between gap-4",
                isEditable && "flex-col xs:flex-row"
              )}
            >
              <div className="flex items-center space-x-4">
                {variant === "default" ? (
                  <div className="relative aspect-square size-16 min-w-fit overflow-hidden rounded ml-3">
                    <a href={`/accounts/${item?.id}`}>
                      {item?.imgUrl ? (
                        <Image
                          src={item.imgUrl ?? "/images/product-placeholder.webp"}
                          alt={`${item?.title}` ?? `gaming account`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          className="absolute object-cover"
                          priority
                          quality={80}
                          // loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-secondary">
                          <Icons.placeholder
                            className="size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </a>
                  </div>
                ) : null}
                <div className="flex flex-col space-y-1 self-start ">
                  <a href={`/accounts/${item?.id}`}>
                    <span className="line-clamp-1 text-sm font-medium">{`${
                      item?.title ?? `Account`
                    }`}</span>
                  </a>

                  <span className="line-clamp-1 text-sm lg:text-md text-muted-foreground">
                    {/* {formatPrice(item.price)} ={" "} */}
                    {item.price} {t(`SR`)}
                  </span>

                  {variant === "default" ? (
                    <span className="line-clamp-2 text-xs lg:text-sm capitalize text-muted-foreground">
                      {`${item.description}`}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col font-medium">
                  {/* <Divider className="mt-4 mb-6" /> */}

                  <Divider className="mt-8 mb-6" />

                  <div
                    className="flex h-5 items-center space-x-4 text-small justify-center "
                    dir="ltr"
                  >
                    {/* <Divider orientation="vertical" /> */}
                    <div className="flex flex-col gap-1">
                      <p className="text-xs">اللعبة</p>
                      <a href={`/games/${item?.game?.id}?gameName=${item.game.title}`}>
                        <div className="flex gap-1  justify-center items-center">
                          <div>{item?.game?.title}</div>
                        </div>
                      </a>
                    </div>
                    <Divider orientation="vertical" />

                    <div className="flex flex-col gap-1">
                      <div>المنصة</div>
                      <div className="flex gap-1  justify-center items-center">
                        <div>{item?.platform.title}</div>
                      </div>{" "}
                    </div>
                  </div>

                  <Divider className="mt-8 mb-6" />
                </div>

                <Button
                  onClick={() => {
                    removeFromCart(item);
                  }}
                  variant="outline"
                  size="icon"
                  className="size-12"
                >
                  <TrashIcon className="size-8" aria-hidden="true" />
                  <span className="sr-only">Delete item</span>
                </Button>
              </div>
            </div>
            {variant === "default" ? <Separator /> : null}
          </div>
        ))}
      </div>
    </Comp>
  );
}
