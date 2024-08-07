import React from "react";
import { Card, Container } from "@mui/material";

const EntryDetails = () => {
  return (
    <Container>
      <Card sx={{ justifyContent: "center", marginLeft: "50px" }}>
        <typography variant="h4">Entry Detail Page</typography>
        <label>project Name</label>
        <input type="text" placeholder="Enter Project Name" />
        <label>Date</label>
        <input type="date" placeholder="Enter Project Name" />
        <label>Month</label>
        <input type="month" placeholder="Enter Project Name" />
        <label>Activities</label>
        <input type="activities" placeholder="Enter Project Name" />
        <div>
          <label>Civil & Structure</label>
          <textarea />
          <label>Planned Work For Tommorrow</label>
          <textarea />
          <label>Material requirement</label>
          <textarea />
          <label>Procurement status</label>
          <textarea />
        </div>
        <label>Male labour</label>
        <textarea />
        <label>Female labour</label>
        <textarea />
      </Card>
    </Container>
  );
};

export default EntryDetails;
