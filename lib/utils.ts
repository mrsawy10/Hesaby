import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Account, SiteData } from "@prisma/client";
import { getSingleUrl } from "./backend/getImageUrl";
import prisma from "@/prisma/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormInputValues(
  form: HTMLFormElement,
  inputNames: string[]
): Record<string, string | FileList | null> {
  const inputValues: Record<string, string | FileList | null> = {};

  inputNames.forEach((name) => {
    const input = form.elements.namedItem(name) as HTMLInputElement;

    // Check if the input exists and its type is 'file'
    if (input && input.type === "file") {
      // If the input is of type 'file', assign the file object(s) to the input value
      inputValues[name] = input.files;
    } else {
      // For other input types, assign the input value
      inputValues[name] = input ? input.value : "";
    }
  });

  return inputValues;
}

export function getFormData(
  form: HTMLFormElement,
  inputNames: string[]
): Record<string, HTMLInputElement> {
  const inputValues: Record<string, HTMLInputElement> = {};

  inputNames.forEach((name) => {
    const input = form.elements.namedItem(name) as HTMLInputElement;

    inputValues[name] = input;
  });

  return inputValues;
}

export function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`done`);
    }, seconds * 1000); // 4000 milliseconds = 4 seconds
  });
}

export function isValidUrl(url: string): boolean {
  try {
    return url?.startsWith("http://") || url?.startsWith("https://") || url?.startsWith("/");
  } catch (err) {
    console.log(err);
    return false;
  }
}

// export const getValue = (data: any[], key: string) => {
//   return data.find((d) => d.identifier == key)?.value ?? null;
// };
export function getDataValue(siteData: SiteData[], identifier: string): string {
  if (!Array.isArray(siteData)) {
    return ``;
  }
  return siteData.find((d) => d.identifier == identifier)?.value ?? ``;
}
export async function getDataImage(siteData: SiteData[], identifier: string): Promise<string> {
  if (!Array.isArray(siteData)) {
    return ``;
  }
  let value = siteData.find((d) => d.identifier == identifier)?.value ?? ``;
  let url = await getSingleUrl({ key: value });
  return url;
}
export async function getDataImages(siteData: SiteData[]): Promise<any[]> {
  if (!Array.isArray(siteData)) {
    return [];
  }

  let result = await Promise.all(
    siteData.map(async (element) => {
      let value = element.value;
      if (element.identifier.includes(`_img`)) {
        value = await getSingleUrl({ key: value });
      }
      return {
        ...element,
        value,
      };
    })
  );
  return result;
}

export const applyTax = async (data: Account[] | undefined) => {
  if (!data) {
    return [];
  }
  let tax = await prisma.siteData.findFirst({ where: { identifier: "general_tax" } });
  let taxValue = tax?.value ? parseFloat(tax.value as string) : NaN;
  if (isNaN(taxValue)) {
    return data;
  }
  return data.map((d) => {
    return {
      ...d,
      price: +d.price + taxValue,
    };
  });
};

// export function getQueryFromKeys<T>(obj: T, keyword: string) {
//   return Object.keys(obj).map((ele) => ({ [ele]: { contains: keyword } }));
// }

export function getQueryFromKeys<T extends Record<string, any>>(obj: T, keyword: string) {
  return Object.keys(obj).map((ele) => ({ [ele]: { contains: keyword } }));
}
