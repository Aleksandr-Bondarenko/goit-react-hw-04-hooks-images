import s from "./Modal.module.css";
import PropTypes from "prop-types";

function Modal({ url, tags, hideModal }) {
  return (
    <div className={s.overlay} onClick={hideModal}>
      <div className={s.modal}>
        <img src={url} alt={tags} className={s.modalImg} />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.string,
  hideModal: PropTypes.func,
};
