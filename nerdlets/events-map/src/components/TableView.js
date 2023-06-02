import React from "react";

const TableView = ({ filteredData, selectRow, selectedRow }) => {
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
          {filteredData.map((item) => (
            <tr
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
