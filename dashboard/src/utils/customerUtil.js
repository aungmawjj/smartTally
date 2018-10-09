import { getAccessToken } from './authUtil';
import fetch from 'isomorphic-fetch';
import config from '../config';

export function getListByT(townshipId) {
  const endPoint = `/townships/${townshipId}/customers?accessToken=${getAccessToken()}`;
  const options = {
    method: 'GET'
  };
  return fetch(config.baseURL + endPoint, options);
}

export function getListByRoute(routeId) {
  const endPoint = `/routes/${routeId}/customers/?accessToken=${getAccessToken()}`;
  const options = {
    method: 'GET'
  };
  return fetch(config.baseURL + endPoint, options);
}