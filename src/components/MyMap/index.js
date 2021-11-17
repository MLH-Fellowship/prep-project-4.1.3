import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const zoom = 13;

const MyMap = ({ lon, lat, name, temp }) => {
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lon: "",
  });
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      setCoordinates({ lat, lon });
    }
  }, [lat, lon]);

  useEffect(() => {
    const mapCenter = [coordinates.lat, coordinates.lon];
    if (map) {
      map.setView(mapCenter, zoom);
    }
  }, [map, coordinates]);

  const mapCenter = [coordinates.lat, coordinates.lon];

  const displayMap = (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      whenCreated={setMap}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      className="MyMap-container"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>
          <div className="MyMap-popup-container">
            <h2>{name}</h2>
            <h3>{temp}°C</h3>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );

  return <div className="MyMap">{displayMap}</div>;
};

export default MyMap;
