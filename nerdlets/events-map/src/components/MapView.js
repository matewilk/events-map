import React, { useEffect, useState } from "react";
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

const MapView = ({
  filteredData,
  cityLocations,
  center,
  selectRow,
  isBottomPanelOpen,
  isSidePanelOpen,
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
      {filteredData.map((item) => {
        const cityName = item["Tag.City"].toUpperCase();
        const location = cityLocations[cityName];
        if (location) {
          return (
            <Marker
              position={[location.lat, location.lon]}
              key={item.Externalid}
              onclick={() => selectRow(item)}
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
