import s from "./Modal.module.css";
import PropTypes from "prop-types";
import Load from "../Loader/Loader";

function Modal({ url, tags, hideModal }) {
  return (
    <div className={s.overlay} onClick={hideModal}>
      <div className={s.modalLoader}>
        <Load />
      </div>
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
