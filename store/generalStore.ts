import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { SiteData } from "@prisma/client";

interface GeneralState {
  generalIsLoading: boolean;
  siteData: SiteData[];
  setGeneralIsLoading: (generalIsLoading: boolean) => void;
  setSiteData: (siteData: SiteData[]) => void;
  getSingleValue: (key: string) => string;
}

const useGeneralStore = create<GeneralState>((set, get) => ({
  generalIsLoading: false,
  siteData: [],

  setGeneralIsLoading: (generalIsLoading: boolean) => {
    set({ generalIsLoading });
  },
  setSiteData: (siteData: SiteData[]) => {
    set({ siteData });
  },
  getSingleValue: (key: string) => {
    return get().siteData.find((d) => d.identifier == key)?.value ?? `/placeholder.jpg`;
  },
}));

export default useGeneralStore;
