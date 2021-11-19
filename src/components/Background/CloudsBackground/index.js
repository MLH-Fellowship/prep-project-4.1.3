import "../background.css";
import "./cloud.css";


const CloudsBackground = ({ children }) => {
  return (
    <div className="background" id="cloudysky">
      <div className="cloud-moving"></div>
        {children}
    </div>
  );
};

export default CloudsBackground;
