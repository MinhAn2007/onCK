// actions/userThunks.js

import * as actions from './action';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/users');
    const data = await response.json();
    console.log('data', data);
    dispatch(actions.fetchUsersSuccess(data));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    dispatch(actions.createUserSuccess(data));
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const updateUser = (userId, updatedData) => async (dispatch) => {
  try {
    const response = await fetch(` http://localhost:3001/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    dispatch(actions.updateUserSuccess(data));
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'DELETE',
    });
    dispatch(actions.deleteUserSuccess(userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
