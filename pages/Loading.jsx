// Loading.jsx

import React from "react";
import { useLoading } from "../context/LoadingContext";

const Loading = () => {
  const { isLoading } = useLoading();

  return (
    <div id="container" style={{ display: isLoading ? "flex" : "none" }}>
      <div className="divider" aria-hidden="true"></div>
      <p className="loading-text" aria-label="Loading">
        <span className="letter" aria-hidden="true">
          L
        </span>
        <span className="letter" aria-hidden="true">
          o
        </span>
        <span className="letter" aria-hidden="true">
          a
        </span>
        <span className="letter" aria-hidden="true">
          d
        </span>
        <span className="letter" aria-hidden="true">
          i
        </span>
        <span className="letter" aria-hidden="true">
          n
        </span>
        <span className="letter" aria-hidden="true">
          g
        </span>
      </p>
    </div>
  );
};

export default Loading;
