"use client";

import Link from "next/link";

// import { getCart } from "@/lib/actions/cart"
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartLineItems } from "@/components/checkout/cart-line-items";
import { Icons } from "@/components/icons/chad";
import useCartStore from "@/store/cartStore";
import { t } from "i18next";
import useTax from "@/hooks/useTax";

export function CartSheet() {
  //   const cartLineItems = await getCart();
  let { cart, cartTotalPrice } = useCartStore();
  cart = useTax(cart);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className="relative text-zinc-100 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 mr-2 lg:mr-3  "
        >
          {cart.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
            >
              {cart.length}
            </Badge>
          )}
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            {t(`cart`)} {cart.length > 0 && `(${cart.length})`}
          </SheetTitle>
          <Separator />
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <CartLineItems items={cart} className="flex-1" />
            <div className="space-y-4 pr-6">
              <Separator />

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    aria-label="View your cart"
                    href="/cart"
                    className={buttonVariants({
                      size: "sm",
                      className: "w-full",
                    })}
                  >
                    {t(`Continue to checkout`)}
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart className="mb-4 size-16 text-muted-foreground" aria-hidden="true" />
            <div className="text-xl font-medium text-muted-foreground">
              {t(`Your cart is empty`)}
            </div>
            <SheetTrigger asChild>{t(`Add items to your cart to checkout`)}</SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
