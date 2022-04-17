import React from "react";
const EditProfileForm = ({
  handleSubmitEditProfile,
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
          value={inputVals.firstInputVal}
          onChange={(e) => {
            handleInputChange("firstInputVal", e);
          }}
          type="text"
          placeholder="Enter your name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className={`popup-box__input-error`}>
          {validMsg.firstInputVal || ""}
        </span>
        <input
          className="popup-box__input popup-box__input_order_second-input"
          name="about_me"
          type="text"
          placeholder="Tell as something about yourself"
          value={inputVals.secInputVal}
          onChange={(e) => {
            handleInputChange("secInputVal", e);
          }}
          minLength="2"
          maxLength="200"
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
          disabled={btnSetting.isDisable || !isValidInput}
          onClick={handleSubmitEditProfile}
        >
          {btnSetting.txt}
        </button>
      </fieldset>
    </form>
  );
};
export default EditProfileForm;
