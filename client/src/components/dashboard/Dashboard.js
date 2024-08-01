import React from "react";
import Navbar from "../Navbar/Navbar";
import { Card, Container, Typography } from "@mui/material";

import "./style.css";

const Dashboard = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Container
        sx={{ display: "flex", justifyContent: "center", height: "400px" }}
      >
        <Typography variant="h5">Welcome to ASHKAM</Typography>
        <Card sx={{ display: "flex", bgcolor: "white", alignItems: "end" }}>
          <button>Entry</button>
          <button>Details</button>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
