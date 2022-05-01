import React, {useContext} from "react";
import removeBtn from "../images/places/remove_btn.svg";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
const Card = ({
  card: {name, link, likes, owner, _id},
  handleRemoveCardClick,
  spinnerGif,
  onCardClick,
  handleToggleLikedBtn
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = likes.some((like) => like._id === currentUser._id);
  const openImagePopup = () => {
    onCardClick({name, link});
  };
  const handleOpenRemoveCard = (e) => {
    e.stopPropagation();
    handleRemoveCardClick(_id);
  };
  return (
    <li className="places__item">
      <div
        onClick={openImagePopup}
        className="places__img"
        style={{backgroundImage: `url(${link || spinnerGif})`}}
      >
        {owner._id === currentUser._id && (
          <button
            type="button"
            onClick={handleOpenRemoveCard}
            className="places__remove-btn button-modifier"
          >
            <img alt="Remove card button" src={removeBtn} />
          </button>
        )}
      </div>

      <div className="places__info-wrapper">
        <h2 className="places__name">{name || "Loading..."}</h2>
        <div>
          <button
            type="button"
            onClick={() => {
              handleToggleLikedBtn(isLiked, _id);
            }}
            className={`places__like-btn button-modifier ${
              isLiked ? "places__like-btn__active" : ""
            }`}
          ></button>
          <p className="places__like-counter">{likes.length || 0}</p>
        </div>
      </div>
    </li>
  );
};
export default Card;
