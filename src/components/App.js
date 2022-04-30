import React, {useCallback, useEffect, useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ImagePopup from "./Popups/ImagePopup.js";
import EditProfilePopup from "./Popups/EditProfilePopup.js";
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
  setUserInfo,
  addItemLike,
  removeItemLike,
  onRemoveItem
} from "../utils/Api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import {formSettingStates} from "../utils/constants.js";
import PopupWithForm from "./Popups/PopupWithFrom.js";
import {updateObjInArr} from "../utils/utils";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formSetting, setFormSetting] = useState(formSettingStates.INIT);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState(loadingInitState.card);
  const [currentUser, setCurrentUser] = useState(loadingInitState.useInfo);
  const [inputVals, setInputVals] = useState({
    firstInitVal: "",
    secInitVal: ""
  });
  const [isValidInput, setValidInput] = useState(false);
  const [validMsg, setValidMsg] = useState({});

 const handleMsgVaild = (inputVals) => {
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
  };
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
        setCurrentUser(userInfoRes);
      })
      .catch((error) => {
        console.log("error:", error);
        setCards(loadingInitError.card);
        setCurrentUser(loadingInitError.useInfo);
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
  const handleToggleLikedBtn = (isLiked, id) => {
    if (isLoading) return;
    if (!isLiked) {
      addItemLike(id).then((res) => {
        const newState = [...cards];
        newState.find((item) => item._id === id).likes = res.likes;
        const updateState = updateObjInArr();
        setCards(newState);
      });
    } else {
      removeItemLike(id).then((res) => {
        const newState = [...cards];
        newState.find((item) => item._id === id).likes = res.likes;
        setCards(newState);
      });
    }
  };
  const handleEditProfileClick = () => {
    if (isLoading) return;
    setIsEditProfilePopupOpen(true);
    setFormSetting(formSettingStates.EDIT_PROFILE);
    // setInputVals({
    //   nameInput: currentUser.name,
    //   aboutInput: currentUser.about
    // });
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
  const handleSubmitRemoveCard = (e, cardId) => {
    e.preventDefault();
    onHandleBtnText();
    onRemoveItem(cardId)
      .then(() => {
        onHandleBtnText("Place removed successfully!", true);
        setCards(cards.filter((item) => item._id !== cardId));
        // setTimeout(() => {
        //   closePopup();
        // }, 1000);
      })

      .catch((err) => {
        onHandleBtnText("Yes", true, err);
      });
  };
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
  const handleSubmitEditProfile = (e,{name,description}) => {
    e.preventDefault();
    onHandleBtnText();
    setUserInfo({name, about: description})
      .then((res) => {
        onHandleBtnText("Profile edited successfully!", true);
        setCurrentUser(res);
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
        setCurrentUser((prevState) => ({
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          currentUser={currentUser}
          cards={cards}
          setFormSetting={setFormSetting}
          onEditProfile={handleEditProfileClick}
          onAddElement={handleAddElementClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          setInputVals={setInputVals}
          closeAllPopup={closeAllPopup}
          handleToggleLikedBtn={handleToggleLikedBtn}
          handleSubmitRemoveCard={handleSubmitRemoveCard}
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
        <EditProfilePopup
          onSetVaildMsg={onSetVaildMsg}
          isOpen={isEditProfilePopupOpen}
          formSetting={formSetting}
          isValidInput={isValidInput}
          closeAllPopup={closeAllPopup}
          handlePopupMouseDown={handlePopupMouseDown}
          handleSubmitEditProfile={handleSubmitEditProfile}
          validMsg={validMsg}
          handleMsgVaild={handleMsgVaild}
        />
        {/* <PopupWithForm
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
        </PopupWithForm> */}
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
    </CurrentUserContext.Provider>
  );
};

export default App;
