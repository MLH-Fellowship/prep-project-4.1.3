import "../background.css";
import "./cloud.css";


const CloudsBackground = ({ children }) => {
  return (
    <div className="background" id="cloudysky">
      <div className="cloud-moving">{children}</div>
    </div>
  );
};

export default CloudsBackground;
