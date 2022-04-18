import removeBtn from "../images/places/remove_btn.svg";
const Card = ({card, userId, spinnerGif, onCardClick}) => {
  const {name, link, likes, owner, _id} = card;
  const isLiked = likes.find((like) => like._id === userId);

  const openImagePopup = () => {
    onCardClick({name, link});
  };
  return (
    <li className="places__item">
      <div
        onClick={openImagePopup}
        className="places__img"
        style={{backgroundImage: `url(${link || spinnerGif})`}}
      ></div>
      <div className="places__info-wrapper">
        <h2 className="places__name">{name || "Loading..."}</h2>
        <div>
          <button
            type="button"
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
