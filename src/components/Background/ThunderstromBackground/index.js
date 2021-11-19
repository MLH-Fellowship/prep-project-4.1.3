import "../background.css"
import "./thunderstrom.css"
const ThunderstromBackground = ({ children}) => {
    return(
  <div id="thunderstorm" class="background">
    <div class="lightining"></div>
    {children}
  </div>
    )
}

export default ThunderstromBackground;