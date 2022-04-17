import spinnerGif from "../images/api/spinner_svg.svg";
import profilePicBtnSvg from "../images/profile/profile__pic-edit.svg";
import profileAddBtnSvg from "../images/profile/profile__button-plus.svg";
import profileEditBtnSvg from "../images/profile/profile__button-edit.svg";
import AddPlaceForm from "./Popups/PopupForm/AddPlacesForm.js";
import EditProfileForm from "./Popups/PopupForm/EditProfileForm.js";
import EditAvatarForm from "./Popups/PopupForm/EditAvatarForm.js";
import ConfirmForm from "./Popups/PopupForm/ConfirmForm.js";
import ImagePopup from "./Popups/ImagePopup.js";
import Card from "./Card.js";
import React, {useCallback, useEffect, useState} from "react";
import {
  loadingInitState,
  loadingInitError,
  txtErr,
  errImg
} from "../utils/constants.js";
import {
  addItemLike,
  addNewCard,
  getInitInfo,
  onRemoveItem,
  onUpdateProfilePic,
  removeItemLike,
  setUserInfo
} from "../utils/Api";

const Main = ({
  openPopup,
  closePopup,
  isPopupOpen,
  isLoading,
  setIsLoading,
  formSettingStates,
  formSetting,
  setFormSetting
}) => {
  const [cards, setCards] = useState(loadingInitState.card);
  const [userStateInfo, setUserStateInfo] = useState(loadingInitState.useInfo);
  const [inputVals, setInputVals] = useState({
    firstInputVal: "",
    secInputVal: ""
  });
  const [isValidInput, setValidInput] = useState(false);
  const [validMsg, setValidMsg] = useState({});

  useEffect(() => {
    if (!isPopupOpen) setValidMsg({});
    else {
      const isAllInputsFilled = Object.values(inputVals).every((v) => v);
      const isVaildMsgActive = !Object.values(validMsg).some((val) =>
        Boolean(val)
      );
      const isFormVaild = isAllInputsFilled && isVaildMsgActive;
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
        console.log(`Error: ${error}`);
        setCards(loadingInitError.card);
        setUserStateInfo(loadingInitError.useInfo);
      });
  }, []);

  useEffect(() => {
    //Set and Remove Popups
    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscClose);
    } else {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isPopupOpen]);
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
          closePopup();
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
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleBtnText("Save", true, err);
      });
  };
  const handleSubmitRemoveCard = (e) => {
    e.preventDefault();
    onHandleBtnText();
    onRemoveItem(formSetting.cardId)
      .then(() => {
        onHandleBtnText("Place removed successfully!", true);
        setCards(cards.filter((item) => item._id !== formSetting.cardId));
        setTimeout(() => {
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleBtnText("Yes", true, err);
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
          closePopup();
        }, 1000);
      })
      .catch((err) => {
        onHandleBtnText("Save", true, err);
      });
  };

  const handlePopupMouseDown = (e) => {
    const contextMenu = 2;
    if (e.button === contextMenu) return;
    if (
      e.target.classList.contains("popup-box_visible") ||
      e.target.classList.contains("popup-box__close-button")
    ) {
      closePopup();
    }
  };
  const handleEscClose = useCallback((e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  }, []);

  const handleToggleLikedBtn = (isLiked, id) => {
    if (isLoading) return;
    if (!isLiked) {
      addItemLike(id).then((res) => {
        const newState = [...cards];
        newState.find((item) => item._id === id).likes = res.likes;
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

  const onChangeInput = (changedValName, inputTxtVAL) => {
    setInputVals((prevState) => ({
      ...prevState,
      [changedValName]: inputTxtVAL
    }));
  };
  return (
    <>
      <main className="main">
        <section className="profile">
          <div
            className="profile__avatar-cover"
            style={{
              backgroundImage: `url(${userStateInfo.avatar || spinnerGif})`
            }}
            onClick={() => {
              openPopup(formSettingStates.EDIT_AVATAR.name);
              setInputVals({urlInput: ""});
            }}
          >
            <button
              className="profile__avatar-btn button-modifier"
              alt="Avatar user photo"
            >
              <img
                src={profilePicBtnSvg}
                alt="Edit profile PIC pencil button"
                className="profile__avatar-btn-img"
              />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">
              {userStateInfo.name || "Loading..."}
            </h1>
            <button
              type="button"
              className="profile__edit-btn-cover button-modifier"
              onClick={() => {
                openPopup(formSettingStates.EDIT_PROFILE.name);
                setInputVals({
                  nameInput: userStateInfo.name,
                  aboutInput: userStateInfo.about
                });
              }}
            >
              <img
                src={profileEditBtnSvg}
                className="profile__edit-btn"
                alt="Edit profile button"
              />
            </button>
            <p className="profile__about-me">
              {userStateInfo.about || "Loading..."}
            </p>
          </div>
          <button
            type="button"
            className="profile__add-btn-cover button-modifier"
            onClick={() => {
              openPopup(formSettingStates.ADD_ITEM.name);
              setInputVals({titleInput: "", urlInput: ""});
            }}
          >
            <img
              src={profileAddBtnSvg}
              className="profile__add-btn"
              alt="Edit profile button"
            />
          </button>
        </section>
        <section className="places">
          <ul className="places__grid-container">
            {cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  userId={userStateInfo._id}
                  spinnerGif={spinnerGif}
                  handleToggleLikedBtn={handleToggleLikedBtn}
                  openPopup={openPopup}
                  formSettingStates={formSettingStates}
                  setFormSetting={setFormSetting}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <AddPlaceForm
        handleSubmit={handleSubmitAddItem}
        formSetting={formSetting}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
        validMsg={validMsg}
        isValidInput={isValidInput}
        inputVals={inputVals}
        handleInputChange={handleInputChange}
      />
      <EditProfileForm
        handleSubmit={handleSubmitEditProfile}
        formSetting={formSetting}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
        validMsg={validMsg}
        isValidInput={isValidInput}
        inputVals={inputVals}
        handleInputChange={handleInputChange}
      />
      <EditAvatarForm
        handleSubmit={handleSubmitChangeProfilePic}
        formSetting={formSetting}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
        validMsg={validMsg}
        isValidInput={isValidInput}
        inputVals={inputVals}
        handleInputChange={handleInputChange}
      />
      <ConfirmForm
        handleSubmit={handleSubmitRemoveCard}
        formSetting={formSetting}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
      />

      <ImagePopup
        formSetting={formSetting}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        handlePopupMouseDown={handlePopupMouseDown}
        txtErr={txtErr}
        errImg={errImg}
      />
    </>
  );
};
export default Main;
