import PopupWithForm from "./PopupWithForm.js";
import React from "react";
const ErrorPopup = ({
  formSetting,
  isOpen,
  handlePopupMouseDown,
  closePopup
}) => {
  const isValidInput = true;
const handleSubmit = (e) => {
    e.preventDefault()
    closePopup()
}
  return (
    <PopupWithForm
      handleSubmit={handleSubmit}
      formSetting={formSetting}
      isOpen={isOpen}
      closePopup={closePopup}
      handlePopupMouseDown={handlePopupMouseDown}
      isValidInput={isValidInput}
    ></PopupWithForm>
  );
};
export default ErrorPopup;
