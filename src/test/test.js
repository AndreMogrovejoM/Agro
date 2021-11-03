import React, { useEffect } from "react";
import ReactGa from "react-ga";

export default function test() {
  useEffect(() => {
    ReactGa.initialize("G-H5GTFXT36Z");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return <div>Hello</div>;
}
