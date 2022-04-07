import spinnerGif from "../images/profile/spinner_svg.svg";
import profilePicBtnSvg from "../images/profile/profile__pic-edit.svg";
import profileAddBtnSvg from "../images/profile/profile__button-plus.svg";
import profileEditBtnSvg from "../images/profile/profile__button-edit.svg";
import { PopupWithForm } from "./PopupWithFrom.js";
import React, { useState } from "react";

export const Main = () => {
  const [popupOpenName, setNamePopupOpen] = useState("");

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
    setNamePopupOpen(clickedPopUp);
    document.addEventListener("keydown", handleEscClose);
  };

  const setClassVisible = (currPopup) => {
    return popupOpenName === currPopup ? "popup-box_visible" : "";
  };
  return (
    <>
      <main className="main">
        <section className="profile">
          <div
            className="profile__avatar-cover"
            style={{ backgroundImage: `url(${spinnerGif})` }}
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
            <h1 className="profile__name">Loading...</h1>
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
            <p className="profile__about-me">Loading...</p>
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
          <ul className="places__grid-container"></ul>
        </section>
      </main>
      <PopupWithForm
        editProfileClass={setClassVisible("editProfileOpen")}
        addProfileClass={setClassVisible("addProfileOpen")}
        editAvatarClass={setClassVisible("editAvatarOpen")}
        closePopup={closePopup}
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
