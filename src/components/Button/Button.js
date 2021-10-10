function Button({ pageIncrement }) {
  return (
    <button
      className="Button"
      type="button"
      onClick={() => {
        pageIncrement();
      }}
    >
      Load More
    </button>
  );
}

export default Button;
