import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getImageUrl, { getSingleUrl } from "@/lib/backend/getImageUrl";

import SingleAccountComponent from "./components/SingleAccount";
import Carousel from "@/components/carousel";

export default async function SingleAccount({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let account = await prisma.account.findUnique({
    where: { id: params.id },
    include: {
      accountImages: true,
      game: true,
      seller: true,
      platform: true,
    },
  });
  if (!account) return <WrongId />;
  //
  let gallery = await getImageUrl({ data: account.accountImages, key: `image` });
  let accountImgUrl = await getSingleUrl({ key: account.accountImg });
  const gameImg = await getSingleUrl({ key: account.game.gameImg });
  const platformImg = await getSingleUrl({ key: account.platform.platformImg });
  const sellerImg = await getSingleUrl({ key: account.seller.profileImg });
  //
  let relatedAccountsRaw = await prisma.account.findMany({
    where: { OR: [{ game_id: account.game_id }, { platform_id: account.platform_id }] },
    take: 12,
  });
  let relatedAccounts = await getImageUrl({ data: relatedAccountsRaw, key: `accountImg` });
  //
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-black dark:text-white pt-8 mt-12 pb-8 gap-9">
      <SingleAccountComponent
        platformImgUrl={platformImg}
        gameImgUrl={gameImg}
        sellerImg={sellerImg}
        account={{ ...account }}
        gallery={
          gallery
            ? [{ imgUrl: accountImgUrl, id: "_" }, ...gallery]
            : [{ imgUrl: accountImgUrl, id: "_" }]
        }
      />
      {relatedAccounts && Array.isArray(relatedAccounts) && relatedAccounts.length > 0 && (
        <div className="w-8/12 md:w-9/12">
          <Carousel
            type={`account`}
            data={relatedAccounts}
            label={
              <div className="flex gap-7 justify-center items-center ">
                <SportsEsportsIcon sx={{ fontSize: 50 }} />
                <label>{`حسابات ذات صلة`}</label>
              </div>
            }
            btnTextPrice={true}
            btnUrlPrefix={`/accounts/`}
            btnTxt={`PREVIEW`}
          />
        </div>
      )}
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
