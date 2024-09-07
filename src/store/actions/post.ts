
import { Dispatch } from 'redux';
import * as type from '../types';
import * as api from '../../services/api'
import axios from 'axios';
import { PostData } from '../../types/Post';

export const fetchPosts = ({ limit, page }: { limit: number, page: number }) => async (dispatch: Dispatch) => {

  dispatch({
    type: type.POST,
  });

  const endpoint = api.API_ENDPOINTS.POSTS;
  try {
    const response = await api.get(endpoint, { limit: limit, page: page });
    dispatch({
      type: type.POST_SUCCESS,
      payload: response,
    });
  } catch (error: unknown) {
    let errorMessage = 'Error in fetching posts data';
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.error || 'Invalid token'
      }
    }
    dispatch({
      type: type.POST_FAIL,
      payload: errorMessage
    });
  }
};


export const fetchMyPosts = ({ limit, page, admin}: { limit: number, page: number, admin: boolean }) => async (dispatch: Dispatch) => {

  dispatch({
    type: type.MYPOSTS,
  });

  const endpoint = api.API_ENDPOINTS.MY_POSTS;
  try {
    const response = await api.post(endpoint,{ limit: limit, page: page });
    dispatch({
      type: type.MYPOSTS_SUCCESS,
      payload: response,
    });
    if(!admin){
      dispatch({
        type: type.POST_SUCCESS,
        payload: response,
      });
    }
  } catch (error: unknown) {
    let errorMessage = 'Error in fetching myposts data';
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.error || 'Invalid token'
      }
    }
    dispatch({
      type: type.MYPOSTS_FAIL,
      payload: errorMessage
    });
    if(!admin){
      dispatch({
        type: type.POST_FAIL,
        payload: errorMessage
      });
    }
  }
};

export const addPost = (post: PostData) => ({
  type: type.POST_ADD,
  payload: post,
});

export const updatePost = (post: PostData) => ({
  type: type.POST_UPDATE,
  payload: post,
});

export const removeLastPost = () => ({
  type: type.POST_REMOVE_LAST,
});

export const removePost = (post: PostData) => ({
  type: type.POST_REMOVE,
  payload: post,
});
