import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/icons";
import prisma from "@/prisma/db";
import { getDataImages, getDataValue } from "@/lib/utils";
import Image from "next/image";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

export const HowItWorks = async () => {
  const aboutData = await prisma.siteData.findMany({
    where: {
      identifier: {
        startsWith: "home",
      },
    },
  });
  let data = await getDataImages(aboutData);

  const features: FeatureProps[] = [
    {
      icon: getDataValue(data, `home_sec2_block1_img`),
      title: getDataValue(data, `home_sec2_block1_title`),
      description: getDataValue(data, `home_sec2_block1_desc`),
    },
    {
      icon: getDataValue(data, `home_sec2_block2_img`),
      title: getDataValue(data, `home_sec2_block2_title`),
      description: getDataValue(data, `home_sec2_block2_desc`),
    },
    {
      icon: getDataValue(data, `home_sec2_block3_img`),
      title: getDataValue(data, `home_sec2_block3_title`),
      description: getDataValue(data, `home_sec2_block3_desc`),
    },
    {
      icon: getDataValue(data, `home_sec2_block4_img`),
      title: getDataValue(data, `home_sec2_block4_title`),
      description: getDataValue(data, `home_sec2_block4_desc`),
    },
  ];

  return (
    <>
      <section id="howItWorks" className="container text-center py-24 sm:py-32">
        <h2 className="text-3xl md:text-4xl font-bold ">
          {/* How It{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Works{" "}
          </span>
          Step-by-Step Guide */}
          {getDataValue(data, `home_sec2_title`)}
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          {getDataValue(data, `home_sec2_desc`)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps) => (
            <Card
              key={`${title}${description}${icon}`}
              className="bg-muted/50 dark:bg-zinc-850 border-gray-800"
            >
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {/* {icon} */}
                  <Image
                    src={icon}
                    width={80}
                    height={80}
                    alt={`${title}${description}`}
                    className="rounded-sm"
                  />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
