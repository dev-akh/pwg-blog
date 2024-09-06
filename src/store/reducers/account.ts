import { UserAccount } from '../../types/User';
import * as type from '../types';

export interface accountState {
  user: UserAccount,
  accounts: UserAccount[],
  loading: boolean,
  error: string | null,
}
const initialState: accountState = {
  user: {
    userId: '',
    username: '',
    email: '',
    role:'',
  },
  accounts: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: { type: string, payload: JSON }) => {
  switch (action.type) {
  case type.ACCOUNTS:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case type.ACCOUNT_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      accounts: action.payload,
    };
  case type.ACCOUNT_FAIL:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case type.USER:
    return {
      ...state,
      loading: false,
      user: action.payload,
    };
  default:
    return state;
  }
}

export default reducer;
