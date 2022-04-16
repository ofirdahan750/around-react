import React, { useState } from 'react';
import { AddPlacesForm } from './PopupForm/AddPlacesForm.js';
import { EditProfileForm } from './PopupForm/EditProfileForm.js';
export const PopupWithForm = ({ txtErr, handlePopupMouseDown, formSetting: { type, heading, btnSetting },
	inputVals, onChangeInput, closePopup,
	handleSubmitAddItem, handleSubmitEditProfile, setClassVisible, handleSubmitRemoveCard }) => {
	const setInputElem = () => {
		switch (type) {
			case 'add-item':
				return (
					<AddPlacesForm handleSubmitAddItem={handleSubmitAddItem}
						inputVals={inputVals} onChangeInput={onChangeInput}
						btnSetting={btnSetting} />
				)
			case 'profile-edit':
				return (
					<EditProfileForm handleSubmitEditProfile={handleSubmitEditProfile}
						inputVals={inputVals} onChangeInput={onChangeInput}
						btnSetting={btnSetting} />
				)
			case 'confirm':
				return (
					<button
						className="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
						type="click"
						disabled={btnSetting.isDisable}
						onClick={handleSubmitRemoveCard}
						name="btn_confirm"
					>
						{btnSetting.txt}
					</button>
				)

			case 'init':
				return <div>Loading...</div>
				break;

			default:
				return <div>{txtErr}</div>

				break;
		}
	}
	return (
		<div className={`popup-box popup-box_type_${type} ${setClassVisible}`} onMouseDown={handlePopupMouseDown} onContextMenu={e => e.preventDefault()}>
			<div className="popup-box__container">
				<button
					type="button"
					className="popup-box__close-button button-modifier"
					onClick={closePopup}
				></button>
				<div className="popup-box__wrapper">
					<h2 className="popup-box__heading">{heading}</h2>
					<form name={`form_${type}`} className="popup-box__form" noValidate>
						<fieldset className="popup-box__fieldset">
							{setInputElem()}
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	)
}


// export const PopupWithForm = ({
// 	formSetting: { popupClassType, heading, firstInput, secInput, btnSetting },
// 	handlePopupMouseDown,
// 	closePopup,
// 	onChangeInput,
// 	handleSubmitAddItem,
// 	setClassVisible,
// }) => {
// 	const handleSubmit = e => {
// 		e.preventDefault();
// 		switch (popupClassType) {
// 			case 'add-item':
// 				handleSubmitAddItem();
// 				break;
// 			default:
// 				break;
// 		}
// 	};

// 	return (
// 		<section
// 			classNameName={`popup-box popup-box_type_${popupClassType} ${setClassVisible}`}
// 			onMouseDown={handlePopupMouseDown}
// 			onContextMenu={e => e.preventDefault()}
// 		>
// 			<div classNameName="popup-box__container">
// 				<button
// 					// name="add-item"
// 					type="button"
// 					classNameName="popup-box__close-button button-modifier"
// 					onClick={() => closePopup()}
// 				/>
// 				<div classNameName="popup-box__wrapper">
// 					<h2 classNameName="popup-box__heading">{heading}</h2>
// 					<form
// 						// name="form_add-place"
// 						classNameName="popup-box__form"
// 						noValidate
// 					>
// 						<fieldset classNameName="popup-box__fieldset">
// 							{firstInput && (
// 								<>
// 									<input
// 										classNameName="popup-box__input popup-box__input_order_first-input"
// 										value={firstInput.val}
// 										type={firstInput.type}
// 										placeholder={firstInput.placeholder}
// 										minLength={firstInput.minLength || null}
// 										maxLength={firstInput.max || null}
// 										onChange={e => {
// 											onChangeInput('firstInput', e.target.value);
// 										}}
// 										required
// 									/>
// 									<span classNameName="popup-box__input-error title-input-error" />
// 								</>
// 							)}
// 							{secInput && (
// 								<>
// 									<input
// 										classNameName="popup-box__input popup-box__input_order_second-input"
// 										// id="title-input"
// 										// name="img_link"
// 										type={secInput.type}
// 										value={secInput.val}
// 										placeholder={secInput.placeholder}
// 										onChange={e => {
// 											onChangeInput('secInput', e.target.value);
// 										}}
// 										required
// 									/>
// 									<span classNameName="popup-box__input-error url-input-error" />
// 								</>
// 							)}
// 							<button
// 								classNameName="popup-box__submit-button button-modifier"
// 								type="submit"
// 								disabled={btnSetting.isDisable}
// 								onClick={handleSubmit}
// 							>
// 								{btnSetting.btnTxt}
// 							</button>
// 						</fieldset>
// 					</form>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// // <>
// //   {/* <!-- Popup Profile Edit --> */}
// //   <section
// //     classNameName={`popup-box popup-box_type_profile-edit ${editProfileClass}`}
// //     onMouseDown={handlePopupMouseDown}
// //     onContextMenu={(e) => e.preventDefault()}
// //   >
// //     <div classNameName="popup-box__container">
// //       <button
// //         type="button"
// //         classNameName="popup-box__close-button button-modifier"
// //         name="profile-edit"
// //         onClick={() => closePopup()}
// //       ></button>
// //       <div classNameName="popup-box__wrapper">
// //         <h2 classNameName="popup-box__heading">Edit profile</h2>
// //         <form
// //           name="form_profile-edit"
// //           classNameName="popup-box__form"
// //           onSubmit={handleSubmitEditProfile}
// //           noValidate
// //         >
// //           <fieldset classNameName="popup-box__fieldset">
// //             <input
// //               classNameName="popup-box__input popup-box__input_order_first-input"
// //               name="name_input"
// //               id="name-input"
// //               type="text"
// //               placeholder="Enter your name"
// //               value={userName}
// //               autoFocus
// //               onChange={(e) => {
// //                 onChangeInput("firstInputVal", e.target.value);
// //               }}
// //               minLength="2"
// //               maxLength="40"
// //               required
// //             />
// //             <span classNameName="popup-box__input-error name-input-error"></span>
// //             <input
// //               classNameName="popup-box__input popup-box__input_order_second-input"
// //               name="about_me"
// //               type="text"
// //               placeholder="Tell as something about yourself"
// //               minLength="2"
// //               maxLength="200"
// //               id="about-me-input"
// //               value={userAbout}
// //               onChange={(e) => {
// //                 onChangeInput("secInputVal", e.target.value);
// //               }}
// //               required
// //             />
// //             <span classNameName="popup-box__input-error about-me-input-error"></span>
// //             <button
// //               classNameName="popup-box__submit-button button-modifier"
// //               disabled={btnSetting.isDisable}
// //               type="submit"
// //             >
// //               {btnSetting.btnTxt}
// //             </button>
// //           </fieldset>
// //         </form>
// //       </div>
// //     </div>
// //   </section>
// //   {/* <!-- Popup Add New Item --> */}
// //   <section
// //     classNameName={`popup-box popup-box_type_add-item ${addProfileClass}`}
// //     onMouseDown={handlePopupMouseDown}
// //     onContextMenu={(e) => e.preventDefault()}
// //   >
// //     <div classNameName="popup-box__container">
// //       <button
// //         name="add-item"
// //         type="button"
// //         classNameName="popup-box__close-button button-modifier"
// //         onClick={() => closePopup()}
// //       ></button>
// //       <div classNameName="popup-box__wrapper">
// //         <h2 classNameName="popup-box__heading">New place</h2>
// //         <form
// //           onSubmit={handleSubmitAddItem}
// //           name="form_add-place"
// //           classNameName="popup-box__form"
// //           noValidate
// //         >
// //           <fieldset classNameName="popup-box__fieldset">
// //             <input
// //               classNameName="popup-box__input popup-box__input_order_first-input"
// //               id="title-input"
// //               name="title_place"
// //               type="text"
// //               placeholder="Title"
// //               minLength="1"
// //               maxLength="30"
// //               onChange={(e) => {
// //                 onChangeInput("firstInputVal", e.target.value);
// //               }}
// //               required
// //             />
// //             <span classNameName="popup-box__input-error title-input-error"></span>
// //             <input
// //               classNameName="popup-box__input popup-box__input_order_second-input"
// //               id="url-input"
// //               name="img_link"
// //               type="url"
// //               placeholder="Image link"
// //               onChange={(e) => {
// //                 onChangeInput("secInputVal", e.target.value);
// //               }}
// //               required
// //             />
// //             <span classNameName="popup-box__input-error url-input-error"></span>
// //             <button
// //               classNameName="popup-box__submit-button button-modifier"
// //               type="click"
// //               name="btn_add-item"
// //               disabled={btnSetting.isDisable}
// //             >
// //               {btnSetting.btnTxt}
// //             </button>
// //           </fieldset>
// //         </form>
// //       </div>
// //     </div>
// //   </section>
// //   {/* <!-- Popup Change Profile Pic --> */}
// //   <section
// //     classNameName={`popup-box popup-box_type_change-profile-pic ${editAvatarClass}`}
// //     onMouseDown={handlePopupMouseDown}
// //     onContextMenu={(e) => e.preventDefault()}
// //   >
// //     <div classNameName="popup-box__container">
// //       <button
// //         name="change-profile-pic"
// //         type="button"
// //         classNameName="popup-box__close-button button-modifier"
// //         onClick={() => closePopup()}
// //       ></button>
// //       <div classNameName="popup-box__wrapper">
// //         <h2 classNameName="popup-box__heading">Change profile picture</h2>
// //         <form
// //           name="form_change-profile-pic"
// //           classNameName="popup-box__form"
// //           onSubmit={handleSubmitChangeProfilePic}
// //           noValidate
// //         >
// //           <fieldset classNameName="popup-box__fieldset">
// //             <input
// //               classNameName="popup-box__input popup-box__input_order_first-input"
// //               name="img_link"
// //               type="url"
// //               placeholder="Image link"
// //               onChange={(e) => {
// //                 onChangeInput("firstInputVal", e.target.value);
// //               }}
// //               required
// //             />
// //             <span classNameName="popup-box__input-error url-input-error"></span>
// //             <button
// //               classNameName="popup-box__submit-button button-modifier"
// //               type="click"
// //               name="btn_change-profile-pic"
// //               disabled={btnSetting.isDisable}
// //             >
// //               {btnSetting.btnTxt}
// //             </button>
// //           </fieldset>
// //         </form>
// //       </div>
// //     </div>
// //   </section>
// //   {/* <!-- Popup Confirm --> */}
// //   <section
// //     classNameName={`popup-box popup-box_type_confirm ${confirmRemoveClass}`}
// //   >
// //     <div classNameName="popup-box__container">
// //       <button
// //         type="button"
// //         classNameName="popup-box__close-button popup-box__close-button_type_delete-confirm button-modifier"
// //       ></button>
// //       <div classNameName="popup-box__wrapper">
// //         <h2 classNameName="popup-box__heading">Are you sure?</h2>
// //         <fieldset classNameName="popup-box__fieldset">
// //           <button
// //             classNameName="popup-box__submit-button popup-box__submit-button_type_delete-confirm button-modifier"
// //             type="click"
// //             name="btn_confirm"
// //             disabled={btnSetting.isDisable}
// //             onClick={handleSubmitRemoveCard}
// //           >
// //             {btnSetting.btnTxt}
// //           </button>
// //         </fieldset>
// //       </div>
// //     </div>
// //   </section>
