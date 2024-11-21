import React from "react";

const InputField = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <label>Enter Time : </label>
        <input type="text" placeholder="Enter Time" />
      </div>
      <div style={{ display: "flex" }}>
        <label>Enter Mid - Time : </label>
        <input type="text" placeholder="Enter Mid-Time" />
      </div>
      <div style={{ display: "flex" }}>
        <label>Enter Growth Rate : </label>
        <input type="text" placeholder="Enter Growth Rate" />
      </div>
    </div>
  );
};

export default InputField;
