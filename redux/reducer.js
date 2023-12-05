// reducers/usersReducer.js

import * as types from './types';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

export default usersReducer;
