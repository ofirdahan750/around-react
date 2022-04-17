import React from "react";
import PopupWithForm from "../PopupWithFrom.js";

const EditAvatarForm = ({
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
      currType={"change-profile-pic"}
      heading={heading}
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      handlePopupMouseDown={handlePopupMouseDown}
    >
      <form name={`form_${type}`} className="popup-box__form" noValidate>
        <fieldset className="popup-box__fieldset">
          <input
            className="popup-box__input popup-box__input_order_first-input"
            name="img_link"
            type="url"
            value={inputVals.urlInput}
            placeholder="Image link"
            onChange={(e) => {
              handleInputChange("urlInput", e);
            }}
            required
          />

          <span className="popup-box__input-error">
            {validMsg.urlInput || ""}
          </span>

          <button
            className={`popup-box__submit-button button-modifier ${
              !isValidInput ? "popup-box__submit-button_inactive" : ""
            }`}
            type="submit"
            disabled={btnSetting.isDisable || !isValidInput || true}
            name="btn_change-profile-pic"
            onClick={handleSubmit}
          >
            {btnSetting.txt}
          </button>
        </fieldset>
      </form>
    </PopupWithForm>
  );
};
export default EditAvatarForm;
