import "../background.css"
import "../ThunderstromBackground/thunderstrom.css";

const TornadoBackground = ({ children}) => {
    return(
  <div id="tornado" class="background">
    <div class="lightining"></div>
    {children}
  </div>
    )
}

export default TornadoBackground;