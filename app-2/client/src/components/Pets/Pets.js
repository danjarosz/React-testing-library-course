import {useEffect, useState} from "react";
import axios from "axios";
import classes from "./Pets.module.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";


const Pets = () => {
    const [cats, setCats] = useState([])

    const fetchCats = async () => {
        const response = await axios.get("http://localhost:4000/cats");
        setCats(response.data);
    }

    useEffect(() => {
        fetchCats();
    }, [])

  return (
      <div className="container">
        <div className={classes["app-container"]}>
            <Filter/>
            <Cards cats={cats} />
        </div>
      </div>
  );
};

export default Pets;
