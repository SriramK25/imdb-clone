import { useContext, useState } from "react";
import { MovieContext } from "../Contexts/MovieProvider";

function UserRating() {
  const { isModalOpen, modalData, setIsModalOpen, handleRating } =
    useContext(MovieContext);

  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  if (isModalOpen)
    return (
      <>
        <div
          className="overlay"
          onClick={() => {
            setIsModalOpen(false);
            setRating(0);
          }}
        ></div>
        <div className="rating">
          <div className="rating-container">
            <div
              style={{
                scale: `${1 + rating * 0.1}`,
                transform: `translate(${-50 - rating * -2.5}%, -45%)`,
              }}
              className="rating-count"
            >
              <span className="rating-number">
                {tempRating ? tempRating : rating ? rating : "?"}
              </span>
            </div>

            <div className="rating-content">
              <p className="rating-content--text">Rate this</p>

              <h4 className="rating-content--heading">{modalData.Title}</h4>
            </div>

            <StarContainer
              rating={rating}
              setRating={setRating}
              tempRating={tempRating}
              setTempRating={setTempRating}
            />
            <button
              className="btn rate-btn"
              disabled={rating ? false : true}
              onClick={() => {
                handleRating(modalData, rating);
                setIsModalOpen(false);
                setRating(0);
              }}
            >
              Rate
            </button>
          </div>
        </div>
      </>
    );
}

function StarContainer({ rating, setRating, tempRating, setTempRating }) {
  return (
    <div className="star-container">
      {Array.from({ length: 10 }, (el, index) => (
        <Star
          full={
            tempRating
              ? tempRating >= index + 1
              : rating
              ? rating >= index + 1
              : false
          }
          index={index}
          setRating={setRating}
          setTempRating={setTempRating}
        />
      ))}
    </div>
  );
}

function Star({ full, index, setRating, setTempRating }) {
  return (
    <span
      className="star"
      onMouseEnter={() => {
        setTempRating(index + 1);
      }}
      onMouseLeave={() => {
        setTempRating(0);
      }}
      onClick={() => setRating(index + 1)}
    >
      {full ? (
        <ion-icon name="star"></ion-icon>
      ) : (
        <ion-icon name="star-outline"></ion-icon>
      )}
    </span>
  );
}

export default UserRating;
