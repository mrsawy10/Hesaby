import Image from "next/image";
import logoImage from "@/images/l.png";
import logoImageDark from "@/images/rr.png";

import { useTheme as useNextTheme } from "next-themes";
//
export const AcmeIcon: React.FC<{ width?: number }> = ({ width }) => {
  const { theme } = useNextTheme();
  return <Image src={theme == "dark" ? logoImageDark : logoImage} alt="Acme Logo" width={width} />;
};
// console.log(logoImage)
export const logoSrc = logoImage;
export const logoSrcDark = logoImageDark;

export default AcmeIcon;
