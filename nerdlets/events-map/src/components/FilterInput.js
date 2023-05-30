// FilterInput.js
import React from "react";

const FilterInput = ({ filter, handleInputChange, clearFilter }) => (
  <div className="filter-input">
    <label className="filter-input-label">Filter</label>
    <input
      type="text"
      onChange={handleInputChange}
      value={filter}
      placeholder="Filter by any property"
      className={filter ? "has-content" : ""}
    />
    {filter && <button onClick={clearFilter}>X</button>}
  </div>
);

export default FilterInput;
