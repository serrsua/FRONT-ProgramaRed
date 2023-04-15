import { useSelector } from "react-redux";
import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import { setCategory } from "../redux/actions";

const Posts = ({ toggleDetails }) => {
  const allPosts = useSelector((state) => state.posts);
  const filteredPosts = useSelector((state) => state.filteredPosts);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!filteredPosts.length) setPosts(allPosts);
    else setPosts(filteredPosts);
    setCategory("");
  }, [allPosts]);

  useEffect(() => {
    if (filteredPosts.length) setPosts(filteredPosts);
    else setPosts(allPosts);
  }, [filteredPosts]);

  return (
    <div className="DIV_POSTS flex p-4 h-[80%] w-full justify-center">
      <div className="flex flex-col w-[90%] gap-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent">
        {posts?.map((post, i) => (
          <Post
            post={post}
            user={post.User}
            key={i}
            toggleDetails={toggleDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
