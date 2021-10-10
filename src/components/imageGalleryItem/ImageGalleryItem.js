function ImageGalleryItem({ images, onClickHandler }) {
  return images.map(({ id, tags, webformatURL, largeImageURL }) => (
    <li
      className="ImageGalleryItem"
      key={id}
      onClick={() => onClickHandler(id, tags, largeImageURL)}
    >
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  ));
}

export default ImageGalleryItem;
