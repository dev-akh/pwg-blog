import { Dispatch } from 'redux';
import * as type from '../types';
import * as api from '../../services/api'
import axios from 'axios';
import { UserAccount } from '../../types/User';

export const fetchAccounts = () => async (dispatch: Dispatch) => {
  dispatch({
    type: type.ACCOUNTS,
  });

  const endpoint = api.API_ENDPOINTS.ACCOUNTS;
  try {
    const response = await api.get(endpoint);
    dispatch({
      type: type.ACCOUNT_SUCCESS,
      payload: response.accounts,
    });
  } catch (error: unknown) {
    let errorMessage = 'Error in fetching accounts data';
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.error || 'Invalid token'
      }
    }
    dispatch({
      type: type.ACCOUNT_FAIL,
      payload: errorMessage
    });
  }
};

export const fetchMyPosts = () => async (dispatch: Dispatch) => {

  dispatch({
    type: type.MYPOSTS,
  });

  const endpoint = api.API_ENDPOINTS.MY_POSTS;
  try {
    const response = await api.post(endpoint,{
      limit:10,
      page:1
    });
    dispatch({
      type: type.MYPOSTS_SUCCESS,
      payload: response,
    });
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
  }
};

export const addUser = (user: UserAccount) => ({
  type: type.USER,
  payload: user,
});
