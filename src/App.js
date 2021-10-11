import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import s from "./App.module.css";

class App extends Component {
  state = {
    searchQuery: "",
  };

  USER_KEY = "22971640-b13f0b0978f0830ddac6b5885";

  handleSearchQueryOnSubmit = (inputValue) => {
    this.setState({ searchQuery: inputValue });
  };

  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleSearchQueryOnSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          userKey={this.USER_KEY}
        />
      </div>
    );
  }
}

export default App;
