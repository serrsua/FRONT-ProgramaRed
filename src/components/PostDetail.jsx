import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getPostByTag } from "../redux/actions";
import person from "../images/person.png";
import Fav from "./Fav";
import Trash from "./Trash";
import Edit from "./Edit";
import { useEffect } from "react";
import Comments from "./Comments";

const PostDetail = ({ toggleDetails }) => {
  const post = useSelector((state) => state.actualPost);
  const dispatch = useDispatch();
  const localUser = localStorage.getItem("id");

  const clickHandler = (tag) => {
    dispatch(clearDetail());
    dispatch(getPostByTag(tag));
    toggleDetails();
  };

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch]);

  console.log("postFiles", post.PostFiles);

  const userId = localUser;
  const postId = post.id;

  return (
    <div className="DIV_POSTDETAIL fixed z-50 min-w-90% max-w-[90%] top-10 left-1/2 transform -translate-x-1/2 h-full flex flex-col gap-2">
      <div
        className={`bg-greenGray rounded-lg p-4 shadow-shadowBlack flex flex-col justify-between m-0`}
      >
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
                src={
                  post?.User?.profileImage ? post?.User?.profileImage : person
                }
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
            {Number(post?.User?.id) === Number(localUser) && (
              <div onClick={toggleDetails} className="flex">
                <Edit post={post} />
                <Trash postId={post?.id} />
              </div>
            )}
          </div>
          <h2 className="text-green-800 font-bold text-lg mb-2">
            {post?.title}
          </h2>
          <div className="text-green-700 text-base">{post?.description}</div>
        </div>

        <div className="flex items-center">
          {!post.PostFiles?.length
            ? ""
            : post.PostFiles.map((file, i) => {
                if (
                  file.type === "image/png" ||
                  file.type === "image/jpg" ||
                  file.type === "image/jpeg" ||
                  file.type === "image/gif" ||
                  file.type === "image/svg"
                ) {
                  return (
                    <div className="w-[150px] p-4" key={i}>
                      <a
                        rel="noreferrer noopener"
                        href={file.url}
                        target="_blank"
                      >
                        <img
                          className=" w-full rounded-md"
                          src={file.url}
                          alt="FORMATO NO VALIDO"
                        />
                      </a>
                    </div>
                  );
                } else if (file.type === "video/mp4") {
                  return (
                    <div className="w-[250px] p-4" key={i}>
                      <a
                        className="flex self-center"
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <video controls src={file.url}></video>
                      </a>
                    </div>
                  );
                }
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
      <div className="DIV_COMENTS bg-greenGray rounded-lg p-4 shadow-shadowBlack">
        <Comments comments={post.Comments} userId={userId} postId={postId} />
      </div>
    </div>
  );
};

export default PostDetail;
