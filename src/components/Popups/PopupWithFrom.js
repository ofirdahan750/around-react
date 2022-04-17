import React from "react";
const PopupWithForm = ({
  children,
  type,
  heading,
  isPopupOpen,
  closePopup,
  handlePopupMouseDown,
  currType
}) => {
  const ifThisForm = type === currType && isPopupOpen && type !== "img";
  return (
    <div
      className={`popup-box popup-box_type${ifThisForm ? `_${type}` : ""}${
        ifThisForm ? " popup-box_visible" : ""
      }`}
      onMouseDown={handlePopupMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="popup-box__container">
        <button
          type="button"
          className="popup-box__close-button button-modifier"
          onClick={closePopup}
        ></button>
        <div className="popup-box__wrapper">
          <h2 className="popup-box__heading">{heading}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};
export default PopupWithForm;
