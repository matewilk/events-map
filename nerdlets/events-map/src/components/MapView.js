import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// fix for broken marker icons
// https://stackoverflow.com/questions/41590102/change-leaflet-marker-icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [38, 50],
  shadowSize: [50, 64],
  iconAnchor: [22, 50],
  shadowAnchor: [22, 64],
  popupAnchor: [-3, -50],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ filteredData, cityLocations }) => {
  return (
    <Map
      center={[51.505, -0.09]}
      zoom={2}
      style={{ height: "94vh", width: "100%" }}
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
