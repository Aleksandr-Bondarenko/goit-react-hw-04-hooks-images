import { Component } from "react";

class Searchbar extends Component {
  state = {
    inputValue: "",
  };

  handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmitQuery = (e) => {
    e.preventDefault();
    if (this.state.inputValue.trim(" ") === "") {
      return;
    }

    this.props.onSubmit(this.state.inputValue.toLowerCase());
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmitQuery}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
