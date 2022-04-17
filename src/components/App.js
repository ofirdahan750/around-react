import React, {useState, useEffect} from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import {formSettingStates} from "../utils/constants.js";
const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formSetting, setFormSetting] = useState(formSettingStates.INIT);

  const closePopup = () => {
    // onHandleBtnText("Close...", true);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 1);
  };

  const openPopup = (clickedPopUpName) => {
    if (isLoading) return;
    setIsPopupOpen(true);
    setFormSetting(formSettingStates[clickedPopUpName]);
  };
  return (
    <div className="page__content">
      <Header />
      <Main
        openPopup={openPopup}
        closePopup={closePopup}
        isPopupOpen={isPopupOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        formSettingStates={formSettingStates}
        formSetting={formSetting}
        setFormSetting={setFormSetting}
      />
      <Footer />
    </div>
  );
};

export default App;
