import PopupWithForm from "./PopupWithFrom.js";
import React, {useEffect, useState} from "react";
const AddPlacePopup = ({
  onSetVaildMsg,
  isOpen,
  formSetting,
  handlePopupMouseDown,
  isValidInput,
  closeAllPopup,
  validMsg,
  handleSubmitAddItem,
  handleMsgVaild
}) => {
  const [imgTitle, setImgTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    //Set input vals
    setImgTitle("");
    setImgSrc("");
  }, [isOpen]);

  useEffect(() => {
    handleMsgVaild({imgTitle, imgSrc});
  }, [imgTitle, imgSrc]);
  const handleSubmit = (e) => {
    handleSubmitAddItem(e, {imgTitle, imgSrc});
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      formSetting={formSetting}
      handlePopupMouseDown={handlePopupMouseDown}
      isValidInput={isValidInput}
      closeAllPopup={closeAllPopup}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup-box__input popup-box__input_order_first-input"
        onChange={(e) => {
          setImgTitle(e.target.value);
          onSetVaildMsg("titleInput", e.target.validationMessage);
        }}
        type="text"
        placeholder="Title"
        value={imgTitle || ""}
        minLength="1"
        maxLength="30"
        required
      />
      <span className="popup-box__input-error">
        {validMsg.titleInput || ""}
      </span>
      <input
        className="popup-box__input popup-box__input_order_second-input"
        type="url"
        value={imgSrc || ""}
        onChange={(e) => {
          setImgSrc(e.target.value);
          onSetVaildMsg("urlInput", e.target.validationMessage);
        }}
        placeholder="Image link"
        required
      />
      <span className={`popup-box__input-error`}>
        {validMsg.urlInput || ""}
      </span>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
