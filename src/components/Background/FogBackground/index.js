// import "../background.css";
import "./fog.css";
const FogBackground = ({ children }) => {
  return (
    <div class="background" id="fog-background">
      <div id="foglayer_01" class="fog">
        <div class="image01"></div>
        <div class="image02"></div>
      </div>
      <div id="foglayer_02" class="fog">
        <div class="image01"></div>
        <div class="image02"></div>
      </div>
      <div id="foglayer_03" class="fog">
        <div class="image01"></div>
        <div class="image02"></div>
      </div>
      {children}
    </div>
  );
};

export default FogBackground;
