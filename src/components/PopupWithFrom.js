import React from "react";

export const PopupWithForm = ({
  editProfileClass,
  addProfileClass,
  editAvatarClass,
  closePopup,
}) => {
  return (
    <>
      {/* <!-- Popup Profile Edit --> */}
      <section
        className={`popup-box popup-box_type_profile-edit ${editProfileClass}`}
      >
        <div className="popup-box__container">
          <button
            type="button"
            className="popup-box__close-button button-modifier"
            name="profile-edit"
            onClick={() => closePopup("editProfileOpen")}
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">Edit profile</h2>
            <form
              name="form_profile-edit"
              className="popup-box__form"
              noValidate
            >
              <fieldset className="popup-box__fieldset">
                <input
                  className="popup-box__input popup-box__input_order_first-input"
                  name="name_input"
                  id="name-input"
                  type="text"
                  placeholder="Enter your name"
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
                  required
                />
                <span className="popup-box__input-error about-me-input-error"></span>
                <button
                  className="popup-box__submit-button button-modifier"
                  type="submit"
                >
                  Save
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- Popup Add New Item --> */}
      <section
        className={`popup-box popup-box_type_add-item ${addProfileClass}`}
      >
        <div className="popup-box__container">
          <button
            name="add-item"
            type="button"
            className="popup-box__close-button button-modifier"
            onClick={() => closePopup("addProfileOpen")}
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">New place</h2>
            <form name="form_add-place" className="popup-box__form" noValidate>
              <fieldset className="popup-box__fieldset">
                <input
                  className="popup-box__input popup-box__input_order_first-input"
                  id="title-input"
                  name="title_place"
                  type="text"
                  placeholder="Title"
                  minLength="1"
                  maxLength="30"
                  required
                />
                <span className="popup-box__input-error title-input-error"></span>
                <input
                  className="popup-box__input popup-box__input_order_second-input"
                  id="url-input"
                  name="img_link"
                  type="url"
                  placeholder="Image link"
                  required
                />
                <span className="popup-box__input-error url-input-error"></span>
                <button
                  className="popup-box__submit-button button-modifier"
                  type="click"
                  name="btn_add-item"
                >
                  Create
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- Popup Change Profile Pic --> */}
      <section
        className={`popup-box popup-box_type_change-profile-pic ${editAvatarClass}`}
      >
        <div className="popup-box__container">
          <button
            name="change-profile-pic"
            type="button"
            className="popup-box__close-button button-modifier"
            onClick={() => closePopup("editAvatarOpen")}
          ></button>
          <div className="popup-box__wrapper">
            <h2 className="popup-box__heading">Change profile picture</h2>
            <form
              name="form_change-profile-pic"
              className="popup-box__form"
              noValidate
            >
              <fieldset className="popup-box__fieldset">
                <input
                  className="popup-box__input popup-box__input_order_first-input"
                  name="img_link"
                  type="url"
                  placeholder="Image link"
                  required
                />
                <span className="popup-box__input-error url-input-error"></span>
                <button
                  className="popup-box__submit-button button-modifier"
                  type="click"
                  name="btn_change-profile-pic"
                >
                  Save
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
