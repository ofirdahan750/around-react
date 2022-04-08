import { apiConfing } from "../utils/config.js";
const { baseUrl, headers } = apiConfing;

const _onHttpRequest = async (url, method, data) => {
  const fullUrl = `${baseUrl}${url}`;
  const res = await fetch(fullUrl, {
    method,
    headers: headers,
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};
const _getUserInfo = () => {
  return _onHttpRequest("users/me", "GET");
};
const _getInitialCards = () => {
  return _onHttpRequest("cards", "GET");
};
export const getInitInfo = () => {
  return Promise.all([_getInitialCards(), _getUserInfo()]);
};
export const setUserInfo = ({ name, about }) => {
  return _onHttpRequest("users/me", "PATCH", { name, about });
};
export const addNewCard = ({ name, link }) => {
  return _onHttpRequest("cards", "POST", { name, link });
};
export const onRemoveItem = (id) => {
  return _onHttpRequest(`cards/${id}`, "DELETE");
};
export const addItemLike = (id) => {
  return _onHttpRequest(`cards/likes/${id}`, "PUT");
};
export const removeItemLike = (id) => {
  return _onHttpRequest(`cards/likes/${id}`, "DELETE");
};
export const onUpdateProfilePic = ({ avatar }) => {
  return _onHttpRequest("users/me/avatar", "PATCH", { avatar });
};
