import Loader from "react-loader-spinner";

function Load() {
  return (
    <Loader
      type="ThreeDots"
      color="#303f9f"
      height={30}
      width={60}
      timeout={30000}
      style={{ margin: "0 auto" }}
    />
  );
}

export default Load;
