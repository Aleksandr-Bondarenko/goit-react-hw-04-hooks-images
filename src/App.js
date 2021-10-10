import { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

class App extends Component {
  state = {
    searchQuery: "",
  };

  USER_KEY = "22971640-b13f0b0978f0830ddac6b5885";

  handleSearchQueryOnSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="App">
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
