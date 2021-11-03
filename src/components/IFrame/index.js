import React from "react";

const IFrame = ({ url }) => {
  return (
    <div>
      <iframe src={url} />
    </div>
  );
};

export default IFrame;
