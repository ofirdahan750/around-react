import spinnerGif from "../images/api/spinner_svg.svg";
import profilePicBtnSvg from "../images/profile/profile__pic-edit.svg";
import profileAddBtnSvg from "../images/profile/profile__button-plus.svg";
import profileEditBtnSvg from "../images/profile/profile__button-edit.svg";
import Card from "./Card.js";

const Main = ({
  cards,
  userStateInfo,
  setFormSetting,
  onEditProfile,
  onAddElement,
  onEditAvatarClick,
  onCardClick,
  setInputVals
}) => {
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
              onEditAvatarClick();
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
              onClick={onEditProfile}
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
            onClick={onAddElement}
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
                  key={card._id}
                  card={card}
                  userId={userStateInfo._id}
                  spinnerGif={spinnerGif}
                  setFormSetting={setFormSetting}
                  onCardClick={onCardClick}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};
export default Main;
