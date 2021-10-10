import Loader from "react-loader-spinner";

function Load() {
  return (
    <Loader
      className="Spinner"
      type="ThreeDots"
      color="#303f9f"
      height={30}
      width={60}
      timeout={5000}
    />
  );
}

export default Load;
