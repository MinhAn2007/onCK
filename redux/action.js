// actions/userActions.js

import * as types from './types';

export const fetchUsersSuccess = (users) => ({
  type: types.FETCH_USERS_SUCCESS,
  payload: users,
});

export const createUserSuccess = (user) => ({
  type: types.CREATE_USER_SUCCESS,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: types.UPDATE_USER_SUCCESS,
  payload: user,
});

export const deleteUserSuccess = (userId) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: userId,
});
