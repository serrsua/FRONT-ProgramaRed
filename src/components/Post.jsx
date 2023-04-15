import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostById, getPostByTag, selectEditPost } from "../redux/actions";
import person from "../images/person.png";
import Fav from "./Fav";
import Trash from "./Trash";
import Edit from "./Edit";

const Post = ({ post, user, toggleDetails }) => {
  //post recibe username porque en algunos casos el "post" no posee username
  const [localPost, setLocalPost] = useState({});
  let userId = localStorage.getItem("id");
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  return localPost.isActive ? (
    <div className="DIV_POST px-4 py-1">
      <div className=" bg-greenGray rounded-lg p-4 shadow-shadowBlack">
        <div className="flex items-center mb-3">
          <div className="bg-green-300 w-12 h-12 rounded-full mr-3">
            <img
              src={
                user.profileImage
                  ? user.profileImage
                  : person
              }
              alt={user.profileImage}
              className="w-full rounded-full"
            />
          </div>

          <div className="flex-1">
            <NavLink
              to={`/profile/${user.id}`}
              className="text-green-700 font-medium text-sm"
            >
              {user.username}
            </NavLink>
            <p className="text-black text-xs font-medium">{`Creado el ${post.publishDate}`}</p>
          </div>
          <Fav
            userId={user.id}
            postId={localPost.id}
            localUser={userId}
          />
          {pathname === `/profile/${userId}` && localPost.id && (
            <Edit post={localPost}/>
          )}
          {pathname === `/profile/${userId}` && localPost.id && (
            <Trash postId={localPost.id} />
          )}
          {Number(localPost.User?.id) === Number(userId) && (
            <Edit post={localPost}/>
          )}
          {Number(localPost.User?.id) === Number(userId) && (
            <Trash postId={localPost.id} />
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
      </div>
    </div>
  ) : (
    ""
  );
};

export default Post;
