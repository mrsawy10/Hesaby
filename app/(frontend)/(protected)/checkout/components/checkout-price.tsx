import { t } from "i18next";
import React from "react";

function CheckoutPrice() {
  return (
    <>
      <div className="mt-6 mb-6 border-t border-b py-4">
        <div className=" flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">{t(`total`)}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">$408.00</p>
        </div>
      </div>
    </>
  );
}

export default CheckoutPrice;
