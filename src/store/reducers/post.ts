import * as type from '../types';
import { PostDataList } from '../../types/Post'

export interface postStates {
  posts: PostDataList,
  loading: boolean,
  error: string | null,
}
const initialState: postStates = {
  posts: {
    data: [],
    page: 1,
    limit: 9,
    totalPages: 1,
    totalPosts: 9
  },
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: { type: string, payload: JSON }) => {
  switch (action.type) {
  case type.POST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case type.POST_SUCCESS:
    return {
      ...state,
      loading: false,
      posts: action.payload,
    };
  case type.POST_FAIL:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default reducer;
