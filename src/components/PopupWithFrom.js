import React from "react";
const PopupWithForm = ({
  children,
  handleSubmit,
  formSetting: {type, btnSetting, heading},
  handlePopupMouseDown,
  isOpen,
  isValidInput,
  closeAllPopup
}) => {
  return (
    <div
      className={`popup-box popup-box_type_${isOpen ? type : ""} ${
        isOpen ? "popup-box_visible" : ""
      }`}
      onMouseDown={handlePopupMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="popup-box__container">
        <button
          type="button"
          className="popup-box__close-button button-modifier"
          onClick={closeAllPopup}
        ></button>
        <div className="popup-box__wrapper">
          <h2 className="popup-box__heading">{heading}</h2>
          <form className="popup-box__form" noValidate onSubmit={handleSubmit}>
            <fieldset className="popup-box__fieldset">
              {children}
              <button
                className={`popup-box__submit-button button-modifier ${
                  type === "confirm"
                    ? "popup-box__submit-button_type_delete-confirm"
                    : ""
                } ${!isValidInput ? "popup-box__submit-button_inactive" : ""}`}
                type="submit"
                disabled={btnSetting.isDisable || !isValidInput}
              >
                {btnSetting.txt || "Loading..."}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PopupWithForm;
