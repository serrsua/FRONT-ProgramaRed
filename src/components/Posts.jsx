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

  const orderAlph = (e) => {
    if (e.target.value === "Más antiguo") {
      setPosts(
        [...posts].sort(
          (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
        )
      );
    }
    if (e.target.value === "Más reciente") {
      setPosts(
        [...posts].sort(
          (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        )
      );
    }
    if (e.target.value === "A-Z") {
      setPosts(
        [...posts].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      );
    }
    if (e.target.value === "Z-A") {
      setPosts(
        [...posts].sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        })
      );
    }
    if (e.target.value === "eliminar") {
      e.target.value = "";
      setPosts([...allPosts]);
    }
  };

  return (
    <div className="DIV_POSTS flex flex-col p-4 h-[80%] w-full justify-center">
      <div className="DIV_ORDER mb-2 flex self-center ">
        <select
          className="rounded-lg shadow-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600 font-medium py-2 px-4"
          name=""
          id=""
          onChange={orderAlph}
        >
          <option className=" text-center" value="" hidden>
            Ordenar
          </option>
          <optgroup label="Fecha">
            <option value="Más reciente">Más reciente</option>
            <option value="Más antiguo">Más antiguo</option>
          </optgroup>
          <optgroup label="Título">
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="eliminar">Quitar orden</option>
          </optgroup>
        </select>
      </div>
      <div className="flex flex-col self-center w-[90%] gap-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent">
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
