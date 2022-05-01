import {apiConfing} from "./config.js";
const {baseUrl, headers} = apiConfing;

const _onHttpRequest = async (url, method, data) => {
  const fullUrl = `${baseUrl}${url}`;
  const res = await fetch(fullUrl, {
    method,
    headers: headers,
    body: JSON.stringify(data)
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
const getInitInfo = () => {
  return Promise.all([_getInitialCards(), _getUserInfo()]);
};
const setUserInfo = ({name, about}) => {
  return _onHttpRequest("users/me", "PATCH", {name, about});
};
const addNewCard = ({name, link}) => {
  return _onHttpRequest("cards", "POST", {name, link});
};
const onRemoveItem = (id) => {
  return _onHttpRequest(`cards/${id}`, "DELETE");
};
const addItemLike = (id) => {
  return _onHttpRequest(`cards/likes/${id}`, "PUT");
};
const removeItemLike = (id) => {
  return _onHttpRequest(`cards/likes/${id}`, "DELETE");
};
const onUpdateProfilePic = ({avatar}) => {
  return _onHttpRequest("users/me/avatar", "PATCH", {avatar});
};
export default {
  getInitInfo,
  setUserInfo,
  addNewCard,
  onRemoveItem,
  addItemLike,
  removeItemLike,
  onUpdateProfilePic
};
