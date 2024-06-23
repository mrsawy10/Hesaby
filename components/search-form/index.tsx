import Button from "@/components/main-button";
import { Input } from "@/components/ui/input-light";
import React from "react";

function SearchTable({ search, defaultValue }: any) {
  return (
    <form
      action={search}
      className="flex flex-row gap-3.5 flex-wrap m-auto  w-full p-4 border border-zinc-800 dark:bg-zinc-900 rounded-md "
    >
      <Button className=" font-light text-zinc-700  px-4 my-auto py-1" type="submit">
        Search
      </Button>
      <Input
        defaultValue={defaultValue}
        containerClassName="flex-grow "
        placeholder="Search"
        name="keyword"
      />
    </form>
  );
}

export default SearchTable;
