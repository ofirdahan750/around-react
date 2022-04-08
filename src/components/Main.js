import spinnerGif from "../images/api/spinner_svg.svg";
import profilePicBtnSvg from "../images/profile/profile__pic-edit.svg";
import profileAddBtnSvg from "../images/profile/profile__button-plus.svg";
import profileEditBtnSvg from "../images/profile/profile__button-edit.svg";
import { PopupWithForm } from "./PopupWithFrom.js";
import { Cards } from "./Cards.js";
import React, { useEffect, useState } from "react";
import { loadingState, loadingError } from "../utils/constants.js";
import {
  addItemLike,
  addNewCard,
  getInitInfo,
  removeItemLike,
} from "../utils/Api";

export const Main = () => {
  const [popupOpenName, setNamePopupOpen] = useState("");
  const [cards, setCards] = useState(loadingState.card);
  const [userInfo, setUserInfo] = useState(loadingState.useInfo);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getInitInfo()
      .then(([cardItemsArr, userInfoRes]) => {
        setLoading(false);
        setCards(cardItemsArr);
        setUserInfo(userInfoRes);
      })
      .catch((err) => {
        console.log(err);
        setCards(loadingError.card);
        setUserInfo(loadingError.useInfo);
      });
  }, []);

  const closePopup = () => {
    setNamePopupOpen("");
    document.removeEventListener("keydown", handleEscClose);
  };
  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      closePopup(popupOpenName);
    }
  };

  const openPopup = (clickedPopUp) => {
    if (isLoading) return;
    setNamePopupOpen(clickedPopUp);
    document.addEventListener("keydown", handleEscClose);
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
  const setClassVisible = (currPopup) => {
    return popupOpenName === currPopup ? "popup-box_visible" : "";
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
                />
              );
            })}
          </ul>
        </section>
      </main>
      <PopupWithForm
        editProfileClass={setClassVisible("editProfileOpen")}
        addProfileClass={setClassVisible("addProfileOpen")}
        editAvatarClass={setClassVisible("editAvatarOpen")}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
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
      {/* <!-- Popup Confirm --> */}
      <section className="popup-box popup-box_type_confirm">
        <div className="popup-box__container">
          <button
            type="button"
            className="popup-box__close-button popup-box__close-button_type_delete-confirm button-modifier"
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">Are you sure?</h2>
            <fieldset className="popup-box__fieldset">
              <button
                className="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
                type="click"
                name="btn_confirm"
              >
                Yes
              </button>
            </fieldset>
          </div>
        </div>
      </section>
    </>
  );
};
