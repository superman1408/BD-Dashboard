import React from "react";

function Loading() {
  return (
    <div className="dots-container">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="dot"></div>
      ))}
    </div>
  );
}

export default Loading;
