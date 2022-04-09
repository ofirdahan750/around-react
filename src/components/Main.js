import spinnerGif from "../images/api/spinner_svg.svg";
import profilePicBtnSvg from "../images/profile/profile__pic-edit.svg";
import profileAddBtnSvg from "../images/profile/profile__button-plus.svg";
import profileEditBtnSvg from "../images/profile/profile__button-edit.svg";
import { PopupWithForm } from "./PopupWithFrom.js";
import { Cards } from "./Cards.js";
import React, { useEffect, useState } from "react";
import { loadingState, loadingError, txtErr } from "../utils/constants.js";
import {
  addItemLike,
  addNewCard,
  getInitInfo,
  onRemoveItem,
  onUpdateProfilePic,
  removeItemLike,
  setUserInfo,
} from "../utils/Api";

export const Main = () => {
  const [popupOpenName, setNamePopupOpen] = useState("");
  const [cards, setCards] = useState(loadingState.card);
  const [userInfo, setUserStateInfo] = useState(loadingState.useInfo);
  const [isLoading, setLoading] = useState(true);
  const [inputVal, setInputVal] = useState({
    firstInputVal: "",
    secInputVal: "",
  });
  const [btnSetting, setBtnSetting] = useState({ btnTxt: "", isDisable: true });
  const [removeCardId, setRemoveCardId] = useState("");

  useEffect(() => {
    //Init only
    setLoading(true);
    getInitInfo()
      .then(([cardItemsArr, userInfoRes]) => {
        setLoading(false);
        setCards(cardItemsArr);
        setUserStateInfo(userInfoRes);
      })
      .catch((err) => {
        console.log(err);
        setCards(loadingError.card);
        setUserStateInfo(loadingError.useInfo);
      });
  }, []);

  useEffect(() => {
    //Change popup button txt and set value while open
    switch (popupOpenName) {
      case "editProfileOpen":
        setInputVal({
          firstInputVal: userInfo.name,
          secInputVal: userInfo.about,
        });
        setBtnSetting({ btnTxt: "Save", isDisable: false });
        break;
      case "addProfileOpen":
        setBtnSetting({ btnTxt: "Create", isDisable: false });
        break;
      case "editAvatarOpen":
        setBtnSetting({ btnTxt: "Save", isDisable: false });
        break;
      case "confirmRemoveOpen":
        setBtnSetting({ btnTxt: "Yes", isDisable: false });
        break;
      default:
        setBtnSetting({ btnTxt: "Closing...", isDisable: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupOpenName]);

  const closePopup = () => {
    setNamePopupOpen("");
    document.removeEventListener("keydown", handleEscClose);
  };
  const openPopup = (clickedPopUp) => {
    if (isLoading) return;
    setNamePopupOpen(clickedPopUp);
    document.addEventListener("keydown", handleEscClose);
  };
  const onHandleErrorSubmit = ({ error, initialBtnTxt = "Save" }) => {
    console.log(`Error: ${error}`);
    setBtnSetting({ btnTxt: txtErr, isDisable: true });
    setTimeout(() => {
      setBtnSetting({ btnTxt: initialBtnTxt, isDisable: false });
    }, 1100);
  };
  const handleSubmitAddItem = (e) => {
    e.preventDefault();
    setBtnSetting({ btnTxt: "Saving....", isDisable: true });
    addNewCard({ name: inputVal.firstInputVal, link: inputVal.secInputVal })
      .then((res) => {
        setBtnSetting({
          btnTxt: "Place added successfully!",
          isDisable: true,
        });
        setCards((prevState) => [res, ...prevState]);
        setTimeout(() => {
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleErrorSubmit({ error: err, initialBtnTxt: "Create" });
      });
  };
  const handleSubmitChangeProfilePic = (e) => {
    e.preventDefault();
    setBtnSetting({ btnTxt: "Saving....", isDisable: true });
    onUpdateProfilePic({ avatar: inputVal.firstInputVal })
      .then(() => {
        setBtnSetting({
          btnTxt: "Profile Picture modified successfully!",
          isDisable: true,
        });
        const avatar = "avatar";
        setUserStateInfo((prevState) => ({
          ...prevState,
          [avatar]: inputVal.firstInputVal,
        }));
        setTimeout(() => {
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleErrorSubmit({ error: err });
      });
  };
  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    setBtnSetting({ btnTxt: "Saving....", isDisable: true });
    setUserInfo({ name: inputVal.firstInputVal, about: inputVal.secInputVal })
      .then((res) => {
        setBtnSetting({
          btnTxt: "Profile edited successfully!",
          isDisable: true,
        });
        setUserStateInfo(res);
        setTimeout(() => {
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleErrorSubmit({ error: err });
      });
  };
  const handleSubmitRemoveCard = (e) => {
    e.preventDefault();
    setBtnSetting({ btnTxt: "Saving....", isDisable: true });
    onRemoveItem(removeCardId)
      .then(() => {
        setBtnSetting({
          btnTxt: "Place removed successfully!",
          isDisable: true,
        });
        setCards(cards.filter((item) => item._id !== removeCardId));
        setRemoveCardId("");
        setTimeout(() => {
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleErrorSubmit({ error: err, initialBtnTxt: "Yes" });
      });
  };
  const setClassVisible = (currPopup) => {
    return popupOpenName === currPopup ? "popup-box_visible" : "";
  };
  const handlePopupMouseDown = (e) => {
    const contextMenu = 2;
    if (e.button === contextMenu) return;
    if (
      e.target.classList.contains("popup-box_visible") ||
      e.target.classList.contains("popup-box__close-button")
    ) {
      closePopup();
    }
  };
  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      closePopup(popupOpenName);
    }
  };

  const handleToggleLikedBtn = (isLiked, id) => {
    if (isLoading) return;
    if (!isLiked) {
      addItemLike(id).then((res) => {
        const newState = [...cards];
        newState.find((item) => item._id === id).likes = res.likes;
        setCards(newState);
      });
    } else {
      removeItemLike(id).then((res) => {
        const newState = [...cards];
        newState.find((item) => item._id === id).likes = res.likes;
        setCards(newState);
      });
    }
  };

  const onChangeInput = (changedValName, inputTxtVAL) => {
    setInputVal((prevState) => ({
      ...prevState,
      [changedValName]: inputTxtVAL,
    }));
  };

  return (
    <>
      <main className="main">
        <section className="profile">
          <div
            className="profile__avatar-cover"
            style={{ backgroundImage: `url(${userInfo.avatar || spinnerGif})` }}
            onClick={() => openPopup("editAvatarOpen")}
          >
            <button
              className="profile__avatar-btn button-modifier"
              alt="Avatar user photo"
            >
              <img
                src={profilePicBtnSvg}
                alt="Edit profile PIC pencil button"
                className="profile__avatar-btn-img"
              />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userInfo.name || "Loading..."}</h1>
            <button
              type="button"
              className="profile__edit-btn-cover button-modifier"
              onClick={() => openPopup("editProfileOpen")}
            >
              <img
                src={profileEditBtnSvg}
                className="profile__edit-btn"
                alt="Edit profile button"
              />
            </button>
            <p className="profile__about-me">
              {userInfo.about || "Loading..."}
            </p>
          </div>
          <button
            type="button"
            className="profile__add-btn-cover button-modifier"
            onClick={() => openPopup("addProfileOpen")}
          >
            <img
              src={profileAddBtnSvg}
              className="profile__add-btn"
              alt="Edit profile button"
            />
          </button>
        </section>
        <section className="places">
          <ul className="places__grid-container">
            {cards.map((card) => {
              return (
                <Cards
                  card={card}
                  key={card._id}
                  userId={userInfo._id}
                  spinnerGif={spinnerGif}
                  handleToggleLikedBtn={handleToggleLikedBtn}
                  openPopup={openPopup}
                  setRemoveCardId={setRemoveCardId}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <PopupWithForm
        popupClass={{
          editProfileClass: setClassVisible("editProfileOpen"),
          addProfileClass: setClassVisible("addProfileOpen"),
          editAvatarClass: setClassVisible("editAvatarOpen"),
          confirmRemoveClass: setClassVisible("confirmRemoveOpen"),
        }}
        handleSubmit={{
          handleSubmitEditProfile,
          handleSubmitAddItem,
          handleSubmitChangeProfilePic,
          handleSubmitRemoveCard,
        }}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
        userOpenInfo={inputVal}
        onChangeInput={onChangeInput}
        btnSetting={btnSetting}
      />

      {/* <!-- Popup Img --> */}
      <section className="popup-box popup-box_type_img">
        <div className="popup-box__container popup-box__container_type_img">
          <button
            name="img"
            type="button"
            className="popup-box__close-button popup-box__close-button_type_img button-modifier"
          ></button>
          <div className="popup-box__wrapper popup-box__wrapper_type_img">
            <img
              src="."
              className="popup-box__img"
              alt="Round circle while Loading all cards"
            />
            <p className="popup-box__img-title"></p>
          </div>
        </div>
      </section>
    </>
  );
};
