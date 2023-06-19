import React, { useEffect, useRef, useState } from "react";

const EventRow = ({ event, selectRow }) => (
  <tr onClick={() => selectRow(event)}>
    <td>{event.Externalid}</td>
    <td>{event.Priority}</td>
    <td>{event.Source}</td>
    <td>{event.State}</td>
    <td>{event["Tag.Ci"]}</td>
    <td>{event["Tag.Ipaddress"]}</td>
    <td>{event.Title}</td>
    <td>{event["Tag.Region"]}</td>
    <td>{event["Tag.Datacentre"]}</td>
    <td>{event["Tag.Narid"]}</td>
  </tr>
);

const EventTable = ({ events, selectRow }) => (
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
        <th>Datacentre</th>
        <th>Narid</th>
      </tr>
    </thead>
    <tbody>
      {events.map((event) => (
        <EventRow key={event.Externalid} event={event} selectRow={selectRow} />
      ))}
    </tbody>
  </table>
);

const DatacenterRow = ({
  datacenter,
  location,
  events,
  selectRow,
  openDatacenter,
  setOpenDatacenter,
  eventCounts,
}) => {
  const toggleDatacenter = () => {
    if (openDatacenter === datacenter) {
      setOpenDatacenter(null);
    } else {
      setOpenDatacenter(datacenter);
    }
  };

  return (
    <React.Fragment>
      <tr
        onClick={toggleDatacenter}
        className={openDatacenter === datacenter ? "selected" : ""}
      >
        <td>{datacenter}</td>
        <td>{location.lon}</td>
        <td>{location.lat}</td>
        <td>{events.length}</td>
        <td>
          {eventCounts[datacenter]
            ? Object.entries(eventCounts[datacenter]).map(([narid, count]) => (
                <span key={narid} className="event-count-pill">
                  {`${narid}: ${count}`}{" "}
                </span>
              ))
            : "No events"}
        </td>
      </tr>
      {openDatacenter === datacenter && (
        <tr>
          <td colSpan={5}>
            <EventTable events={events} selectRow={selectRow} />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

const DatacenterTable = ({
  cityLocations,
  filteredData,
  selectRow,
  openDatacenter,
  setOpenDatacenter,
  eventCounts,
}) => {
  const datacenterEvents = (datacenter) => {
    return filteredData.filter(
      (item) => item["Tag.City"].toUpperCase() === datacenter
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Datacenter</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Number of Events</th>
          <th>Narid</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(cityLocations).map(([datacenter, location], index) => {
          const events = datacenterEvents(datacenter);
          return (
            <DatacenterRow
              key={datacenter}
              datacenter={datacenter}
              location={location}
              events={events}
              selectRow={selectRow}
              openDatacenter={openDatacenter}
              setOpenDatacenter={setOpenDatacenter}
              eventCounts={eventCounts}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const TableView = ({
  filteredData,
  selectRow,
  selectedRow,
  cityLocations,
  eventCounts,
}) => {
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

  const [openDatacenter, setOpenDatacenter] = useState(null);

  return (
    <div className="table-view">
      <DatacenterTable
        cityLocations={cityLocations}
        filteredData={filteredData}
        selectRow={selectRow}
        openDatacenter={openDatacenter}
        setOpenDatacenter={setOpenDatacenter}
        eventCounts={eventCounts}
      />
    </div>
  );
};

export default TableView;
