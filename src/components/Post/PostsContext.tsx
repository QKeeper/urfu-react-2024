import { IPost, IPostsActionsContext, IPostsContext } from "@/models";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

export const PostsContext = createContext<IPostsContext>({
  posts: [],
});

export const PostsActionsContext = createContext<IPostsActionsContext>({});

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[]>(
    JSON.parse(localStorage.getItem("notes") || "[]"),
  );

  const setPostsLS = useCallback(
    (posts: SetStateAction<IPost[]>) => {
      setPosts((prev) => {
        const updated = typeof posts === "function" ? posts(prev) : posts;
        localStorage.setItem("notes", JSON.stringify(updated));
        return updated;
      });
    },
    [setPosts],
  );

  const actions = useMemo(
    () => ({
      setPosts: (posts: IPost[]) => setPostsLS(posts),
      createPost: (post: IPost) => setPostsLS((prev) => [post, ...prev]),
      updatePost: (post: IPost) =>
        setPostsLS((prev) =>
          prev.map((old) => (old.id == post.id ? post : old)),
        ),
      deletePost: (id: string) =>
        setPostsLS((prev) => prev.filter((old) => old.id !== id)),
    }),
    [setPostsLS],
  );

  return (
    <PostsContext.Provider value={{ posts }}>
      <PostsActionsContext.Provider value={actions}>
        {children}
      </PostsActionsContext.Provider>
    </PostsContext.Provider>
  );
}
