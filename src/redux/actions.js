import users from "../bd.json";
import axios from "axios";
import {
  GET_USERS,
  GET_USER_BY_ID,
  CLEAR_DETAIL,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_POST_BY_QUERY,
  GET_USER_BY_NAME,
  CLEAR_FILTERS,
  GET_POST_BY_TAG,
  GET_ALL_TAGS,
  GET_POST_BY_SEARCH,
  SET_CATEGORY,
  GET_FAVORITES,
  SELECT_EDIT_POST,
  DELETE_USER
} from "./types";

export const getUsers = () => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const getUserById = (id) => {
  return async function (dispatch) {
    const backData = await axios.get(`/user/${id}`);
    const user = backData.data;
    dispatch({
      type: GET_USER_BY_ID,
      payload: user,
    });
  };
};

export const getAllPosts = () => {
  return async function (dispatch) {
    const { data } = await axios.get("/post");
    dispatch({
      type: GET_ALL_POSTS,
      payload: data,
    });
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload: [],
  };
};

export const clearUser = () => {
  return{
    type: DELETE_USER,
    payload: []
  }
}

export const getPostById = (id) => {
  return async function (dispatch) {
    const backData = await axios.get(`/post/${id}`);
    const post = backData.data;
    dispatch({
      type: GET_POST_BY_ID,
      payload: post,
    });
  };
};

export const getUserByName = (name) => {
  return async function (dispatch) {
    const backData = await axios.get(`/user?username=${name}`);
    const users = backData.data;
    dispatch({
      type: GET_USER_BY_NAME,
      payload: users,
    });
  };
};

export const getPostBySearch = (search) => {
  return async function (dispatch) {
    const backData = await axios.get(`/post?search=${search}`);
    const posts = backData.data;
    dispatch({
      type: GET_POST_BY_SEARCH,
      payload: posts,
    });
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  }
}

export const getAllTags = () => {
  return async function (dispatch) {
    const backData = await axios.get("/tags");
    const tags = backData.data;
    dispatch({
      type: GET_ALL_TAGS,
      payload: tags,
    })
  }
}

export const getPostByTag = (tag) => {
  return async function (dispatch) {
    const backData = await axios.get(`/posts?tag=${tag}`);
    const posts = backData.data;
    dispatch({
      type: GET_POST_BY_TAG,
      payload: posts,
    });
  };
}

export const getPostByQuery = (query) => {
  return async function (dispatch) {
    const backData = await axios.get(query);
    const posts = backData.data;
    dispatch({
      type: GET_POST_BY_QUERY,
      payload: posts,
    });
  };
}

export const setCategory = (category) => {
  return{
    type: SET_CATEGORY,
    payload: category
  }
};

export const getFavorites = (userId) => {
  return async function (dispatch) {
    const backData = await axios.get(`/favorites/${userId}`);
    const favorites = backData.data;
    dispatch({
      type: GET_FAVORITES,
      payload: favorites,
    });
  };
}

export const selectEditPost = (post) => {
  return{
    type: SELECT_EDIT_POST,
    payload: post
  }
}

