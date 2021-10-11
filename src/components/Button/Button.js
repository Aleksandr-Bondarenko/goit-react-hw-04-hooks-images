import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ pageIncrement }) {
  return (
    <button className={s.button} type="button" onClick={pageIncrement}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  pageIncrement: PropTypes.func,
};
