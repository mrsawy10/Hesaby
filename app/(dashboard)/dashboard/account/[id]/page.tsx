import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import SingleAccountForm from "../components/SingleForm";

export default async function SingleAccount({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let account = await prisma.account.findUnique({
    where: { id: params.id },
    include: {
      accountImages: true,
      game: true,
      platform: true,
    },
  });
  if (!account) return <WrongId />;
  //
  account.accountImages.forEach(async (accountImage) => {
    try {
      let command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: accountImage.image as string,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
      accountImage.image = url;
    } catch (err) {
      console.log(err);
    }
  });

  let originalAccountImg = account.accountImg;

  try {
    let command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: account.accountImg as string,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
    account.accountImg = url;
  } catch (err) {
    console.log(err);
  }

  //   account.accountImg

  const games = await prisma.game.findMany();
  const platforms = await prisma.platform.findMany();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-black dark:text-white">
      <div className="mt-8 mb-8">
        <Panel>Edit Account</Panel>
      </div>

      <SingleAccountForm
        platforms={platforms.map((e) => ({ ...e, label: e?.title }))}
        games={games.map((e) => ({ ...e, label: e?.title }))}
        account={account}
        originalAccountImg={originalAccountImg}
      />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
