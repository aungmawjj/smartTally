import fetch from 'isomorphic-fetch';
import config from '../config';

export const KEY_ACCESS_TOKEN = 'access_token';

export function getAccessToken() {
  return window.localStorage.getItem(KEY_ACCESS_TOKEN);
};

export function setAccessToken(accessToken) {
  window.localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
};

export function removeAccessToken() {
  window.localStorage.removeItem(KEY_ACCESS_TOKEN);
};

export function getLoginUser() {
  const endPoint = `/auth/LoginUser?accessToken=${getAccessToken()}`;
  const options = {
    method: 'GET'
  };
  return fetch(config.baseURL + endPoint, options);
};

export function login(login) {
  const endPoint = `/auth/login`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: `username=${login.username}&password=${login.password}`
  };
  return fetch(config.baseURL + endPoint, options);
};

export function updateProfile(loginUser) {
  const endPoint = `/users?accessToken=${getAccessToken()}`;
  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(loginUser)
  };
  return fetch(config.baseURL + endPoint, options);
};