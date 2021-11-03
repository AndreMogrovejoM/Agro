import React from "react";
import "../../components/LinkUrl/exel.css";

const App = (url) => {
  return (
    <div className="calendy">
      <iframe
        title="Calendy"
        src={url.value}
        width="100%"
        height="950"
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default App;

// "https://calendly.com/melvinsalcedo169"
