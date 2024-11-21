import React from "react";
import Curve from "./Curve";
import InputField from "./InputField";

const CurveDisplay = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Curve />
        <InputField />
      </div>
    </div>
  );
};

export default CurveDisplay;
