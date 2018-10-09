import QueryString from 'query-string';
import { getAccessToken } from './authUtil';
import fetch from 'isomorphic-fetch';
import config from '../config';

export function getList(modelName, filter = {}) {
  filter.accessToken = getAccessToken();
  const query = QueryString.stringify(filter);
  const endPoint = `/${modelName}s/?${query}`;
  const options = {
    method: 'GET'
  };
  return fetch(config.baseURL + endPoint, options);
}

export function getById(modelName, _id) {
  const endPoint = `/${modelName}s/${_id}?accessToken=${getAccessToken()}`;
  const options = {
    method: 'GET'
  };
  return fetch(config.baseURL + endPoint, options);
}

export function create(modelName, model) {
  const endPoint = `/${modelName}s?accessToken=${getAccessToken()}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(model),
  };
  return fetch(config.baseURL + endPoint, options);
}

export function update(modelName, model) {
  const endPoint = `/${modelName}s/${model._id}?accessToken=${getAccessToken()}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(model),
  };
  return fetch(config.baseURL + endPoint, options);
}

export function _delete(modelName, _id) {
  const endPoint = `/${modelName}s/${_id}?accessToken=${getAccessToken()}`;
  const options = {
    method: 'DELETE'
  };
  return fetch(config.baseURL + endPoint, options);
}