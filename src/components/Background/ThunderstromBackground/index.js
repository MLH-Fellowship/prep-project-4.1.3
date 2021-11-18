import "../background.css"
import "./thunderstrom.css"
const ThunderstromBackground = ({ children}) => {
    return(
<div class="whole">
  <div id="thunderstorm" class="background">
    <div class="lightining"></div>
    {children}
  </div>
</div>
    )
}

export default ThunderstromBackground;