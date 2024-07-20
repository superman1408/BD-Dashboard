import React from "react";
import Navbar from "../Navbar/Navbar";
import { Container, Typography } from "@mui/material";

import "./style.css";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Container
        sx={{ display: "flex", justifyContent: "center", height: "400px" }}
      >
        <Typography variant="h5">Welcome to ASHKAM</Typography>
      </Container>
    </div>
  );
};

export default Dashboard;
