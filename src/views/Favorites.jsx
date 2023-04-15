import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { useEffect } from "react";
import { getFavorites } from "../redux/actions";

const Favorites = ({toggleDetails}) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("id");
  const favorites = useSelector((state) => state.favorites);

  // useEffect(() => {
  //   dispatch(getFavorites(userId));
  // }, [favorites]);


  return (
    <div className="DIV_FAVORITES py-2">
      <div className="overflow-hidden">
        <div className="flex flex-col gap-2 overflow-y-auto h-full scrollbar-thin scrollbar-track-transparent">
          <h2 className="text-2xl font-bold mx-auto my-2">
            {favorites.length ? "Favoritos" : "No tienes Favoritos"}
          </h2>
          {favorites?.map((fav, i) => (
            <Post post={fav.Post} user={fav.Post.User} key={i} toggleDetails={toggleDetails}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
