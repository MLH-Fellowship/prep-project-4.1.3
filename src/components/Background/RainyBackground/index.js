import "./rainy.css";

const RainyBackground = ({ children }) => {
  return (
    <div className="background" id="rainy">
      <div className="rain">{children}</div>
    </div>
  );
};

export default RainyBackground;
