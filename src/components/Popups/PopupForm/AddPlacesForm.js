import React from "react";
const AddPlacesForm = ({
  handleSubmitAddItem,
  handleInputChange,
  inputVals,
  type,
  btnSetting,
  isValidInput,
  validMsg
}) => {
  return (
    <form name={`form_${type}`} className="popup-box__form" noValidate>
      <fieldset className="popup-box__fieldset">
        <input
          className="popup-box__input popup-box__input_order_first-input"
          onChange={(e) => {
            handleInputChange("firstInputVal", e);
          }}
          type="text"
          placeholder="Title"
          value={inputVals.firstInputVal}
          minLength="1"
          maxLength="30"
          required
        />
        <span className="popup-box__input-error">
          {validMsg.firstInputVal || ""}
        </span>
        <input
          className="popup-box__input popup-box__input_order_second-input"
          type="url"
          value={inputVals.secInputVal || ""}
          onChange={(e) => {
            handleInputChange("secInputVal", e);
          }}
          placeholder="Image link"
          required
        />
        <span className={`popup-box__input-error`}>
          {validMsg.secInputVal || ""}
        </span>
        <button
          className={`popup-box__submit-button button-modifier ${
            !isValidInput ? "popup-box__submit-button_inactive" : ""
          }`}
          type="submit"
          onClick={handleSubmitAddItem}
          disabled={btnSetting.isDisable || !isValidInput}
        >
          {btnSetting.txt || "Loading..."}
        </button>
      </fieldset>
    </form>
  );
};
export default AddPlacesForm;
