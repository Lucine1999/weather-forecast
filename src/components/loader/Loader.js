import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loader.css";

function Loader() {
  return (
    <div>
      <CircularProgress className="loader-style" size={80} />
    </div>
  );
}

export default Loader;
