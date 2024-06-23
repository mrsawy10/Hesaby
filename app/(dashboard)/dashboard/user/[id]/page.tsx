import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getImageUrl, { getSingleUrl } from "@/lib/backend/getImageUrl";
import SingleUserForm from "./components/SingleUserForm";
// import SingleAccountForm from "../components/SingleForm";

export default async function SingleUser({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let user = await prisma.user.findUnique({
    where: { id: params.id },
    // include: {
    //   accountImages: true,
    //   game: true,
    //   platform: true,
    // },
  });
  if (!user) return <WrongId />;
  //

  //   let originalAccountImg = user.profileImg;

  let profileUrl = await getSingleUrl({ key: user.profileImg });
  let coverUrl = await getSingleUrl({ key: user.coverImg });



  console.log(user)
  //
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-black dark:text-white">
      <div className="mt-8 mb-8 w-full">
        <Panel>Edit User</Panel>
      </div>

      <SingleUserForm
        user={{ ...user, profileUrl, coverUrl }}
        // originalAccountImg={originalAccountImg}
      />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
