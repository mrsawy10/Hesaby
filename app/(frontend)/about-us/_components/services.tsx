import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "@/components/icons";
import { SiteData } from "@prisma/client";
import { getDataValue } from "@/lib/utils";
import clsx from "clsx";
// import cubeLeg from "../assets/cube-leg.png";

interface ServiceProps {
  title: string;
  description: string;
  icon: string;
}

export const Services = ({ aboutData }: { aboutData: SiteData[] }) => {
  const serviceList: ServiceProps[] = [
    {
      title: getDataValue(aboutData, `about_sec2_block1_title`),
      description: getDataValue(aboutData, `about_sec2_block1_desc`),
      icon: getDataValue(aboutData, `about_sec2_block1_img`),
    },
    {
      title: getDataValue(aboutData, `about_sec2_block2_title`),
      description: getDataValue(aboutData, `about_sec2_block2_desc`),
      icon: getDataValue(aboutData, `about_sec2_block2_img`),
    },
    {
      title: getDataValue(aboutData, `about_sec2_block3_title`),
      description: getDataValue(aboutData, `about_sec2_block3_desc`),
      icon: getDataValue(aboutData, `about_sec2_block3_img`),
    },
  ];
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            {/* <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Client-Centric{" "}
            </span>
            Services */}
            {getDataValue(aboutData, `about_sec2_title`)}
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            {getDataValue(aboutData, `about_sec2_desc`)}
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  {/* <div className="mt-1 bg-primary/20 p-1 rounded-2xl"> */}
                  <img
                    src={icon}
                    className={clsx(
                      "min-w-[40px] md:min-w-[50px]  lg:min-w-[60px]  object-contain",
                      `max-w-[40px] md:max-w-[50px]  lg:max-w-[60px]`,
                      `mt-1 bg-primary/20 p-[0.1rem] rounded-lg`
                    )}
                    alt="About services"
                  />
                  {/* </div> */}
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={getDataValue(aboutData, `about_sec2_img`)}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
