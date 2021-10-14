import { Component } from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Load from "../Loader/Loader";
import Modal from "../Modal/Modal";
import api from "../../services/images-finder-api";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
    page: PropTypes.number,
    handlerPageIncrement: PropTypes.func,
  };

  state = {
    images: [],
    status: "idle",
    moreBtnShow: false,
    error: null,

    modal: {
      modalShow: false,
      url: null,
      tags: null,
    },
  };

  componentDidUpdate(prevProps) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.setState({ status: "pending" });

      return api
        .fetchImages(searchQuery, page)
        .then((data) => {
          this.setState((prevState) => ({
            images:
              prevState.images && page > 1
                ? [...prevState.images, ...data.hits]
                : data.hits,
            status: "resolved",
            moreBtnShow:
              prevProps.searchQuery === searchQuery
                ? prevState.images.length + data.hits.length !== data.totalHits
                : data.totalHits > 12,
          }));

          this.scrollTo();
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  scrollTo = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  showModal = (id, tags, url) => {
    if (this.state.images.find((image) => image.id === id)) {
      document.querySelector("body").style.overflowY = "hidden";
      this.setState({ modal: { modalShow: true, url, tags } });
    }
  };

  hideModal = (e) => {
    if (e.currentTarget === e.target || e.key === "Escape") {
      document.querySelector("body").style.overflowY = "visible";
      this.setState({ modal: { modalShow: false } });
      window.removeEventListener("keydown", this.hideModal);
    }
  };

  render() {
    const {
      images,
      status,
      moreBtnShow,
      error,
      modal: { modalShow, url, tags },
    } = this.state;

    if (status === "idle") {
      return <h1 className={s.title}>What are you interested now?</h1>;
    }

    if (status === "pending") {
      return (
        <>
          {this.props.page === 1 ? (
            <Load />
          ) : (
            <>
              <ul className={s.gallery}>
                <ImageGalleryItem
                  images={images}
                  handleOpenModal={this.showModal}
                />
              </ul>
              <Load />
            </>
          )}
        </>
      );
    }

    if (status === "resolved") {
      if (images.length === 0) {
        return (
          <p className={s.message}>
            Nothing was found, please try another request!
          </p>
        );
      }

      return (
        <>
          <ul className={s.gallery}>
            <ImageGalleryItem
              images={images}
              handleOpenModal={this.showModal}
            />
          </ul>
          {moreBtnShow && (
            <Button handlePageIncrement={this.props.handlePageIncrement} />
          )}
          {modalShow && (
            <Modal url={url} tags={tags} hideModal={this.hideModal} />
          )}
        </>
      );
    }

    if (status === "rejected") {
      return <h1 className={s.error}>{error.message}</h1>;
    }
  }
}

export default ImageGallery;
