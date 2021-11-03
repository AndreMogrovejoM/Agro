import React from "react";

const CloseIcon = ({id, className}) => {
  return (
    <div id={id} className={className}>
      <svg
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
      >
        <ellipse
          cx="256"
          cy="256"
          rx="256"
          ry="255.832"
        />
        <g transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 77.26 32)">
          <rect
            x="3.98"
            y="-427.615"
            width="55.992"
            height="285.672"
          />
          <rect
            x="-110.828"
            y="-312.815"
            width="285.672"
            height="55.992"
          />
        </g>
      </svg>
    </div>
  );
};

export default CloseIcon;
