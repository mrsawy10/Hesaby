import { Image } from "@nextui-org/react";
import logoImage from "@/images/l.png";
import logoImageDark from "@/images/rr.png";

import { useTheme as useNextTheme } from "next-themes";
import useGeneralStore from "@/store/generalStore";
//
export const AcmeIcon: React.FC<{ width?: number }> = ({ width }) => {
  const { theme } = useNextTheme();
  let { getSingleValue } = useGeneralStore();
  return (
    <Image
      width={400}
      height={400}
      loading="lazy"
      className="h-full w-full object-cover rounded-none hidden sm:block"
      src={getSingleValue(`general_logo_img`)}
      alt="Hesaby"
    />
  );
};
// console.log(logoImage)

export const logoSrc = logoImage;
export const logoSrcDark = logoImageDark;

export default AcmeIcon;
