import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// fix for broken marker icons
// https://stackoverflow.com/questions/41590102/change-leaflet-marker-icon
import icon from "leaflet/dist/images/marker-icon.png";
import warningIcon from "../assets/marker-icon-yellow.png";
import alertIcon from "../assets/marker-icon-red.png";
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

let WarningIcon = L.icon({
  iconUrl: warningIcon,
  shadowUrl: iconShadow,
  iconSize: [38, 50],
  shadowSize: [50, 64],
  iconAnchor: [22, 50],
  shadowAnchor: [22, 64],
  popupAnchor: [-3, -50],
});

let AlertIcon = L.icon({
  iconUrl: alertIcon,
  shadowUrl: iconShadow,
  iconSize: [38, 50],
  shadowSize: [50, 64],
  iconAnchor: [22, 50],
  shadowAnchor: [22, 64],
  popupAnchor: [-3, -50],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({
  filteredData,
  cityLocations,
  center,
  selectRow,
  isBottomPanelOpen,
  isSidePanelOpen,
  eventCounts,
}) => {
  // This state is used to resize the map when the side or bottom panels are open.
  const [mapStyle, setMapStyle] = useState({
    height: "94vh",
    width: "100%",
  });

  // This effect runs when isSidePanelOpen or isBottomPanelOpen changes.
  // It forces the map to resize and recenter.
  useEffect(() => {
    setTimeout(() => {
      setMapStyle({
        height: isBottomPanelOpen ? "50vh" : "94vh",
        width: isSidePanelOpen ? "60%" : "100%",
      });
      window.dispatchEvent(new Event("resize"));
    }, 400);
  }, [isSidePanelOpen, isBottomPanelOpen]);

  return (
    <Map center={center} zoom={5} style={mapStyle}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(cityLocations).map(([cityName, location]) => {
        const eventCount = Object.values(eventCounts[cityName] || {}).reduce(
          (a, b) => a + b,
          0
        );
        let markerIcon;
        if (eventCount > 2) {
          markerIcon = AlertIcon;
        } else if (eventCount >= 1) {
          markerIcon = WarningIcon;
        } else {
          markerIcon = DefaultIcon;
        }
        return (
          <Marker
            position={[location.lat, location.lon]}
            icon={markerIcon}
            key={cityName}
          >
            <Popup>
              <div>
                <h3>{cityName}</h3>
                <p>
                  Lat: {location.lat}, Lon: {location.lon}
                </p>
                <p>Number of events: {eventCount}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};

export default MapView;
