import { API } from "@/api";
import NewPost from "@/components/Post/NewPost";
import Post from "@/components/Post/Post";
import {
  PostsActionsContext,
  PostsContext,
} from "@/components/Post/PostsContext";
import { CompareDateStrings } from "@/utils";
import { useContext, useEffect } from "react";

export default function Homepage() {
  const { posts } = useContext(PostsContext);
  const { setPosts } = useContext(PostsActionsContext);

  useEffect(() => {
    API.Post.get().then(({ data }) => setPosts?.(data));
  }, [setPosts]);

  return (
    <div className="container my-4">
      <h1 className="text-xl">All Notes ({posts.length})</h1>
      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        <NewPost />
        {posts
          .sort((a, b) => CompareDateStrings(a.createdAt, b.createdAt))
          .map((data) => (
            <Post key={data.id} {...data} />
          ))}
      </div>
    </div>
  );
}
