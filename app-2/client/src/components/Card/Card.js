import classes from "./Card.module.css";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";
import {useCallback, useEffect, useState} from "react";

const Card = ({ id, name, phone, email, image, favoured, updateFavourite }) => {
  const [isFavoured, setIsFavoured] = useState(favoured);

  const toggleFavoured = useCallback(() => {
      setIsFavoured((prev) => !prev);
  }, []);

  useEffect(() => {
      updateFavourite(id, isFavoured);
  }, [isFavoured, id])

  return (
    <article className={classes["card"]}>
      <div className={classes["card-header"]}>
        <img
          src={image.url}
          alt={image.alt}
          className={classes["card-image"]}
        />
        <button className={classes["heart"]} onClick={toggleFavoured}>
          {isFavoured ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="outlined heart" />
          )}
        </button>
      </div>
      <div className={classes["card-content"]}>
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
