import classes from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = ({ cats }) => {
  return (
    <div className={classes["pet-cards-container"]}>
      {cats.map((cat) => (
        <Card
          key={cat.id}
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
