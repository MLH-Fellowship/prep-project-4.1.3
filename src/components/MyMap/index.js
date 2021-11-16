import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = () => {
  return (
    <div className="MyMap">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        className="MyMap-container"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMap;
