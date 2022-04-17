import React from "react";
const PopupImage = ({
  formSetting: {type, link, title},
  isPopupOpen,
  closePopup,
  errImg,
  txtErr,
  handlePopupMouseDown
}) => {
  return (
    <section
      className={`popup-box popup-box_type_img ${
        isPopupOpen && type === "img" ? "popup-box_visible" : ""
      }`}
      onMouseDown={handlePopupMouseDown}
    >
      <div className="popup-box__container popup-box__container_type_img">
        <button
          name="img"
          onClick={closePopup}
          type="button"
          className="popup-box__close-button popup-box__close-button_type_img button-modifier"
        ></button>
        <div className="popup-box__wrapper popup-box__wrapper_type_img">
          <img
            src={link || errImg}
            className="popup-box__img"
            alt={`A larger photo of: ${title || txtErr}`}
          />
          <p className="popup-box__img-title">{title || txtErr}</p>
        </div>
      </div>
    </section>
  );
};
export default PopupImage;
