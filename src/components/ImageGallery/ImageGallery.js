import { Component } from "react";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Load from "../Loader/Loader";
import Modal from "../Modal/Modal";

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    page: 1,
    status: "idle",
    moreBtnShow: false,
    modal: {
      show: false,
      url: null,
      tags: null,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page && this.state.images !== null) {
      this.setState({ status: "pending" });
      return setTimeout(
        () =>
          fetch(
            `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=${this.props.userKey}&image_type=photo&orientation=horizontal&per_page=12`
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(new Error("Упс, что-то пошло не так!"));
            })
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
            .catch((error) => this.setState({ error })),
        2000
      );
    }

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1, status: "pending", images: null });
      return setTimeout(
        () =>
          fetch(
            `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=${this.props.userKey}&image_type=photo&orientation=horizontal&per_page=12`
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(new Error("Упс, что-то пошло не так!"));
            })
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
            .catch((error) => this.setState({ error })),
        0
      );
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
    window.addEventListener("keydown", this.closeModal);

    if (this.state.images.find((image) => image.id === id)) {
      this.setState({ modal: { show: true, url, tags } });
    }
  };

  closeModal = (e) => {
    if (e.currentTarget === e.target || e.key === "Escape") {
      this.setState({ modal: { show: false } });
      window.removeEventListener("keydown", this.closeModal);
    }
  };

  render() {
    if (this.state.status === "idle") {
      return <h1>What are you interested now?</h1>;
    }

    if (this.state.status === "pending") {
      return (
        <>
          {this.state.images === null ? (
            <Load />
          ) : (
            <>
              <ul className="ImageGallery">
                <ImageGalleryItem
                  images={this.state.images}
                  onClickHandler={this.handlerOnClickItem}
                />
              </ul>
              <Load />
            </>
          )}
        </>
      );
    }

    if (this.state.status === "resolved") {
      if (this.state.images.length === 0) {
        return <p>Nothing found</p>;
      }

      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem
              images={this.state.images}
              onClickHandler={this.showModal}
            />
          </ul>
          {this.state.moreBtnShow && (
            <Button pageIncrement={this.pageIncrement} />
          )}
          {this.state.modal.show && (
            <Modal
              url={this.state.modal.url}
              tags={this.state.modal.tags}
              closeModal={this.closeModal}
            />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
