import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => dispatch => {
  axios.post('http://localhost:3090/signup', formProps)
    .then(response => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token
      });
      localStorage.setItem('token', response.data.token);
      callback();
    }).catch(e => dispatch({
      type: AUTH_ERROR,
      payload: 'Email in use'
    }))
};

export const signin = (formProps, callback) => dispatch => {
  axios.post('http://localhost:3090/signin', formProps)
    .then(response => {
      //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
      console.log("client, login: " + JSON.stringify(response, null, 5))
      dispatch({
        type: AUTH_USER,
        payload: response.data.token
      });
      localStorage.setItem('token', response.data.token);
      callback();
    }).catch(e => dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login credentials'
    }))
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
