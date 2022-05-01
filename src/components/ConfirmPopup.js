import PopupWithForm from "./PopupWithForm.js";
import React from "react";
const ConfirmPopup = ({
  handleSubmitRemoveCard,
  formSetting,
  isOpen,
  handlePopupMouseDown,
  closePopup
}) => {
  const isValidInput = true;
  return (
    <PopupWithForm
      handleSubmit={handleSubmitRemoveCard}
      formSetting={formSetting}
      isOpen={isOpen}
      closePopup={closePopup}
      handlePopupMouseDown={handlePopupMouseDown}
      isValidInput={isValidInput}
    ></PopupWithForm>
  );
};
export default ConfirmPopup;
