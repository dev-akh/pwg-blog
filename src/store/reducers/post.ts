import * as type from '../types';
import { PostData, PostDataList } from '../../types/Post'

export interface postStates {
  posts: PostDataList,
  loading: boolean,
  error: string | null,
  myposts: {
    page: number,
    limit: number,
    totalPages: number,
    totalPosts: number,
    data: PostData[]
  },
}
const initialState: postStates = {
  posts: {
    data: [],
    page: 1,
    limit: 9,
    totalPages: 1,
    totalPosts: 9
  },
  myposts: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalPosts: 0,
    data:[]
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
      posts: {
        ...state.posts,
        data: [],
      },
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
      posts: {
        ...state.posts,
        data: [],
      },
    };
  case type.POST_ADD:
    return {
      ...state,
      posts: {
        ...state.posts,
        totalPosts: state.posts.totalPosts + 1,
        data: [action.payload, ...state.posts.data],
      },
      myposts: {
        ...state.myposts,
        totalPosts: state.myposts.totalPosts + 1,
        data: [action.payload, ...state.myposts.data],
      },
    };
  case type.POST_REMOVE_LAST:
    return {
      ...state,
      posts: {
        ...state.posts,
        data: state.posts.data.length >= 9 ? state.posts.data.slice(0, -1) : state.posts.data,
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
        totalPosts: state.posts.totalPosts - 1,
        data: state.posts.data.filter(post => post.id !== postIdToRemove.id),
      },
      myposts: {
        ...state.myposts,
        totalPosts: state.myposts.totalPosts - 1,
        data: state.myposts.data.filter(post => post.id !== postIdToRemove.id),
      },
    };
  }
  case type.MYPOSTS:
    return {
      ...state,
      loading: true,
      error: null,
      myposts: {
        ...state.myposts,
        data: [],
      },
    };
  case type.MYPOSTS_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      myposts: action.payload,
    };
  case type.MYPOSTS_FAIL:
    return {
      ...state,
      loading: false,
      error: action.payload,
      myposts: {
        ...state.myposts,
        data: [],
      },
    };
  default:
    return state;
  }
}

export default reducer;
