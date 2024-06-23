import prisma from "@/prisma/db";
import getImageUrl from "@/lib/backend/getImageUrl";

import CardsContainer from "@/components/CardsContainer";
import SearchForm from "@/components/SearchForm";
import FilterSideBar from "./components/FilterSideBar";
import { applyTax } from "@/lib/utils";
import { Account } from "@prisma/client";

export const dynamic = "force-dynamic";

// FilterSideBar
export default async function allAccounts({ _, searchParams }: any) {
  //   let data: any[] | undefined;
  let query: any = {};
  let keyword = searchParams?.keyword ?? ``;
  if (searchParams?.games) {
    const games = searchParams.games.split(",");
    query.game_id = {
      in: games,
    };
  }

  if (searchParams?.platforms) {
    const platforms = searchParams.platforms.split(",");
    query.platform_id = {
      in: platforms,
    };
  }

  if (searchParams?.price_from && searchParams?.price_to) {
    query.price = {
      gte: parseInt(searchParams.price_from),
      lte: parseInt(searchParams.price_to),
    };
  } else if (searchParams?.price_from) {
    query.price = {
      gte: parseInt(searchParams.price_from),
    };
  } else if (searchParams?.price_to) {
    query.price = {
      lte: parseInt(searchParams.price_to),
    };
  }

  if (keyword) {
    query = { OR: [{ title: { contains: keyword } }, { description: { contains: keyword } }] };
  }

  const queryAccounts = await prisma.account.findMany({
    where: query,
    take: 20,
    include: { game: true, platform: true },
  });
  let result = await getImageUrl({ data: queryAccounts, key: "accountImg" });
  let games = await prisma.game.findMany({});
  let platforms = await prisma.platform.findMany({});
  // let finalResult = await applyTax(result);

  return (
    <div className=" dark:text-white pt-16 ">
      <SearchForm
        defaultValue={keyword ?? ``}
        className={`mx-3 sm:mx-auto md:w-7/12 lg:w-9/12 2xl:w-[84%]   sm:mr-1 sm:ml-auto sm:px-4`}
        table={`accounts`}
      />
      <CardsContainer
        btnUrlPrefix="/accounts/"
        btnTextPrice={true}
        type={`account`}
        className="sm:mr-3 ml-auto sm:w-7/12 lg:w-9/12 2xl:w-[84%]"
        SideBar={<FilterSideBar games={games} platforms={platforms} />}
        data={result}
        smallAspects="2.1rem"
      />
    </div>
  );
}
