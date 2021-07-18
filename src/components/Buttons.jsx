import React from "react";
import "../App.css";

const Buttons = ({ label, handle }) => {
  return (
    <div>
      <button className="button" onClick={handle}>
        {label}
      </button>
    </div>
  );
};

export default Buttons;
