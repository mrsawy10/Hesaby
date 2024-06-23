import Carousel from "@/components/carousel/";
import prisma from "@/prisma/db";
import getImageUrl from "@/lib/backend/getImageUrl";
import GamepadIcon from "@mui/icons-material/Gamepad";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import useTax from "@/hooks/useTax";

export const dynamic = "force-dynamic";

export default async function Featured() {
  let featuredGames = await prisma.game.findMany({
    where: {
      isFeatured: true,
    },
  });
  let featureAccounts = await prisma.account.findMany({
    where: {
      isFeatured: true,
    },
    include: { game: true, platform: true, seller: true },
  });

  let gameData = await getImageUrl({ data: featuredGames, key: "gameImg" });
  let accountData = await getImageUrl({ data: featureAccounts, key: "accountImg" });

  // let finalResult = useTax(accountData);

  // console.log(`enableDecs Featured`, enableDecs);
  return (
    <>
      {/* <div className="flex gap-4 px-12 lg:px-32 xl:36 2xl:px-40 py-3 flex-wrap w-full  "> */}
      <div className=" sm:w-[89vw] lg:my-24 mx-auto sm:container w-[72vw]">
        <Carousel
          data={gameData}
          label={
            <div className="flex gap-3  md:gap-7 justify-center items-center ">
              <VideogameAssetIcon sx={{ fontSize: 50 }} />
              <label>{`العاب شائعة`}</label>
            </div>
          }
          btnTxt={`SEE MORE`}
          btnTextPrice={false}
          btnUrlPrefix={`/games/`}
          type={`game`}
          // btnUrlAfterFix={`/games/`}
        />
      </div>
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />

      <div className=" sm:w-[89vw] lg:my-24 mx-auto sm:container w-[72vw]">
        <Carousel
          type={`account`}
          data={accountData}
          label={
            <div className="flex gap-3  md:gap-7 justify-center items-center ">
              <SportsEsportsIcon sx={{ fontSize: 50 }} />
              <label>{`حسابات شائعة`}</label>
            </div>
          }
          btnTextPrice={true}
          btnUrlPrefix={`/accounts/`}
          btnTxt={`PREVIEW`}
        />
      </div>
    </>
  );
}
