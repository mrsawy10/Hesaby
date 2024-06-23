import { ReactNode } from "react";
import { Button } from "@nextui-org/react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Link from "next/link";
import Classes from "./SliderButton.module.css";
import { cn } from "@/lib/utils";
// import { Url } from "url";

//

interface Props {
  //   children?: ReactNode | undefined;
  url?: string | undefined;
  price?: string | number | undefined;
}

export default function App({ url, price }: Props) {
  return (
    <Link href={url ? url : `#`} className="w-full text-center flex justify-center ">
      <button
        className={cn(Classes["button"], `bg-red-700  rounded-sm  w-full lg:min-w-60 text-tiny sm:text-2xl  lg:text-3xl gap-2 md:gap-10  py-1 sm:py-2 lg:py-4 lg:mx-3 sm:mx-0 xl:mx-10`)}
      >
        <div className="flex gap-1 md:gap-2">
          {/* <span>ر.س</span> */}
          <p>{price}</p>
        </div>
        {/* {<ShoppingCartCheckoutIcon className="text-sm sm:text-3xl lg:text-4xl " />} */}
      </button>
    
    </Link>
  );
}
