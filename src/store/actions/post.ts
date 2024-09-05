
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

export const addPost = (post: PostData) => ({
  type: type.POST_ADD,
  payload: post,
});

export const updatePost = (post: PostData) => ({
  type: type.POST_UPDATE,
  payload: post,
});

export const removeLastPost = () => ({
  type: type.POST_REMOVE,
});
