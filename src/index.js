import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";
import { useState } from "react";

import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="purple" maxRating={10} onSetRating={setMovieRating} />;
      <p>This Movie was rated {movieRating} Stars!</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={12}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={4} />
    <Test />
  </React.StrictMode>
);
