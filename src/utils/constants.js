import {getRandomString} from "./utils";
import spinnerGif from "../images/api/spinner_svg.svg";
import errImg from "../images/api/error_svg.svg";
const txtErr = "Something went wrong, please try again later ";

const loadingInitState = {
  card: [
    {
      name: "Loading...",
      link: {spinnerGif},
      likes: [],
      _id: getRandomString(),
      owner: {_id: getRandomString()}
    }
  ],
  useInfo: {name: "Loading...", about: "Loading...", avatar: spinnerGif}
};
const loadingInitError = {
  card: [
    {
      name: txtErr,
      link: errImg,
      likes: [],
      _id: getRandomString(),
      owner: {_id: getRandomString()}
    }
  ],
  useInfo: {name: txtErr, about: txtErr, avatar: errImg}
};
const formSettingStates = {
  INIT: {
    name: "INIT",
    type: "init",
    heading: "Loading...",
    btnSetting: {txt: "Loading...", isDisable: true}
  },
  ADD_ITEM: {
    name: "ADD_ITEM",
    type: "add-item",
    heading: "New place",
    btnSetting: {txt: "Create", isDisable: false}
  },
  EDIT_PROFILE: {
    name: "EDIT_PROFILE",
    type: "profile-edit",
    heading: "Edit profile",
    btnSetting: {txt: "Save", isDisable: false}
  },
  EDIT_AVATAR: {
    name: "EDIT_AVATAR",
    type: "change-profile-pic",
    heading: "Change profile picture",
    btnSetting: {txt: "Save", isDisable: false}
  },
  REMOVE_CARD: {
    name: "REMOVE_CARD",
    type: "confirm",
    heading: "Are you sure?",
    btnSetting: {txt: "Yes", isDisable: false},
    cardId: ""
  },
  POPUP_IMAGE: {
    name: "POPUP_IMAGE",
    type: "img",
    title: "",
    btnSetting: {txt: "", isDisable: false},
    link: ""
  }
};


export {txtErr, loadingInitError, loadingInitState, formSettingStates, errImg};
