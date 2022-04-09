import React from "react";

export const PopupWithForm = ({
  popupClass: {
    editProfileClass,
    addProfileClass,
    editAvatarClass,
    confirmRemoveClass,
  },
  handleSubmit: {
    handleSubmitEditProfile,
    handleSubmitAddItem,
    handleSubmitChangeProfilePic,
    handleSubmitRemoveCard,
  },
  closePopup,
  handlePopupMouseDown,
  userOpenInfo: { firstInputVal: userName, secInputVal: userAbout },
  onChangeInput,
  btnSetting,
}) => {
  return (
    <>
      {/* <!-- Popup Profile Edit --> */}
      <section
        className={`popup-box popup-box_type_profile-edit ${editProfileClass}`}
        onMouseDown={handlePopupMouseDown}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="popup-box__container">
          <button
            type="button"
            className="popup-box__close-button button-modifier"
            name="profile-edit"
            onClick={() => closePopup()}
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">Edit profile</h2>
            <form
              name="form_profile-edit"
              className="popup-box__form"
              onSubmit={handleSubmitEditProfile}
              noValidate
            >
              <fieldset className="popup-box__fieldset">
                <input
                  className="popup-box__input popup-box__input_order_first-input"
                  name="name_input"
                  id="name-input"
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  autoFocus
                  onChange={(e) => {
                    onChangeInput("firstInputVal", e.target.value);
                  }}
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="popup-box__input-error name-input-error"></span>
                <input
                  className="popup-box__input popup-box__input_order_second-input"
                  name="about_me"
                  type="text"
                  placeholder="Tell as something about yourself"
                  minLength="2"
                  maxLength="200"
                  id="about-me-input"
                  value={userAbout}
                  onChange={(e) => {
                    onChangeInput("secInputVal", e.target.value);
                  }}
                  required
                />
                <span className="popup-box__input-error about-me-input-error"></span>
                <button
                  className="popup-box__submit-button button-modifier"
                  disabled={btnSetting.isDisable}
                  type="submit"
                >
                  {btnSetting.btnTxt}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- Popup Add New Item --> */}
      <section
        className={`popup-box popup-box_type_add-item ${addProfileClass}`}
        onMouseDown={handlePopupMouseDown}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="popup-box__container">
          <button
            name="add-item"
            type="button"
            className="popup-box__close-button button-modifier"
            onClick={() => closePopup()}
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">New place</h2>
            <form
              onSubmit={handleSubmitAddItem}
              name="form_add-place"
              className="popup-box__form"
              noValidate
            >
              <fieldset className="popup-box__fieldset">
                <input
                  className="popup-box__input popup-box__input_order_first-input"
                  id="title-input"
                  name="title_place"
                  type="text"
                  placeholder="Title"
                  minLength="1"
                  maxLength="30"
                  onChange={(e) => {
                    onChangeInput("firstInputVal", e.target.value);
                  }}
                  required
                />
                <span className="popup-box__input-error title-input-error"></span>
                <input
                  className="popup-box__input popup-box__input_order_second-input"
                  id="url-input"
                  name="img_link"
                  type="url"
                  placeholder="Image link"
                  onChange={(e) => {
                    onChangeInput("secInputVal", e.target.value);
                  }}
                  required
                />
                <span className="popup-box__input-error url-input-error"></span>
                <button
                  className="popup-box__submit-button button-modifier"
                  type="click"
                  name="btn_add-item"
                  disabled={btnSetting.isDisable}
                >
                  {btnSetting.btnTxt}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- Popup Change Profile Pic --> */}
      <section
        className={`popup-box popup-box_type_change-profile-pic ${editAvatarClass}`}
        onMouseDown={handlePopupMouseDown}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="popup-box__container">
          <button
            name="change-profile-pic"
            type="button"
            className="popup-box__close-button button-modifier"
            onClick={() => closePopup()}
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">Change profile picture</h2>
            <form
              name="form_change-profile-pic"
              className="popup-box__form"
              onSubmit={handleSubmitChangeProfilePic}
              noValidate
            >
              <fieldset className="popup-box__fieldset">
                <input
                  className="popup-box__input popup-box__input_order_first-input"
                  name="img_link"
                  type="url"
                  placeholder="Image link"
                  onChange={(e) => {
                    onChangeInput("firstInputVal", e.target.value);
                  }}
                  required
                />
                <span className="popup-box__input-error url-input-error"></span>
                <button
                  className="popup-box__submit-button button-modifier"
                  type="click"
                  name="btn_change-profile-pic"
                  disabled={btnSetting.isDisable}
                >
                  {btnSetting.btnTxt}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- Popup Confirm --> */}
      <section
        className={`popup-box popup-box_type_confirm ${confirmRemoveClass}`}
      >
        <div className="popup-box__container">
          <button
            type="button"
            className="popup-box__close-button popup-box__close-button_type_delete-confirm button-modifier"
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">Are you sure?</h2>
            <fieldset className="popup-box__fieldset">
              <button
                className="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
                type="click"
                name="btn_confirm"
                disabled={btnSetting.isDisable}
                onClick={handleSubmitRemoveCard}
              >
                {btnSetting.btnTxt}
              </button>
            </fieldset>
          </div>
        </div>
      </section>
    </>
  );
};
