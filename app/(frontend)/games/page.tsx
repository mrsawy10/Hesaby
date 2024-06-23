import prisma from "@/prisma/db";
import getImageUrl from "@/lib/backend/getImageUrl";

import CardsContainer from "@/components/CardsContainer";
import SearchForm from "@/components/SearchForm";

export const dynamic = "force-dynamic";

export default async function allGames({ params, searchParams }: any) {
  let gamesData: any[] | undefined;
  let keyword = searchParams?.keyword ?? ``;
  console.log({ keyword, searchParams });
  if (keyword) {
    gamesData = await prisma.game.findMany({
      where: {
        OR: [{ title: { contains: keyword } }, { description: { contains: keyword } }],
      },
      take: 20,
    });
  } else {
    gamesData = await prisma.game.findMany({
      take: 20,
    });
  }

  let result = await getImageUrl({ data: gamesData, key: "gameImg" });

  return (
    <div className=" dark:text-white pt-16 ">
      <SearchForm defaultValue={keyword ?? ``} className={`mx-3 sm:mx-auto`} table={`games`} />

      <CardsContainer
        btnUrlPrefix="/games/"
        type="game"
        btnTextPrice={false}
        btnTxt={`SEE MORE`}
        data={result}
      />
    </div>
  );
}
