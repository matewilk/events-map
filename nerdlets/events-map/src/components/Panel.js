import React, { useState } from "react";

const Panel = ({ children, setIsBottomPanelOpen }) => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => {
    setOpen(!open);
    setIsBottomPanelOpen(!open);
  };

  return (
    <div className={`panel ${open ? "open" : ""}`}>
      {children}
      <button
        onClick={togglePanel}
        className={`panel-button ${open ? "open" : ""}`}
      >
        {open ? "▼ Hide Data ▼" : "▲ Show Data ▲"}
      </button>
    </div>
  );
};

export default Panel;
