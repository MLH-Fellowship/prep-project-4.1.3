import Snowfall from "react-snowfall";
import "../background.css";
import "./snow.css";

const SnowBackground = ({ children }) => {
  return (
    <div className="background" id="snow">
      <Snowfall />
      {children}
    </div>
  );
};

export default SnowBackground;
