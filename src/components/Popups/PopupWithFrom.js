import React, {useState, useEffect} from "react";
import AddPlacesForm from "./PopupForm/AddPlacesForm.js";
import EditProfileForm from "./PopupForm/EditProfileForm.js";
import EditAvatarForm from "./PopupForm/EditAvatarForm.js";

const PopupWithForm = ({
  txtErr,
  handlePopupMouseDown,
  formSetting: {type, btnSetting, heading},
  inputVals,
  onChangeInput,
  closePopup,
  handleSubmitAddItem,
  handleSubmitChangeProfilePic,
  handleSubmitEditProfile,
  isPopupOpen,
  handleSubmitRemoveCard
}) => {
  const [isValidInput, setValidInput] = useState(false);
  const [validMsg, setValidMsg] = useState({});

  useEffect(() => {
    if (!isPopupOpen) setValidMsg({});
    else {
      const isFormVaild =
        inputVals.firstInputVal &&
        inputVals.secInputVal &&
        !Object.values(validMsg).some((val) => Boolean(val));
      setValidInput(isFormVaild || false);
    }
  }, [inputVals, isPopupOpen]);
  const onSetVaildMsg = (inputVal, msg) => {
    setValidMsg({
      ...validMsg,
      [inputVal]: msg
    });
  };
  const handleInputChange = (inputName, e) => {
    onChangeInput(inputName, e.target.value);
    onSetVaildMsg(inputName, e.target.validationMessage);
  };
  const setInputElem = () => {
    switch (type) {
      case "add-item":
        return (
          <AddPlacesForm
            handleSubmitAddItem={handleSubmitAddItem}
            inputVals={inputVals}
            btnSetting={btnSetting}
            type={type}
            isValidInput={isValidInput}
            validMsg={validMsg}
            handleInputChange={handleInputChange}
          />
        );
      case "profile-edit":
        return (
          <EditProfileForm
            handleSubmitEditProfile={handleSubmitEditProfile}
            inputVals={inputVals}
            btnSetting={btnSetting}
            type={type}
            isValidInput={isValidInput}
            validMsg={validMsg}
            handleInputChange={handleInputChange}
          />
        );
      case "change-profile-pic":
        return (
          <EditAvatarForm
            handleSubmitChangeProfilePic={handleSubmitChangeProfilePic}
            inputVals={inputVals}
            btnSetting={btnSetting}
            type={type}
            isValidInput={isValidInput}
            validMsg={validMsg}
            handleInputChange={handleInputChange}
          />
        );
      case "confirm":
        return (
          <fieldset className="popup-box__fieldset">
            <button
              className="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
              type="click"
              disabled={btnSetting.isDisable}
              onClick={handleSubmitRemoveCard}
              name="btn_confirm"
            >
              {btnSetting.txt}
            </button>
          </fieldset>
        );

      case "init":
        return <div>Loading...</div>;
        break;

      default:
        return <div>{txtErr}</div>;
    }
  };

  return (
    <div
      className={`popup-box popup-box_type_${type} ${
        isPopupOpen && type !== "img" ? "popup-box_visible" : ""
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
          {setInputElem()}
        </div>
      </div>
    </div>
  );
};
export default PopupWithForm;
