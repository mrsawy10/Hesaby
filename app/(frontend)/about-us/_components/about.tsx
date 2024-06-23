import { Statistics } from "./Statistics";
import pilot from "./../../../../public/chad/pilot.png";
import prisma from "@/prisma/db";
import { getDataValue } from "@/lib/utils";
import { SiteData } from "@prisma/client";

export const About = ({ aboutData }: { aboutData: SiteData[] }) => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img src={getDataValue(aboutData, `about_sec1_img`)} alt="" className="w-[300px] object-contain rounded-lg" />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {getDataValue(aboutData, `about_sec1_title`)}
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                {getDataValue(aboutData, `about_sec1_desc`)}
              </p>
            </div>

            <Statistics aboutData={aboutData} />
          </div>
        </div>
      </div>
    </section>
  );
};
