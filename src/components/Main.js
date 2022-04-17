import spinnerGif from "../images/api/spinner_svg.svg";
import profilePicBtnSvg from "../images/profile/profile__pic-edit.svg";
import profileAddBtnSvg from "../images/profile/profile__button-plus.svg";
import profileEditBtnSvg from "../images/profile/profile__button-edit.svg";
import {PopupWithForm} from "./Popups/PopupWithFrom.js";
import {Cards} from "./Cards.js";
import React, {useCallback, useEffect, useState} from "react";
import {
  loadingInitState,
  loadingInitError,
  txtErr,
  formSettingState,
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

export const Main = () => {
  const [cards, setCards] = useState(loadingInitState.card);
  const [userInfo, setUserStateInfo] = useState(loadingInitState.useInfo);
  const [isLoading, setLoading] = useState(true);
  const [formSetting, setFormsSetting] = useState(formSettingState.init);
  const [inputVals, setInputVals] = useState({
    firstInputVal: "",
    secInputVal: ""
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    //Init only
    setLoading(true);
    getInitInfo()
      .then(([cardItemsArr, userInfoRes]) => {
        setLoading(false);
        setCards(cardItemsArr);
        setUserStateInfo(userInfoRes);
      })
      .catch((err) => {
        console.log(err);
        setCards(loadingInitError.card);
        setUserStateInfo(loadingInitError.useInfo);
      });
  }, []);
  useEffect(() => {
    //Set and Remove Popups
    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscClose);
      if (formSetting.type === "profile-edit") {
        setInputVals({
          firstInputVal: userInfo.name,
          secInputVal: userInfo.about
        });
      } else {
        setInputVals({firstInputVal: "", secInputVal: ""});
      }
    } else {
      document.removeEventListener("keydown", handleEscClose);
      setTimeout(() => {
        setInputVals({firstInputVal: "", secInputVal: ""});
      }, 90);
    }
  }, [isPopupOpen]);
  const setClassVisible = () => {
    return isPopupOpen ? "popup-box_visible" : "";
  };
  const closePopup = () => {
    onHandleBtnText("Close...", true);
    setTimeout(() => {
      setPopupOpen(false);
    }, 1);
  };
  const openPopup = (clickedPopUpSetting) => {
    if (isLoading) return;
    setPopupOpen(true);
    setFormsSetting(formSettingState[clickedPopUpSetting]);
  };
  const onHandleBtnText = (btnTxt = "Saving...", isDisable = true, error) => {
    if (error) {
      console.log(`Error: ${error}`);
      setFormsSetting((prevState) => ({
        ...prevState,
        btnSetting: {txt: txtErr, isDisable: true}
      }));
      setTimeout(() => {
        setFormsSetting((prevState) => ({
          ...prevState,
          btnSetting: {txt: btnTxt, isDisable: false}
        }));
      }, 1100);
    } else {
      setFormsSetting((prevState) => ({
        ...prevState,
        btnSetting: {txt: btnTxt, isDisable: isDisable}
      }));
    }
  };
  const handleSubmitAddItem = (e) => {
    e.preventDefault();
    onHandleBtnText();
    addNewCard({
      name: inputVals.firstInputVal,
      link: inputVals.secInputVal
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
    setUserInfo({name: inputVals.firstInputVal, about: inputVals.secInputVal})
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
    onUpdateProfilePic({avatar: inputVals.firstInputVal})
      .then(() => {
        onHandleBtnText("Profile Picture modified successfully!", true);
        setUserStateInfo((prevState) => ({
          ...prevState,
          avatar: inputVals.firstInputVal
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
    console.log("e:", e);
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
            style={{backgroundImage: `url(${userInfo.avatar || spinnerGif})`}}
            onClick={() => openPopup("EditAvatar")}
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
            <h1 className="profile__name">{userInfo.name || "Loading..."}</h1>
            <button
              type="button"
              className="profile__edit-btn-cover button-modifier"
              onClick={() => openPopup("editProfile")}
            >
              <img
                src={profileEditBtnSvg}
                className="profile__edit-btn"
                alt="Edit profile button"
              />
            </button>
            <p className="profile__about-me">
              {userInfo.about || "Loading..."}
            </p>
          </div>
          <button
            type="button"
            className="profile__add-btn-cover button-modifier"
            onClick={() => openPopup("addItem")}
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
                <Cards
                  card={card}
                  key={card._id}
                  userId={userInfo._id}
                  spinnerGif={spinnerGif}
                  handleToggleLikedBtn={handleToggleLikedBtn}
                  openPopup={openPopup}
                  setFormsSetting={setFormsSetting}
                />
              );
            })}
          </ul>
        </section>
      </main>
      {formSetting.type !== "img" && (
        <PopupWithForm
          handlePopupMouseDown={handlePopupMouseDown}
          formSetting={formSetting}
          inputVals={inputVals}
          onChangeInput={onChangeInput}
          closePopup={closePopup}
          setInputVal={setInputVals}
          handleSubmitAddItem={handleSubmitAddItem}
          handleSubmitEditProfile={handleSubmitEditProfile}
          handleSubmitRemoveCard={handleSubmitRemoveCard}
          handleSubmitChangeProfilePic={handleSubmitChangeProfilePic}
          setClassVisible={setClassVisible()}
          txtErr={txtErr}
        />
      )}
      {formSetting.type === "img" && (
        <section
          className={`popup-box popup-box_type_${formSetting.type}} ${
            isPopupOpen ? "popup-box_visible" : ""
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
                src={formSetting.link ? formSetting.link : errImg}
                className="popup-box__img"
                alt={`A larger photo of: ${
                  formSetting.title ? formSetting.title : txtErr
                }`}
              />
              <p className="popup-box__img-title">
                ${formSetting.title ? formSetting.title : txtErr}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
