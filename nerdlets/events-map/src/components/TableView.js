import React, { useEffect, useRef } from "react";

const TableView = ({ filteredData, selectRow, selectedRow }) => {
  const rowRefs = useRef([]); // Array of refs for each table row

  // Scroll to the selected row when it changes
  useEffect(() => {
    if (selectedRow) {
      const rowIndex = filteredData.findIndex(
        (item) => item.Externalid === selectedRow.Externalid
      );
      if (rowIndex !== -1 && rowRefs.current[rowIndex]) {
        rowRefs.current[rowIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [selectedRow, filteredData]);

  return (
    <div className="table-view">
      <table>
        <thead>
          <tr>
            <th>External ID</th>
            <th>Priority</th>
            <th>Source</th>
            <th>State</th>
            <th>Tag.Ci</th>
            <th>IP Address</th>
            <th>Title</th>
            <th>Region</th>
            <th>Country</th>
            <th>City</th>
            <th>Datacentre</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              ref={(el) => (rowRefs.current[index] = el)}
              key={item.Externalid}
              onClick={() => selectRow(item)}
              className={
                selectedRow && selectedRow.Externalid === item.Externalid
                  ? "selected"
                  : ""
              }
            >
              <td>{item.Externalid}</td>
              <td>{item.Priority}</td>
              <td>{item.Source}</td>
              <td>{item.State}</td>
              <td>{item["Tag.Ci"]}</td>
              <td>{item["Tag.Ipaddress"]}</td>
              <td>{item.Title}</td>
              <td>{item["Tag.Region"]}</td>
              <td>{item["Tag.Country"]}</td>
              <td>{item["Tag.City"]}</td>
              <td>{item["Tag.Datacentre"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
