import classes from "./Cards.module.css";
import Card from "../Card/Card";
import {useContext} from "react";
import {PetsContext} from "../Pets/Pets";

const Cards = () => {
  const { cats } = useContext(PetsContext);

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
        />
      ))}
    </div>
  );
};

export default Cards;
