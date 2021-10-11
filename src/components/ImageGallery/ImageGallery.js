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
    userKey: PropTypes.string,
  };

  state = {
    images: null,
    page: 1,
    status: "idle",
    moreBtnShow: false,
    error: null,

    modal: {
      modalShow: false,
      url: null,
      tags: null,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, userKey } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ page: 1, status: "pending" });

      return api
        .fetchImages(searchQuery, userKey)
        .then((data) => {
          this.setState({
            images: data.hits,
            status: "resolved",
            moreBtnShow: false,
          });

          if (data.totalHits > 12) {
            this.setState({
              moreBtnShow: true,
            });
          }

          this.scrollTo();
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }

    if (prevState.page < this.state.page) {
      this.setState({ status: "pending" });

      return api
        .fetchImages(searchQuery, userKey, this.state.page)
        .then((data) => {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            status: "resolved",
          }));

          if (
            data.hits.length < 12 ||
            prevState.images.length + data.hits.length === data.totalHits
          ) {
            this.setState({
              moreBtnShow: false,
            });
          }

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

  pageIncrement = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  showModal = (id, tags, url) => {
    window.addEventListener("keydown", this.hideModal);
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
      page,
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
          {page === 1 ? (
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
          {moreBtnShow && <Button pageIncrement={this.pageIncrement} />}
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
