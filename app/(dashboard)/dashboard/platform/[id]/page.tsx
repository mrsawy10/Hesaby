import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import SinglePlatformForm from "./components/singlePlatformForm";
// import SingleGameForm from "./components/SingleGameForm";
// import SingleAccountForm from "../components/SingleForm";

export default async function SinglePlatform({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let platform = await prisma.platform.findUnique({
    where: { id: params.id },
  });

  let command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: platform?.platformImg as string,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-black dark:text-white">
      <div className="mt-8 mb-8">
        <Panel>Edit Platform</Panel>
      </div>

      {/* <SingleAccountForm
        platforms={platforms.map((e) => ({ ...e, label: e?.title }))}
        games={games.map((e) => ({ ...e, label: e?.title }))}
        account={account}
        originalAccountImg={originalAccountImg}
      /> */}
      <SinglePlatformForm platform={{ ...platform, imageUrl: url }} />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
