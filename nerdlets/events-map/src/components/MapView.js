import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ filteredData, cityLocations }) => {
  return (
    <Map
      center={[51.505, -0.09]}
      zoom={2}
      style={{ height: "95vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredData.map((item) => {
        const cityName = item["Tag.City"].toUpperCase();
        const location = cityLocations[cityName];
        if (location) {
          return (
            <Marker
              position={[location.lat, location.lon]}
              key={item.Externalid}
            >
              <Popup>
                <div>
                  <h3>{item.Title}</h3>
                  <p>
                    {cityName}, {item["Tag.Country"]}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </Map>
  );
};

export default MapView;
