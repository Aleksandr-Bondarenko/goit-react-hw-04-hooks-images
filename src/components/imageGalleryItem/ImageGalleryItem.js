import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

function ImageGalleryItem({ images, handleOpenModal }) {
  return images.map(({ id, tags, webformatURL, largeImageURL }) => (
    <li
      className={s.item}
      key={webformatURL} //Если на бэке случается баг с повторением картинок и id
      // key={id}
      onClick={() => handleOpenModal(id, tags, largeImageURL)}
    >
      <img src={webformatURL} alt={tags} className={s.img} />
    </li>
  ));
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClickHandler: PropTypes.func,
};
