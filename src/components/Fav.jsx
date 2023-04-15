import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../redux/actions";
import Swal from "sweetalert2";

const Fav = ({ postId, localUser }) => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (id) {
      setUserId(id);
      // dispatch(getFavorites(id));       
    }
  }, [dispatch]);

  // console.log("userId:", userId);

  const [clicked, setClicked] = useState(false);
  const allFavorites = useSelector((state) => state.favorites);

  useEffect(() => {
    let selectedFavorite = allFavorites.find(
      (fav) => Number(fav.PostId) === Number(postId)
    );
    if (selectedFavorite !== undefined) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [allFavorites, postId]);

  const favorite = {
    idPost: postId,
    idUser: localUser,
  };

  const favoriteHandler = async () => {
    await axios.post(`/favorites`, favorite);
    let id = localStorage.getItem("id");
    setClicked(true);
    dispatch(getFavorites(id));       
    Swal.fire({
      icon: "success",
      title: "Favorito Agregado",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const deleteFavorite = async () => {
    await axios.delete(`/favorites`, { data: favorite });
    let id = localStorage.getItem("id");
    setClicked(false);
    dispatch(getFavorites(id));       
    Swal.fire({
      icon: "success",
      title: "Favorito eliminado",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <div>
      <div onClick={clicked ? deleteFavorite : favoriteHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={!clicked ? "none" : "currentColor"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Fav;
