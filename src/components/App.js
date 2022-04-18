import React, {useCallback, useEffect, useState} from "react";
import ImagePopup from "./Popups/ImagePopup.js";
import {
  loadingInitState,
  loadingInitError,
  txtErr,
  errImg
} from "../utils/constants.js";
import {
  addNewCard,
  getInitInfo,
  onUpdateProfilePic,
  setUserInfo
} from "../utils/Api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import {formSettingStates} from "../utils/constants.js";
import PopupWithForm from "./Popups/PopupWithFrom.js";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formSetting, setFormSetting] = useState(formSettingStates.INIT);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState(loadingInitState.card);
  const [userStateInfo, setUserStateInfo] = useState(loadingInitState.useInfo);
  const [inputVals, setInputVals] = useState({
    firstInitVal: "",
    secInitVal: ""
  });
  const [isValidInput, setValidInput] = useState(false);
  const [validMsg, setValidMsg] = useState({});

  useEffect(() => {
    if (
      !isEditProfilePopupOpen &&
      !isAddPlacePopupOpen &&
      !isEditAvatarPopupOpen
    )
      setValidMsg({});
    else {
      const isAllInputsFilled = Object.values(inputVals).every((v) => v);
      const isVaildMsgActive = !Object.values(validMsg).some((val) =>
        Boolean(val)
      );
      const isFormVaild = isAllInputsFilled && isVaildMsgActive;
      setValidInput(isFormVaild || false);
    }
  }, [
    inputVals,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen
  ]);
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
  useEffect(() => {
    //Init only
    setIsLoading(true);
    getInitInfo()
      .then(([cardItemsArr, userInfoRes]) => {
        setIsLoading(false);
        setCards(cardItemsArr);
        setUserStateInfo(userInfoRes);
      })
      .catch((error) => {
        setCards(loadingInitError.card);
        setUserStateInfo(loadingInitError.useInfo);
      });
  }, []);

  useEffect(() => {
    //Set and Remove Popups event
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard.isOpen
    ) {
      document.addEventListener("keydown", handleEscClose);
    } else {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard
  ]);
  const handleEditProfileClick = () => {
    if (isLoading) return;
    setIsEditProfilePopupOpen(true);
    setFormSetting(formSettingStates.EDIT_PROFILE);
    setInputVals({
      nameInput: userStateInfo.name,
      aboutInput: userStateInfo.about
    });
  };
  const handleAddElementClick = () => {
    if (isLoading) return;
    setIsAddPlacePopupOpen(true);
    setFormSetting(formSettingStates.ADD_ITEM);
    setInputVals({titleInput: "", urlInput: ""});
  };
  const handleEditAvatarClick = () => {
    if (isLoading) return;
    setIsEditAvatarPopupOpen(true);
    setFormSetting(formSettingStates.EDIT_AVATAR);
    setInputVals({urlInput: ""});
  };
  const handleCardClick = ({name, link}) => {
    if (isLoading) return;
    setSelectedCard({isOpen: true, name, link});
  };
  const closeAllPopup = () => {
    onHandleBtnText("Close...", true);
    setTimeout(() => {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard((prevState) => ({
        ...prevState,
        isOpen: false
      }));
    }, 1);
  };
  const onHandleBtnText = (btnTxt = "Saving...", isDisable = true, error) => {
    if (error) {
      console.log(`Error: ${error}`);
      setFormSetting((prevState) => ({
        ...prevState,
        btnSetting: {txt: txtErr, isDisable: true}
      }));
      setTimeout(() => {
        setFormSetting((prevState) => ({
          ...prevState,
          btnSetting: {txt: btnTxt, isDisable: false}
        }));
      }, 1100);
    } else {
      setFormSetting((prevState) => ({
        ...prevState,
        btnSetting: {txt: btnTxt, isDisable: isDisable}
      }));
    }
  };

  const handlePopupMouseDown = (e) => {
    const contextMenu = 2;
    if (e.button === contextMenu) return;
    if (
      e.target.classList.contains("popup-box_visible") ||
      e.target.classList.contains("popup-box__close-button")
    ) {
      closeAllPopup();
    }
  };
  const handleEscClose = useCallback((e) => {
    if (e.key === "Escape") {
      closeAllPopup();
    }
  }, []);
  const handleSubmitAddItem = (e) => {
    e.preventDefault();
    onHandleBtnText();
    addNewCard({
      name: inputVals.titleInput,
      link: inputVals.urlInput
    })
      .then((res) => {
        onHandleBtnText("Place added successfully!", true);
        setCards((prevState) => [res, ...prevState]);
        setTimeout(() => {
          closeAllPopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleBtnText("Create", true, err);
      });
  };
  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    onHandleBtnText();
    setUserInfo({name: inputVals.nameInput, about: inputVals.aboutInput})
      .then((res) => {
        onHandleBtnText("Profile edited successfully!", true);
        setUserStateInfo(res);
        setTimeout(() => {
          closeAllPopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleBtnText("Save", true, err);
      });
  };

  const handleSubmitChangeProfilePic = (e) => {
    e.preventDefault();
    onHandleBtnText();
    onUpdateProfilePic({avatar: inputVals.urlInput})
      .then(() => {
        onHandleBtnText("Profile Picture modified successfully!", true);
        setUserStateInfo((prevState) => ({
          ...prevState,
          avatar: inputVals.urlInput
        }));
        setTimeout(() => {
          closeAllPopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleBtnText("Save", true, err);
      });
  };
  const onChangeInput = (changedValName, inputTxtVAL) => {
    setInputVals((prevState) => ({
      ...prevState,
      [changedValName]: inputTxtVAL
    }));
  };
  return (
    <div className="page__content">
      <Header />
      <Main
        userStateInfo={userStateInfo}
        cards={cards}
        setFormSetting={setFormSetting}
        onEditProfile={handleEditProfileClick}
        onAddElement={handleAddElementClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        setInputVals={setInputVals}
        closeAllPopup={closeAllPopup}
      />
      <Footer />
      <PopupWithForm
        handleSubmit={handleSubmitAddItem}
        handlePopupMouseDown={handlePopupMouseDown}
        formSetting={formSetting}
        isOpen={isAddPlacePopupOpen}
        isValidInput={isValidInput}
        closeAllPopup={closeAllPopup}
      >
        <input
          className="popup-box__input popup-box__input_order_first-input"
          onChange={(e) => {
            handleInputChange("titleInput", e);
          }}
          type="text"
          placeholder="Title"
          value={inputVals.titleInput || ""}
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
          value={inputVals.urlInput || ""}
          onChange={(e) => {
            handleInputChange("urlInput", e);
          }}
          placeholder="Image link"
          required
        />
        <span className={`popup-box__input-error`}>
          {validMsg.urlInput || ""}
        </span>
      </PopupWithForm>
      <PopupWithForm
        handleSubmit={handleSubmitEditProfile}
        handlePopupMouseDown={handlePopupMouseDown}
        formSetting={formSetting}
        isOpen={isEditProfilePopupOpen}
        isValidInput={isValidInput}
        closeAllPopup={closeAllPopup}
      >
        <input
          className="popup-box__input popup-box__input_order_first-input"
          value={inputVals.nameInput || ""}
          onChange={(e) => {
            handleInputChange("nameInput", e);
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
          value={inputVals.aboutInput}
          onChange={(e) => {
            handleInputChange("aboutInput", e);
          }}
          minLength="2"
          maxLength="200"
          required
        />
        <span className={`popup-box__input-error`}>
          {validMsg.aboutInput || ""}
        </span>
      </PopupWithForm>
      <PopupWithForm
        handleSubmit={handleSubmitChangeProfilePic}
        handlePopupMouseDown={handlePopupMouseDown}
        formSetting={formSetting}
        isOpen={isEditAvatarPopupOpen}
        isValidInput={isValidInput}
        closeAllPopup={closeAllPopup}
      >
        <input
          className="popup-box__input popup-box__input_order_first-input"
          name="img_link"
          type="url"
          value={inputVals.urlInput}
          placeholder="Image link"
          onChange={(e) => {
            handleInputChange("urlInput", e);
          }}
          required
        />

        <span className="popup-box__input-error">
          {validMsg.urlInput || ""}
        </span>
      </PopupWithForm>

      <ImagePopup
        selectedCard={selectedCard}
        closeAllPopup={closeAllPopup}
        handlePopupMouseDown={handlePopupMouseDown}
        txtErr={txtErr}
        errImg={errImg}
      />
    </div>
  );
};

export default App;
