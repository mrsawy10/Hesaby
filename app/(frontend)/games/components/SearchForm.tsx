"use client";
import { useState } from "react";

import * as yup from "yup";
import Swal from "sweetalert2";
import Input from "@/components/ui/input-light";
import Button from "@/components/main-button";
import { searchAction } from "@/actions/search";
import { useRouter } from "next/navigation";

interface SearchTable {
  table: "game" | "account" | `games`;
  className?: string;
  defaultValue?: string;
}
export default function SearchForm({ table, className, defaultValue }: SearchTable) {
  let [keyword, setKeyword] = useState(defaultValue ?? ``);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          //   let { search } = Object.fromEntries(formData.entries());
          if (!keyword || typeof keyword !== `string`) {
            throw new Error(`Invalid Value`);
          } else {
            router.replace(`/${table}/?keyword=${keyword}`);
          }
          //   await searchAction(table, search);
        } catch (error: any) {
          console.log(error);
          if (error instanceof yup.ValidationError) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.errors[0] ?? "",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.message ?? "",
            });
          }
        }
      }}
      className={"sm:w-9/12 lg:w-1/2 m-auto mb-6 flex gap-3 " + className}
    >
      <Input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        name="keyword"
        placeholder="Search "
        containerClassName="w-full flex-grow"
      />{" "}
      <Button type="submit" className=" my-[2px] px-3 ">
        Search
      </Button>
    </form>
  );
}
