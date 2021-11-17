import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

const zoom = 13;

function LocationMarker({ center, name, temp, fetchWeatherUsingCoordinates }) {
  const [position, setPosition] = useState(center);

  const map = useMapEvent("click", (e) => {
    // console.log({ e, map });
    setPosition(e.latlng);

    fetchWeatherUsingCoordinates(e.latlng);
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <div className="MyMap-popup-container">
          <h2>{name}</h2>
          <h3>{temp}°C</h3>
        </div>
      </Popup>
    </Marker>
  );
}

const MyMap = ({ lon, lat, name, temp, fetchWeatherUsingCoordinates }) => {
  const [map, setMap] = useState();

  const [position, setPosition] = useState({
    lat: lat,
    lng: lon,
  });

  useEffect(() => {
    if (lat && lon) {
      setPosition({ lat, lng: lon });
    }
  }, [lat, lon]);

  useEffect(() => {
    const mapCenter = [position.lat, position.lng];
    if (map) {
      map.setView(mapCenter, zoom);
    }
  }, [map, position]);

  const mapCenter = [position.lat, position.lng];

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

      <LocationMarker
        center={position}
        name={name}
        temp={temp}
        fetchWeatherUsingCoordinates={fetchWeatherUsingCoordinates}
      />
    </MapContainer>
  );

  return <div className="MyMap">{displayMap}</div>;
};

export default MyMap;
