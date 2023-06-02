import React, { useState } from "react";

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

  // selectedRow is the item that the user has clicked on
  const [selectedRow, setSelectedRow] = useState(null);

  // center for the map
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

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
      />

      <Panel>
        <TableView
          filteredData={filteredData}
          selectRow={handleRowClick}
          selectedRow={selectedRow}
        />
      </Panel>
      <DetailPanel data={selectedRow || {}} />
    </div>
  );
};

export default App;
