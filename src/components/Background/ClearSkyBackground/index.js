import "../background.css";
import "./clearsky.css"

const ClearSkyBackground = ({ children }) => {
 
  return (
    <div className="background" id="clearsky" >
      {children}
      </div>
  );
};

export default ClearSkyBackground;
