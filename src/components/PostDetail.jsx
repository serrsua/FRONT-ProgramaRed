import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getPostByTag } from "../redux/actions";
import person from "../images/person.png";
import Fav from "./Fav";
import Trash from "./Trash";
import Edit from "./Edit";
import { useEffect } from "react";

const PostDetail = ({ toggleDetails }) => {
  const post = useSelector((state) => state.actualPost);
  const dispatch = useDispatch();
  const localUser = localStorage.getItem("id");

  const clickHandler = (tag) => {
    dispatch(clearDetail());
    dispatch(getPostByTag(tag));
    toggleDetails();
  }; 

  useEffect(()=>{
    return () => {
      dispatch(clearDetail());
    }
  },[dispatch])

  return (
    <div className="DIV_POSTDETAIL bg-greenGray rounded-lg p-4 shadow-shadowBlack min-w-90% flex flex-col justify-between h-3/4 m-0 absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div>
        <button
          className=" absolute right-1/2 top-2 bg-red-600 px-2 py-1 text-white font-bold rounded transition-all hover:scale-110 hover:bg-red-700 border border-black"
          onClick={() => {
            toggleDetails();
            dispatch(clearDetail());
          }}
        >
          X
        </button>
        <div className="flex items-center mb-2">
          <div className="bg-green-300 w-12 h-12 rounded-full mr-3">
            <img
              src={post?.User?.profileImage ? post?.User?.profileImage : person}
              alt={post?.User?.username}
              className="w-full rounded-full border border-blue-300"
            />
          </div>
          <div className="flex-1">
            <NavLink
              to={`/profile/${post?.User?.id}`}
              className="text-green-700 font-medium text-sm"
            >
              {post?.User?.username}
            </NavLink>
            <p className="text-black text-xs font-medium">{`Creado el ${post.publishDate}`}</p>
          </div>
          <Fav
            userId={post?.User?.id}
            postId={post?.id}
            localUser={localUser}
          />
          {
            Number(post?.User?.id) === Number(localUser) && (
              <>
                <Edit />
                <Trash postId={post?.id} />
              </>
            )
          }
        </div>
        <h2 className="text-green-800 font-bold text-lg mb-2">{post?.title}</h2>
        <div className="text-green-700 text-base">{post?.description}</div>
      </div>

      <div className="flex justify-center">
        {!post.files?.length
          ? ""
          : post.files.map((file, i) => {
              return (
                <div className=" flex w-52  m-2" key={i}>
                  <a rel="noreferrer noopener" href={file} target="_blank">
                    <img className=" w-full rounded-md" src={file} alt="a" />
                  </a>
                </div>
              );
            })}
      </div>

      <div className="flex gap-2 mt-3">
        {post.Tags?.map((tag, i) => {
          return (
            <NavLink key={i} to="/home">
              <button
                onClick={() => clickHandler(tag.name)}
                className=" text-sm text-amber-700 font-medium transition-all hover:text-amber-500"
              >
                #{tag.name}
              </button>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default PostDetail;
