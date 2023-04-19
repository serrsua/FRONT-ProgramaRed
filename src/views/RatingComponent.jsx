import ReactStars from "react-stars";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Rating = ({ postId }) => {
  const [rating, setRating] = useState(0);
  const [dataRating, setDataRating] = useState({});
  let data;
  let userId = localStorage.getItem("id");

  useEffect(() => {
    postId && getRatingByIdPost(postId);
  }, [postId]);

  const getRatingByIdPost = async (postId) => {
    data = await axios.get(`/post/${postId}`);
    setDataRating(data.data.Ratings);
    let votes = data.data.Ratings.length;
    let rating = 0;
    data.data.Ratings.length > 0 &&
      data.data.Ratings.map((points, i) => {
        rating = rating + points.vote;
      });
    rating = Math.round(rating / votes);
    setRating(rating);
  };

  const ratingChanged = async (newRating) => {
    try {
      let alreadyVoted = dataRating.find(
        (rated) => rated.UserId === Number(userId)
      );
      if (alreadyVoted !== undefined)
        throw new Error("Ya calificaste este post");
      const response = await axios.post("/rating", {
        postId,
        userId,
        vote: newRating,
      });
      getRatingByIdPost(postId);
      Swal.fire({
        icon: "success",
        text: response.data,
        showConfirmButton: false,
        timer: 1600,
      });
    } catch (error) {
      getRatingByIdPost(postId);
      Swal.fire({
        icon: "warning",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <ReactStars
        value={rating}
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={"#ffd700"}
        half={false}
        changeRating={false}
      />
    </div>
  );
};

export default Rating;
