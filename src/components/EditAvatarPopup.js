import PopupWithForm from "./PopupWithForm.js";
import React, {useEffect, useRef} from "react";
const EditAvatarPopup = ({
  handleSubmitChangeProfilePic,
  formSetting,
  closeAllPopup,
  isValidInput,
  onSetVaildMsg,
  handleMsgVaild,
  handlePopupMouseDown,
  isOpen,
  validMsg
}) => {
  const currInput = useRef("");
  useEffect(() => {
    currInput.current.value = "";
  }, [isOpen]);
  const handleSubmit = (e) => {
    handleSubmitChangeProfilePic(e, currInput.current.value);
  };
  useEffect(() => {
    handleMsgVaild({val: currInput.current.value});
  }, [currInput.current.value]);
  return (
    <PopupWithForm
      handleSubmit={handleSubmit}
      handlePopupMouseDown={handlePopupMouseDown}
      formSetting={formSetting}
      isOpen={isOpen}
      isValidInput={isValidInput}
      closeAllPopup={closeAllPopup}
    >
      <input
        className="popup-box__input popup-box__input_order_first-input"
        name="img_link"
        type="url"
        ref={currInput || ""}
        placeholder="Image link"
        onChange={(e) => {
          onSetVaildMsg("urlInput", e.target.validationMessage);
        }}
        required
      />
      <span className="popup-box__input-error">{validMsg.urlInput || ""}</span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
