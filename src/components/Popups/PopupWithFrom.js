import React, {useState} from "react";
import {AddPlacesForm} from "./PopupForm/AddPlacesForm.js";
import {EditProfileForm} from "./PopupForm/EditProfileForm.js";
import {EditAvatarForm} from "./PopupForm/EditAvatarForm.js";

export const PopupWithForm = ({
  txtErr,
  handlePopupMouseDown,
  formSetting: {type, btnSetting, heading},
  inputVals,
  onChangeInput,
  closePopup,
  handleSubmitAddItem,
  handleSubmitChangeProfilePic,
  handleSubmitEditProfile,
  setClassVisible,
  isPopupOpen,
  handleSubmitRemoveCard
}) => {
  const setInputElem = () => {
    switch (type) {
      case "add-item":
        return (
          <AddPlacesForm
            handleSubmitAddItem={handleSubmitAddItem}
            inputVals={inputVals}
            onChangeInput={onChangeInput}
            btnSetting={btnSetting}
            type={type}
          />
        );
      case "profile-edit":
        return (
          <EditProfileForm
            handleSubmitEditProfile={handleSubmitEditProfile}
            inputVals={inputVals}
            onChangeInput={onChangeInput}
            btnSetting={btnSetting}
            type={type}
          />
        );
      case "change-profile-pic":
        return (
          <EditAvatarForm
            handleSubmitChangeProfilePic={handleSubmitChangeProfilePic}
            inputVals={inputVals}
            onChangeInput={onChangeInput}
            btnSetting={btnSetting}
            type={type}
          />
        );
      case "confirm":
        return (
          <fieldset className="popup-box__fieldset">
            <button
              className="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
              type="click"
              disabled={btnSetting.isDisable}
              onClick={handleSubmitRemoveCard}
              name="btn_confirm"
            >
              {btnSetting.txt}
            </button>
          </fieldset>
        );

      case "init":
        return <div>Loading...</div>;
        break;

      default:
        return <div>{txtErr}</div>;
    }
  };
  return (
    <div
      className={`popup-box popup-box_type_${type} ${
        isPopupOpen && type !== "img" ? "popup-box_visible" : ""
      }`}
      onMouseDown={handlePopupMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="popup-box__container">
        <button
          type="button"
          className="popup-box__close-button button-modifier"
          onClick={closePopup}
        ></button>
        <div className="popup-box__wrapper">
          <h2 className="popup-box__heading">{heading}</h2>
          {setInputElem()}
        </div>
      </div>
    </div>
  );
};
