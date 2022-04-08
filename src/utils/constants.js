import { getRandomString } from "./utils";
import spinnerGif from "../images/api/spinner_svg.svg";
import errImg from "../images/api/error_svg.svg";
const formValidators = {};
const txtErr = "Something went wrong, please try again later ";

const loadingState = {
  card: [
    {
      name: "Loading...",
      link: { spinnerGif },
      likes: [],
      _id: getRandomString(),
      owner: { _id: getRandomString() },
    },
  ],
  useInfo: { name: "Loading...", about: "Loading...", avatar: spinnerGif },
};
const loadingError = {
  card: [
    {
      name: txtErr,
      link: errImg ,
      likes: [],
      _id: getRandomString(),
      owner: { _id: getRandomString() },
    },
  ],
  useInfo: { name: txtErr, about: txtErr, avatar: errImg },
};

export { formValidators, txtErr, loadingError, loadingState };
