import { useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import s from "./App.module.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(null);

  const handleSearchQueryOnSubmit = (inputValue) => {
    setSearchQuery(inputValue);
    setPage(1);
  };

  const handlePageIncrement = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleSearchQueryOnSubmit} />
      <ImageGallery
        searchQuery={searchQuery}
        page={page}
        handlePageIncrement={handlePageIncrement}
      />
    </div>
  );
}

export default App;
