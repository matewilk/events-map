import { useState, useEffect } from "react";

const useFilter = (data, filter) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const newFilteredData = data.filter((item) => {
      // Convert filter to lowercase for case-insensitive comparison
      // Ensure filter is a string before calling toLowerCase()
      const lowerCaseFilter =
        typeof filter === "string" ? filter.toLowerCase() : "";

      // Iterate over all properties of the item
      for (let key in item) {
        // Check if the item's property includes the filter string
        // Convert property to a string and then to lowercase for case-insensitive comparison
        if (
          item[key] !== undefined &&
          String(item[key]).toLowerCase().includes(lowerCaseFilter)
        ) {
          return true; // This item matches the filter, so we include it
        }
      }

      return false; // This item did not match the filter, so we exclude it
    });

    // Update the state with the new filtered data
    setFilteredData(newFilteredData);
  }, [data, filter]); // Re-run the effect whenever the data or filter changes

  // Return the filtered data for use in the component
  return filteredData;
};

export default useFilter;
