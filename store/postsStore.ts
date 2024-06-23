import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { Slide, Faq } from "@prisma/client";

interface PostsState {
//   slides: Slide[];
//   loading: boolean;
//   faqs: Faq[];
//   getSlides: () => void;
//   getFaqs: () => void;
//   setLoading: (loading: boolean) => void;
}

const usePostsStore = create<PostsState>((set, get) => ({
  
}));

export default usePostsStore;
