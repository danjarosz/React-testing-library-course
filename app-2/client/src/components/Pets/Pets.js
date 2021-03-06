import {createContext, useEffect, useState} from "react";
import axios from "axios";
import classes from "./Pets.module.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";

export const PetsContext = createContext({
    cats: [],
    setCats: () => {}
});

const Pets = () => {
    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [filters, setFilters] = useState({
        gender: "any",
        favourite: "any"
    });

    const fetchCats = async () => {
        const response = await axios.get("http://localhost:4000/cats");
        setCats(response.data);
        setFilteredCats(response.data);
    }

    useEffect(() => {
        fetchCats();
    }, []);

    useEffect(() => {
        let catsFiltered = [...cats];
        if (filters.gender !== "any") {
            catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender);
        }
        if (filters.favourite !== "any") {
            catsFiltered = catsFiltered.filter(cat => {
                const favouredValue = cat.favoured ? "favourite" : "not favourite";
                return favouredValue === filters.favourite
            })
        }
        setFilteredCats(catsFiltered);
    }, [filters])

  return (
      <div className="container">
        <div className={classes["app-container"]}>
            <PetsContext.Provider value={{
                cats: filteredCats,
                setCats,
            }}>
                <Filter filters={filters} setFilters={setFilters}/>
                <Cards />
            </PetsContext.Provider>
        </div>
      </div>
  );
};

export default Pets;
