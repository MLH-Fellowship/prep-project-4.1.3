import "./rainy.css";

const RainyBackground = ({ children }) => {
  return (
    <div class="background" id="rainy">
      <div class="rain"></div>
      {children}
    </div>
  );
};

export default RainyBackground;
