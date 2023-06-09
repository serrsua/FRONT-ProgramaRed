import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getPostByTag } from "../redux/actions";
import person from "../images/person.png";
import Fav from "./Fav";
import Trash from "./Trash";
import Edit from "./Edit";
import { useEffect } from "react";
import Comments from "./Comments";
import Rating from "../views/RatingComponent";

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

  const userId = localUser;
  const postId = post.id;

  return (
    <div className="DIV_POSTDETAIL fixed z-50 min-w-90% max-w-[90%] top-10 left-1/2 transform -translate-x-1/2 h-[90%] flex flex-col gap-2">
      <div
        className={`bg-greenGray relative rounded-lg p-4 shadow-shadowBlack h-[60%] overflow-y-auto scrollbar-thin flex flex-col justify-between m-0`}
      >
        <button
          className=" absolute left-1/2 top-1 bg-red-600 px-2 py-1 rounded transition-all hover:scale-110 hover:bg-red-700 border border-black"
          onClick={() => {
            toggleDetails();
            dispatch(clearDetail());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>
          <div className="flex items-center mb-2 mt-3">
            <div className="bg-green-300 w-12 h-12 rounded-full mr-3">
              <img
                src={
                  post?.User?.profileImage ? post?.User?.profileImage : person
                }
                alt={post?.User?.username}
                className="w-full h-full rounded-full border border-blue-300"
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
        <div className="lg:absolute bottom-0 right-0 p-2">
          <p className="font-medium pr-1">Puntua el post</p>
          <Rating postId={post?.id} />
        </div>
      </div>
      <div className="DIV_COMENTS bg-greenGray h-[40%] rounded-lg p-4 shadow-shadowBlack overflow-y-auto scrollbar-thin">
        <Comments
          toggleDetails={toggleDetails}
          comments={post.Comments}
          userId={userId}
          postId={postId}
        />
      </div>
    </div>
  );
};

export default PostDetail;
