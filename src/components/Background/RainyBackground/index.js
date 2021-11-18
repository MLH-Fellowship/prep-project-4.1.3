import "./rainy.css";

const RainyBackground = ({ children }) => {
  return (
    <div className="background" id="rainy">
      <div className="rain"></div>
      {children}
    </div>
  );
};

export default RainyBackground;
