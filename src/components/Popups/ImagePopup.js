import React from "react";
const ImagePopup = ({
  selectedCard: {name, link, isOpen},
  closeAllPopup,
  handlePopupMouseDown,
  errImg,
  txtErr
}) => {
  return (
    <section
      className={`popup-box popup-box_type_img ${
        isOpen ? "popup-box_visible" : ""
      }`}
      onMouseDown={handlePopupMouseDown}
    >
      <div className="popup-box__container popup-box__container_type_img">
        <button
          name="img"
          onClick={closeAllPopup}
          type="button"
          className="popup-box__close-button popup-box__close-button_type_img button-modifier"
        ></button>
        <div className="popup-box__wrapper popup-box__wrapper_type_img">
          <img
            src={link || errImg}
            className="popup-box__img"
            alt={`A larger photo of: ${name || txtErr}`}
          />
          <p className="popup-box__img-title">{name || txtErr}</p>
        </div>
      </div>
    </section>
  );
};
export default ImagePopup;
