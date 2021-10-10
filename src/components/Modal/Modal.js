function Modal({ url, tags, closeModal }) {
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={url} alt={tags} />
      </div>
    </div>
  );
}

export default Modal;
