import React, { useState, useEffect, useMemo } from "react";

import useFilter from "./hooks/useFilter";

import MapView from "./components/MapView";
import TableView from "./components/TableView";
import Panel from "./components/Panel";
import DetailPanel from "./components/DetailsPanel";
import FilterInput from "./components/FilterInput";

import { data, cityLocations } from "./data/data";

const App = () => {
  const [filter, setFilter] = useState("");
  const filteredData = useFilter(data, filter);

  const eventCounts = filteredData.reduce((counts, item) => {
    const cityName = item["Tag.City"].toUpperCase();
    const narid = item["Tag.Narid"];
    if (!counts[cityName]) {
      counts[cityName] = {};
    }
    if (!counts[cityName][narid]) {
      counts[cityName][narid] = 0;
    }
    counts[cityName][narid]++;
    return counts;
  }, {});

  // selectedRow is the item that the user has clicked on
  const [selectedRow, setSelectedRow] = useState(null);

  // center for the map
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  // state for the side and bottom panels - this resizes the map
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);

  // update selected row when a table row is clicked
  const handleRowClick = (row) => {
    setSelectedRow(row);
    // and map center when a table row is clicked
    const cityName = row["Tag.City"].toUpperCase();
    const location = cityLocations[cityName];
    if (location) {
      setMapCenter([location.lat, location.lon]);
    }
  };

  // update the filter when the user inputs a value
  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <div>
      <FilterInput
        filter={filter}
        handleInputChange={handleInputChange}
        clearFilter={clearFilter}
      />

      <MapView
        filteredData={filteredData}
        cityLocations={cityLocations}
        center={mapCenter}
        selectRow={handleRowClick}
        isSidePanelOpen={isSidePanelOpen}
        isBottomPanelOpen={isBottomPanelOpen}
        eventCounts={eventCounts}
      />

      <Panel setIsBottomPanelOpen={setIsBottomPanelOpen}>
        <TableView
          filteredData={filteredData}
          selectRow={handleRowClick}
          selectedRow={selectedRow}
          cityLocations={cityLocations}
          eventCounts={eventCounts}
        />
      </Panel>
      <DetailPanel
        data={selectedRow || {}}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </div>
  );
};

export default App;
