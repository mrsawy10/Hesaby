import { getDataValue } from "@/lib/utils";
import { SiteData } from "@prisma/client";

export const Statistics = ({ aboutData }: { aboutData: SiteData[] }) => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: getDataValue(aboutData, `about_sec1_block1_number`),
      description: getDataValue(aboutData, `about_sec1_block1_desc`),
    },
    {
      quantity: getDataValue(aboutData, `about_sec1_block2_number`),
      description: getDataValue(aboutData, `about_sec1_block2_desc`),
    },
    {
      quantity: getDataValue(aboutData, `about_sec1_block3_number`),
      description: getDataValue(aboutData, `about_sec1_block3_desc`),
    },
    {
      quantity: getDataValue(aboutData, `about_sec1_block4_number`),
      description: getDataValue(aboutData, `about_sec1_block4_desc`),
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
