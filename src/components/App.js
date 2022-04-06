import { Header } from "./Header.js";
import { Main } from "./Main.js";
import { Footer } from "./Footer.js";
function App() {
  return (
    <div className="page">
      <div className="page__content">
        {/* Was root class!!!!!!!!!!!!!!!s! */}
        <Header />
        <Main />
        <Footer />
      </div>

      {/* <!-- template place --> */}
      <template id="places-item-template">
        <li className="places__item">
          <div className="places__img">
            <button
              type="button"
              className="places__remove-btn button-modifier"
            >
              <img
                src="<%= require('./images/places/remove_btn_svg/trash-btn.svg')%>"
                alt="Removeing button icon"
              />
            </button>
          </div>
          <div className="places__info-wrapper">
            <h2 className="places__name">Loading...</h2>
            <div>
              <button
                type="button"
                className="places__like-btn button-modifier"
              ></button>
              <p className="places__like-counter"></p>
            </div>
          </div>
        </li>
      </template>
    </div>
  );
}

export default App;
