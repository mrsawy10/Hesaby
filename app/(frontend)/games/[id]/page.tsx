import GamesContainer from "../components/GamesContainer";
import prisma from "@/prisma/db";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import getImageUrl from "@/lib/backend/getImageUrl";
import Breadcrumb from "@/components/Breadcrumb";
import SingleGameBreadcrumb from "../components/SingleGameBreadcrumb";

export default async function Page({ params, searchParams }: any) {
  let id = params?.id ?? null;
  let gameName = searchParams?.gameName ?? null;

  if (!id || !gameName) return <WrongId>Wrong ID</WrongId>;

  let gamesData = await prisma.account.findMany({
    where: {
      game_id: id,
    },
    take: 20,
  });
  if (!gamesData || gamesData.length < 1) return <WrongId>No Data Found</WrongId>;

  let result = await getImageUrl({ data: gamesData, key: "accountImg" });
  return (
    <div className=" dark:text-white pt-16 ">
      <GamesContainer breadCrumb={<SingleGameBreadcrumb gameName={gameName} />} games={result} />
    </div>
  );
}

const WrongId = ({ children }: any) => (
  <div className="w-full h-screen flex justify-center items-center text-black dark:text-white">
    {children}
  </div>
);
