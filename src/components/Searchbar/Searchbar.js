import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Seachbar.module.css";

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    searchImages: "",
  };

  handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmitQuery = (e) => {
    e.preventDefault();
    if (this.state.searchImages.trim(" ") === "") {
      return;
    }

    this.props.onSubmit(this.state.searchImages.toLowerCase());
    this.setState({ searchImages: "" });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmitQuery}>
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
            value={this.state.searchImages}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
