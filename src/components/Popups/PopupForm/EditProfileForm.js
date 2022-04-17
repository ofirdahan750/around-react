import React from "react";
import PopupWithForm from "../PopupWithFrom.js";

const EditProfileForm = ({
  handleSubmit,
  formSetting: {type, btnSetting, heading},
  isPopupOpen,
  closePopup,
  handlePopupMouseDown,
  validMsg,
  isValidInput,
  inputVals,
  handleInputChange
}) => {
  return (
    <PopupWithForm
      type={type}
      currType={"profile-edit"}
      heading={heading}
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      handlePopupMouseDown={handlePopupMouseDown}
    >
      <form name={`form_${type}`} className="popup-box__form" noValidate>
        <fieldset className="popup-box__fieldset">
          <input
            className="popup-box__input popup-box__input_order_first-input"
            value={inputVals.nameInput}
            onChange={(e) => {
              handleInputChange("nameInput", e);
            }}
            type="text"
            placeholder="Enter your name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className={`popup-box__input-error`}>
            {validMsg.nameInput || ""}
          </span>
          <input
            className="popup-box__input popup-box__input_order_second-input"
            name="about_me"
            type="text"
            placeholder="Tell as something about yourself"
            value={inputVals.aboutInput}
            onChange={(e) => {
              handleInputChange("aboutInput", e);
            }}
            minLength="2"
            maxLength="200"
            required
          />
          <span className={`popup-box__input-error`}>
            {validMsg.aboutInput || ""}
          </span>
          <button
            className={`popup-box__submit-button button-modifier ${
              !isValidInput ? "popup-box__submit-button_inactive" : ""
            }`}
            type="submit"
            disabled={btnSetting.isDisable || !isValidInput}
            onClick={handleSubmit}
          >
            {btnSetting.txt}
          </button>
        </fieldset>
      </form>
    </PopupWithForm>
  );
};
export default EditProfileForm;
