"use client";

import useGeneralStore from "@/store/generalStore";
import { Account } from "@prisma/client";
import React from "react";

function useTax(data: Account[] | undefined): Account[] {
  let { siteData } = useGeneralStore();
  let tax = siteData.find((d) => d.identifier == `general_tax`);
  if (!data || !tax) {
    return [];
  }
  let taxValue = tax?.value ? parseFloat(tax.value as string) : NaN;
  if (isNaN(taxValue)) {
    return data;
  }
  return data.map((d) => {
    return {
      ...d,
      price: +d.price + +taxValue,
    };
  });
}

export default useTax;
