import React, { useState } from "react";

const Panel = ({ children }) => {
  const [open, setOpen] = useState(false);

  const togglePanel = () => {
    setOpen(!open);
  };

  return (
    <div className={`panel ${open ? "open" : ""}`}>
      {children}
      <button onClick={togglePanel} className="panel-button">
        {open ? "Hide Data" : "Show Data"}
      </button>
    </div>
  );
};

export default Panel;
