import React from "react";
import PopupWithForm from "../PopupWithFrom.js";
const ConfirmForm = ({
  handleSubmit,
  formSetting: {type, btnSetting, heading},
  isPopupOpen,
  closePopup,
  handlePopupMouseDown
}) => {
  return (
    <PopupWithForm
      type={type}
      currType={"confirm"}
      heading={heading}
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      handlePopupMouseDown={handlePopupMouseDown}
    >
      <fieldset className="popup-box__fieldset">
        <button
          className="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
          type="click"
          disabled={btnSetting.isDisable}
          onClick={handleSubmit}
          name="btn_confirm"
        >
          {btnSetting.txt}
        </button>
      </fieldset>
    </PopupWithForm>
  );
};
export default ConfirmForm;
