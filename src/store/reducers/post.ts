import * as type from '../types';
import { PostData, PostDataList } from '../../types/Post'

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
  case type.POST_ADD:
    return {
      ...state,
      posts: {
        ...state.posts,
        data: [action.payload, ...state.posts.data],
      },
    };
  case type.POST_REMOVE_LAST:
    return {
      ...state,
      posts: {
        ...state.posts,
        data: state.posts.data.slice(0, -1),
      },
    };
  case type.POST_UPDATE:
    const payload = action.payload as unknown as PostData;
    return {
      ...state,
      posts: {
        ...state.posts,
        data: state.posts.data.map(post =>
          post.id === payload.id ? action.payload : post
        ),
      },
    };
  case type.POST_REMOVE: {
    const postIdToRemove = action.payload as unknown as PostData;
    return {
      ...state,
      posts: {
        ...state.posts,
        data: state.posts.data.filter(post => post.id !== postIdToRemove.id),
      },
    };
  }
  default:
    return state;
  }
}

export default reducer;
