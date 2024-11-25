import React from "react";
import Curve from "./Curve";

const CurveDisplay = () => (
  <div>
    <h1 className="p-3 font-bold">Cummulative Progress</h1>
    <Curve
      duration1={12}
      midpoint1={6}
      growthRate1={0.6}
      exponent1={1}
      duration2={12}
      midpoint2={6}
      growthRate2={1}
      exponent2={1}
    />
  </div>
);

export default CurveDisplay;
