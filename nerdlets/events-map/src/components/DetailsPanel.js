import React, { useState } from "react";

const DetailsPanel = ({ data, setIsSidePanelOpen }) => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => {
    setOpen(!open);
    setIsSidePanelOpen(!open);
  };

  return (
    <div className={`details-panel ${open ? "open" : ""}`}>
      <button
        onClick={togglePanel}
        className={`details-panel-button ${open ? "open" : ""}`}
      >
        {open ? "▲ Hide Details ▲" : "▼ Show Details ▼"}
      </button>
      {open && (
        <div className="details-panel-content">
          {/* Iterate over data properties and display them */}
          {Object.entries(data).map(([key, value]) => (
            <div className="details-panel-item" key={key}>
              <strong className="details-panel-key">{key}:</strong>
              <span className="details-panel-value">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailsPanel;
