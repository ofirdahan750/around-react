import React from "react"
export const AddPlacesForm = ({ handleSubmitAddItem, onChangeInput, inputVals, type, btnSetting }) => {

    return (
        <form name={`form_${type}`} className="popup-box__form" noValidate>
            <fieldset className="popup-box__fieldset">
                <input
                    className="popup-box__input popup-box__input_order_first-input"
                    id="title-input"
                    name="title_place"
                    type="text"
                    placeholder="Title"
                    value={inputVals.firstInputVal}
                    onChange={(e) => { onChangeInput('firstInputVal', e.target.value) }}
                    minLength="1"
                    maxLength="30"
                    required />
                <span className="popup-box__input-error title-input-error"></span>
                <input
                    className="popup-box__input popup-box__input_order_second-input"
                    id="url-input"
                    name="img_link"
                    type="url"
                    value={inputVals.secInputVal}
                    onChange={(e) => { onChangeInput('secInputVal', e.target.value) }}
                    placeholder="Image link"
                    required />
                <span className="popup-box__input-error url-input-error"></span>
                <button
                    className="popup-box__submit-button button-modifier"
                    type="submit"
                    onClick={handleSubmitAddItem}
                    disabled={btnSetting.isDisable}
                >
                    {btnSetting.txt}
                </button>
            </fieldset>
        </form>

    )


}