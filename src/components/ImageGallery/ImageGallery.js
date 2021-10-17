import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Load from "../Loader/Loader";
import Modal from "../Modal/Modal";
import api from "../../services/images-finder-api";
import s from "./ImageGallery.module.css";

function ImageGallery({ searchQuery, page, handlePageIncrement }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [moreBtnShow, setMoreBtnShow] = useState(false);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [modalTags, setModalTags] = useState(null);

  useEffect(() => {
    setStatus("pending");
    if (searchQuery.trim(" ") === "") {
      setStatus("idle");
      return;
    }

    let prevImagesAmount = null;

    api
      .fetchImages(searchQuery, page)
      .then((data) => {
        page === 1
          ? setImages(data.hits)
          : setImages((prevImages) => {
              prevImagesAmount = prevImages.length;
              return [...prevImages, ...data.hits];
            });

        setStatus("resolved");

        // console.log("Всего картинок", data.totalHits);
        // console.log(
        //   "Количество картинок на странице ДО запроса:",
        //   prevImagesAmount
        // );
        // console.log("Кол-во картинок пришло с бекэнда:", data.hits.length);

        setMoreBtnShow(
          data.totalHits > 12
            ? prevImagesAmount + data.hits.length !== data.totalHits
            : false
        );

        scrollTo();
      })
      .catch((error) => {
        setStatus("rejected");
        setError(error.message);
      });
  }, [searchQuery, page, error]);

  const scrollTo = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const showModal = (id, tags, url) => {
    if (images.find((image) => image.id === id)) {
      document.querySelector("body").style.overflowY = "hidden";
      setModalUrl(url);
      setModalTags(tags);
      setModalShow(true);
    }
  };

  const hideModal = (e) => {
    if (e.currentTarget === e.target || e.key === "Escape") {
      document.querySelector("body").style.overflowY = "visible";
      setModalShow(false);
      window.removeEventListener("keydown", hideModal);
    }
  };

  if (status === "idle") {
    return <h1 className={s.title}>What are you interested now?</h1>;
  }

  if (status === "pending") {
    return (
      <>
        {page === 1 ? (
          <Load />
        ) : (
          <>
            <ul className={s.gallery}>
              <ImageGalleryItem images={images} handleOpenModal={showModal} />
            </ul>
            <Load />
          </>
        )}
      </>
    );
  }

  if (status === "resolved") {
    return images.length === 0 ? (
      <p className={s.message}>
        Nothing was found, please try another request!
      </p>
    ) : (
      <>
        <ul className={s.gallery}>
          <ImageGalleryItem images={images} handleOpenModal={showModal} />
        </ul>
        {moreBtnShow && <Button handlePageIncrement={handlePageIncrement} />}
        {modalShow && (
          <Modal url={modalUrl} tags={modalTags} hideModal={hideModal} />
        )}
      </>
    );
  }

  if (status === "rejected") {
    return <h1 className={s.error}>{error}</h1>;
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  handlerPageIncrement: PropTypes.func,
};
