import classes from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = ({ cats, setCats }) => {

  const updateFavourite = (id, favoured) => {
    setCats((currentCats) => {
      const index = currentCats.findIndex(cat => cat.id === id);
      const updatedCats = [...currentCats];
      updatedCats[index] = {
        ...updatedCats[index],
        favoured
      }
      return updatedCats;
    });
  }

  return (
    <div className={classes["pet-cards-container"]}>
      {cats.map((cat) => (
        <Card
          key={cat.id}
          id={cat.id}
          name={cat.name}
          phone={cat.phone}
          email={cat.email}
          image={cat.image}
          favoured={cat.favoured}
          updateFavourite={updateFavourite}
        />
      ))}
    </div>
  );
};

export default Cards;
