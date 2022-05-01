import apiConfing from "./config.js";
class Api {
  constructor() {
    this._headers = apiConfing.headers;
    this._baseUrl = apiConfing.baseUrl;
  }
  _onHttpRequest = async (url, method, data) => {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method,
      headers: this._headers,
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };
  _getUserInfo = () => {
    return this._onHttpRequest("users/me", "GET");
  };
  _getInitialCards = () => {
    return this._onHttpRequest("cards", "GET");
  };
  getInitInfo = () => {
    return Promise.all([this._getInitialCards(), this._getUserInfo()]);
  };
  setUserInfo = ({name, about}) => {
    return this._onHttpRequest("users/me", "PATCH", {name, about});
  };
  addNewCard = ({name, link}) => {
    return this._onHttpRequest("cards", "POST", {name, link});
  };
  onRemoveItem = (id) => {
    return this._onHttpRequest(`cards/${id}`, "DELETE");
  };
  addItemLike = (id) => {
    return this._onHttpRequest(`cards/likes/${id}`, "PUT");
  };
  removeItemLike = (id) => {
    return this._onHttpRequest(`cards/likes/${id}`, "DELETE");
  };
  onUpdateProfilePic = ({avatar}) => {
    return this._onHttpRequest("users/me/avatar", "PATCH", {avatar});
  };
}
const api = new Api();

export default api;
