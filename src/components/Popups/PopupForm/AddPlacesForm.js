import React from "react";
import PopupWithForm from "../PopupWithFrom.js";
const AddPlacesForm = ({
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
  console.log('handleSubmit:', handleSubmit)
  return (
    <PopupWithForm
      type={type}
      currType={"add-item"}
      heading={heading}
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      handlePopupMouseDown={handlePopupMouseDown}
    >
      <form name={`form_${type}`} className="popup-box__form" noValidate>
        <fieldset className="popup-box__fieldset">
          <input
            className="popup-box__input popup-box__input_order_first-input"
            onChange={(e) => {
              handleInputChange("titleInput", e);
            }}
            type="text"
            placeholder="Title"
            value={inputVals.titleInput}
            minLength="1"
            maxLength="30"
            required
          />
          <span className="popup-box__input-error">
            {validMsg.titleInput || ""}
          </span>
          <input
            className="popup-box__input popup-box__input_order_second-input"
            type="url"
            value={inputVals.urlInput || ""}
            onChange={(e) => {
              handleInputChange("urlInput", e);
            }}
            placeholder="Image link"
            required
          />
          <span className={`popup-box__input-error`}>
            {validMsg.urlInput || ""}
          </span>
          <button
            className={`popup-box__submit-button button-modifier ${
              !isValidInput ? "popup-box__submit-button_inactive" : ""
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={btnSetting?.isDisable || !isValidInput }
          >
            {btnSetting.txt || "Loading..."}
          </button>
        </fieldset>
      </form>
    </PopupWithForm>
  );
};
export default AddPlacesForm;
