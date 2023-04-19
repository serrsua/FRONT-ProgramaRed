import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostById, getPostByTag, selectEditPost } from "../redux/actions";
import person from "../images/person.png";
import Fav from "./Fav";
import Trash from "./Trash";
import Edit from "./Edit";
import Rating from "../views/RatingComponent";

const Post = ({ post, user, toggleDetails }) => {
  const [localPost, setLocalPost] = useState({});
  let userId = localStorage.getItem("id");
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  return localPost.isActive ? (
    <div className="DIV_POST px-4 py-1">
      <div className=" bg-greenGray rounded-lg p-4 shadow-shadowBlack relative">
        <div className="flex items-center mb-3">
          <div className="bg-green-300 w-12 h-12 rounded-full mr-3">
            <NavLink to={`/profile/${user?.id}`}>
              <img
                src={user?.profileImage ? user.profileImage : person}
                alt={user?.profileImage}
                className="w-full h-full rounded-full"
              />
            </NavLink>
          </div>
          <div className="flex-1">
            <NavLink
              to={`/profile/${user?.id}`}
              className=" flex gap-2 items-center text-green-700 font-medium text-sm"
            >
              {user?.username}
              {
                user?.isPremium ?
                <svg
                fill="none"
                height="120"
                viewBox="0 0 120 120"
                width="120"
                xmlns="http://www.w3.org/2000/svg"
                className=" w-5 h-5"
              >
                <path
                  d="m60 13.7 10.7 6.2h12.4l6.2 10.8 10.8 6.2v12.4l6.2 10.7-6.2 10.7v12.4l-10.8 6.2-6.2 10.8h-12.4l-10.7 6.2-10.7-6.2h-12.4l-6.2-10.8-10.8-6.2v-12.4l-6.2-10.7 6.2-10.7v-12.4l10.8-6.2 6.2-10.8h12.4z"
                  fill="#647eff"
                />
                <path
                  d="m60 93.9c-18.7 0-33.9-15.2-33.9-33.9s15.2-33.9 33.9-33.9 33.9 15.2 33.9 33.9-15.2 33.9-33.9 33.9zm0-64.9c-17.1 0-31 13.9-31 31s13.9 31 31 31 31-13.9 31-31-13.9-31-31-31z"
                  fill="#fff"
                />
                <path
                  d="m56.3 72.6-14.7-11.7c-1.2-1-1.4-2.7-.4-3.9s2.7-1.4 3.9-.4l12.6 10.1 16.8-18.8c1-1.1 2.8-1.2 3.9-.2s1.2 2.8.2 3.9l-18.5 20.7c-1 1.1-2.7 1.2-3.8.3z"
                  fill="#ffd77a"
                />
              </svg>
                : ""
              }
            </NavLink>
            <p className="text-black text-xs font-medium">{`Creado el ${post.publishDate}`}</p>
          </div>
          <Fav userId={user?.id} postId={localPost.id} localUser={userId} />
          {pathname === `/profile/${userId}` && localPost.id && (
            <>
              <Edit post={localPost} />
              <Trash postId={localPost.id} />
            </>
          )}

          {Number(localPost.User?.id) === Number(userId) && (
            <>
              <Edit post={localPost} />
              <Trash postId={localPost.id} />
            </>
          )}
        </div>

        <button
          className="text-green-700 text-base mb-3 line-clamp-4 text-left"
          onClick={() => {
            toggleDetails();
            dispatch(getPostById(localPost.id));
          }}
        >
          <h2 className="text-green-800 font-bold text-lg mb-2">
            {localPost.title}
          </h2>
          <p>{localPost.description}</p>
        </button>

        <div className="flex flex-wrap gap-x-2">
          {localPost.Tags?.map((tag, i) => {
            if (pathname !== "/home") {
              return (
                <NavLink key={i} to="/home">
                  <button
                    onClick={() => dispatch(getPostByTag(tag.name))}
                    className=" text-sm text-amber-700 font-medium"
                  >
                    #{tag.name}
                  </button>
                </NavLink>
              );
            } else {
              return (
                <button
                  onClick={() => dispatch(getPostByTag(tag.name))}
                  key={i}
                  className=" text-sm text-amber-700 font-medium"
                >
                  #{tag.name}
                </button>
              );
            }
          })}
        </div>
        <div className=" lg:absolute bottom-0 right-0 p-1">
          <Rating postId={localPost.id} />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Post;
