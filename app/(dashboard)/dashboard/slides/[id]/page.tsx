import Panel from "@/components/text-panel";
import { getSingleUrl } from "@/lib/backend/getImageUrl";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import SingleSlideForm from "./components/SingleSlideForm";
// import SingleAccountForm from "../components/SingleForm";

export default async function SingleSlide({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let slide = await prisma.slide.findUnique({
    where: { id: params.id },
  });
  if (!slide) {
    return <WrongId />;
  }

  console.log(`slide====>`, slide);

  let imageUrl = await getSingleUrl({ key: slide.image });
  let titleImageUrl = await getSingleUrl({ key: slide.titleImage });

  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-black dark:text-white">
      <div className="mt-8 mb-8">
        <Panel>Edit Game</Panel>
      </div>

      <SingleSlideForm {...slide} imageUrl={imageUrl} titleImageUrl={titleImageUrl} />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
