// import SideBar from "./SideBar";
import Card from "@/components/cards/nextui-card";
import CardsContainer from "@/components/CardsContainer";

import { cn } from "@/lib/utils";

export default function Container({ games, breadCrumb }: any) {
  return (
    <>
      <div className="w-auto sm:w-9/12 lg:w-10/12 m-auto ">
        {breadCrumb && <div className="p-4">{breadCrumb}</div>}

        <CardsContainer
          btnUrlPrefix="/games/"
          type="game"
          btnTextPrice={false}
          btnTxt={`SEE MORE`}
          data={games}
        />
      </div>
      {/* </div> */}
    </>
  );
}
