import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import SingleGameForm from "./components/SingleGameForm";
// import SingleAccountForm from "../components/SingleForm";

export default async function SingleGame({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let game = await prisma.game.findUnique({
    where: { id: params.id },
  });

  let command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: game?.gameImg as string,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-black dark:text-white">
      <div className="mt-8 mb-8">
        <Panel>Edit Game</Panel>
      </div>

      <SingleGameForm game={{ ...game, imageUrl: url }} />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
