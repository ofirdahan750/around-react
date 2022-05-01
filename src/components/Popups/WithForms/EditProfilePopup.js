import PopupWithForm from "./PopupWithFrom.js";
import React, {useEffect, useState, useContext} from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";
const EditProfilePopup = ({
  onSetVaildMsg,
  isOpen,
  formSetting,
  handlePopupMouseDown,
  isValidInput,
  closeAllPopup,
  validMsg,
  handleSubmitEditProfile,
  handleMsgVaild
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    //Set input vals
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    handleMsgVaild({name, description});
  }, [name, description]);
  const handleSubmit = (e) => {
    handleSubmitEditProfile(e, {name, description});
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      formSetting={formSetting}
      handlePopupMouseDown={handlePopupMouseDown}
      isValidInput={isValidInput}
      closeAllPopup={closeAllPopup}
      handleSubmit={handleSubmit}
      inputVals={{name, description}}
    >
      <input
        className="popup-box__input popup-box__input_order_first-input"
        value={name || ""}
        onChange={(e) => {
          setName(e.target.value);
          onSetVaildMsg("nameInput", e.target.validationMessage);
        }}
        type="text"
        placeholder="Enter your name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className={`popup-box__input-error`}>
        {validMsg.nameInput || ""}
      </span>
      <input
        className="popup-box__input popup-box__input_order_second-input"
        name="about_me"
        type="text"
        placeholder="Tell as something about yourself"
        value={description || ""}
        onChange={(e) => {
          setDescription(e.target.value);
          onSetVaildMsg("aboutInput", e.target.validationMessage);
        }}
        minLength="2"
        maxLength="200"
        required
      />
      <span className={`popup-box__input-error`}>
        {validMsg.aboutInput || ""}
      </span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
