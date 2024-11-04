import { Card } from "@mui/material";
import React from "react";

const ChildView = ({ element }) => {
  console.log(element);
  
  return (
    <div>
      <Card
        elevation={20}
        sx={{
          display: {
            xs: "0",
            sm: "600",
          },
          bgcolor: "blue",
          color: "white",
          boxShadow: "5px",
          width: "auto",
          justifyContent: "center",
          margin: "5px",
        }}
      >
        <h2>{element.id}</h2>
      </Card>
    </div>
  );
};

export default ChildView;
