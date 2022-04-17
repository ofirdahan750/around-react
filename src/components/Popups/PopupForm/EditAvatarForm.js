import React from "react";

export const EditAvatarForm = ({inputVals, onChangeInput, type, btnSetting, handleSubmitChangeProfilePic }) => {
    return (
        <form name={`form_${type}`} className="popup-box__form" noValidate>
            <fieldset className="popup-box__fieldset">
                <input
                    className="popup-box__input popup-box__input_order_first-input"
                    name="img_link"
                    type="url"
                    value={inputVals.firstInputVal}
                    placeholder="Image link"
                    onChange={(e) => { onChangeInput('firstInputVal', e.target.value) }}

                    required
                />
                <span className="popup-box__input-error url-input-error"></span>
                <button
                    className="popup-box__submit-button button-modifier"
                    type="click"
                    disabled={btnSetting.isDisable}
                    name="btn_change-profile-pic"
                    onClick={handleSubmitChangeProfilePic}
                >
                    {btnSetting.txt}
                </button>
            </fieldset>
        </form>
    )

}