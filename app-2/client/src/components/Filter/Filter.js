import classes from "./Filter.module.css";

const Filter = () => {
  return (
    <div className={classes["pet-filter-container"]}>
      <div className={classes["filter-container"]}>
        <label htmlFor="favourite">Favourite</label>
        <select
          name="favourite"
          id="favourite"
          className={classes["form-select"]}
        >
          <option value="any">Any</option>
          <option value="favourite">Favourite</option>
          <option value="not favourite">Not favourite</option>
        </select>
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" className={classes["form-select"]}>
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
