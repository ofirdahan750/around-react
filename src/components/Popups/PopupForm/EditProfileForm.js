import React from "react"
export const EditProfileForm = ({handleSubmitEditProfile, inputVals, onChangeInput, btnSetting}) => {
    return (
        <>
            <input
                className="popup-box__input popup-box__input_order_first-input"
                name="name_input"
                id="name-input"
                value={inputVals.firstInputVal}
                onChange={(e) => { onChangeInput('firstInputVal', e.target.value) }}
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
                value={inputVals.secInputVal}
                onChange={(e) => { onChangeInput('secInputVal', e.target.value) }}
                minLength="2"
                maxLength="200"
                id="about-me-input"
                required
            />
            <span className="popup-box__input-error about-me-input-error"></span>
            <button
                className="popup-box__submit-button button-modifier"
                type="submit"
                disabled={btnSetting.isDisable}
                onClick={handleSubmitEditProfile}
            >
                {btnSetting.txt}
            </button>
        </>
    )
}
