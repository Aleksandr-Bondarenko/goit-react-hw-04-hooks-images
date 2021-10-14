import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ handlePageIncrement }) {
  return (
    <button className={s.button} type="button" onClick={handlePageIncrement}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  handlePageIncrement: PropTypes.func,
};
