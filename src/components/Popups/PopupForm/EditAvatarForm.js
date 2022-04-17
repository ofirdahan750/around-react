import React from "react";

const EditAvatarForm = ({
  handleInputChange,
  inputVals,
  type,
  btnSetting,
  isValidInput,
  validMsg,
  handleSubmitChangeProfilePic
}) => {
  return (
    <form name={`form_${type}`} className="popup-box__form" noValidate>
      <fieldset className="popup-box__fieldset">
        <input
          className="popup-box__input popup-box__input_order_first-input"
          name="img_link"
          type="url"
          value={inputVals.firstInputVal}
          placeholder="Image link"
          onChange={(e) => {
            handleInputChange("firstInputVal", e);
          }}
          required
        />
        <span className="popup-box__input-error">
          {validMsg.firstInputVal || ""}
        </span>
        <button
          className={`popup-box__submit-button button-modifier ${
            !isValidInput ? "popup-box__submit-button_inactive" : ""
          }`}
          type="submit"
          disabled={btnSetting.isDisable || !isValidInput}
          name="btn_change-profile-pic"
          onClick={handleSubmitChangeProfilePic}
        >
          {btnSetting.txt}
        </button>
      </fieldset>
    </form>
  );
};
export default EditAvatarForm;
