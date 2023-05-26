import React, { useState } from "react";

import useFilter from "./hooks/useFilter";

import MapView from "./components/MapView";
import TableView from "./components/TableView";
import Panel from "./components/Panel";

import { data, cityLocations } from "./data/data";

const App = () => {
  const [filter, setFilter] = useState({});
  const filteredData = useFilter(data, filter);

  // update the filter when the user inputs a value
  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Filter by name"
      />

      <MapView filteredData={filteredData} cityLocations={cityLocations} />

      <Panel>
        <TableView filteredData={filteredData} />
      </Panel>
    </div>
  );
};

export default App;
