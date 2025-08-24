import create from "zustand";
import axios from "axios";

export const usePostStore = create((set, get) => ({
  posts: [],
  loading: false,
  page: 1,
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${get().page}`
      );
      set((state) => ({
        posts: [...state.posts, ...res.data],
        page: state.page + 1,
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch posts", error);
      set({ loading: false });
    }
  },
}));
