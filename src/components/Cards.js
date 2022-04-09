import removeBtn from "../images/places/remove_btn.svg";
export const Cards = ({
  card,
  userId,
  spinnerGif,
  handleToggleLikedBtn,
  openPopup,
  setRemoveCardId,
}) => {
  const { name, link, likes, owner, _id } = card;
  const isLiked = likes.find((like) => like._id === userId);
  const handleOpenRemoveCard = () => {
    setRemoveCardId(_id);
    openPopup("confirmRemoveOpen");
  };
  return (
    <li className="places__item">
      <div
        className="places__img"
        style={{ backgroundImage: `url(${link || spinnerGif})` }}
      >
        {owner._id === userId && (
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
            className={`places__like-btn button-modifier ${
              isLiked ? "places__like-btn__active" : ""
            }`}
            onClick={() => handleToggleLikedBtn(isLiked, _id)}
          ></button>
          <p className="places__like-counter">{likes.length || 0}</p>
        </div>
      </div>
    </li>
  );
};
