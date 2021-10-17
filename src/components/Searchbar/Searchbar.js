import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [searchImages, setSearchImages] = useState("");

  const handleSubmitQuery = (e) => {
    e.preventDefault();

    if (searchImages.trim(" ") === "") {
      setSearchImages("");
      return;
    }

    onSubmit(searchImages.toLowerCase());
    setSearchImages("");
  };

  const handleChangeInput = (e) => {
    switch (e.currentTarget.name) {
      case "searchImages":
        setSearchImages(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmitQuery}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchImages"
          value={searchImages}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
