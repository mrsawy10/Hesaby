import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import SingleGameForm from "./components/SingleFaqForm";
// import SingleAccountForm from "../components/SingleForm";

export default async function SingleFaq({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let faq = await prisma.faq.findUnique({
    where: { id: params.id },
  });

  if (!faq) {
    return <WrongId />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-black dark:text-white">
      <div className="mt-8 mb-8">
        <Panel>Edit Faq</Panel>
      </div>

      <SingleGameForm {...faq} />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
