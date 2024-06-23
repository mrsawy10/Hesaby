"use client";

import Breadcrumb from "@/components/Breadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

import GamepadIcon from "@mui/icons-material/Gamepad";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export default function SingleGameBreadcrumb({ gameName }: any) {
  let elements = [
    {
      text: `Home`,
      url: `/`,
      icon: <HomeIcon />,
    },
    {
      text: `Games`,
      url: `/games`,
      icon: <GamepadIcon />,
    },
    {
      text: gameName,
      icon: <VideogameAssetIcon />,
    },
  ];

  return <Breadcrumb  elements={elements} />;
}
