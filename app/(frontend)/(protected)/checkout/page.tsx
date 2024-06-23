import Input from "@/components/ui/input-light";
import React from "react";
import CheckoutForm from "./components/checkout-form";
import CheckoutHeader from "./components/checkout-header";
import OrderSummary from "./components/order-summary";

function Checkout() {
  return (
    <div className="pb-24 ">
      <div className="flex flex-col items-center border-b  py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32 pt-24">
        <CheckoutHeader />
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <OrderSummary />

        <CheckoutForm />
      </div>
    </div>
  );
}

export default Checkout;
{
  /* <div>
        

    </div> */
}
