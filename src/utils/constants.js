import {getRandomString} from "./utils";
import spinnerGif from "../images/api/spinner_svg.svg";
import errImg from "../images/api/error_svg.svg";
const formValidators = {};
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
const formSettingState = {
  init: {
    type: "init",
    heading: "Loading...",
    btnSetting: {txt: "Loading...", isDisable: true}
  },
  addItem: {
    type: "add-item",
    heading: "New place",
    btnSetting: {txt: "Create", isDisable: false}
  },
  editProfile: {
    type: "profile-edit",
    heading: "Edit profile",
    btnSetting: {txt: "Save", isDisable: false}
  },
  EditAvatar: {
    type: "change-profile-pic",
    heading: "Change profile picture",
    btnSetting: {txt: "Save", isDisable: false}
  },
  confirmRemoveOpen: {
    type: "confirm",
    heading: "Are you sure?",
    btnSetting: {txt: "Yes", isDisable: false},
    cardId: ""
  },
  imagePopup: {
    type: "img",
    title: "",
    link: ""
  }
};

export {
  formValidators,
  txtErr,
  loadingInitError,
  loadingInitState,
  formSettingState,
  errImg
};
