import React from "react";
import { Card, Container, Grid } from "@mui/material";

const EntryDetails = () => {
  return (
    <Grid
      padding="10px"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        elevation={10}
        sx={{
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#f2f2f2",
          borderCollapse: "collapse",
          marginBottom: "130px",
          // border: "1px solid black",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontFamily: "Roboto ",
            color: "#0d325c",
          }}
        >
          Entry Detail Form
        </h3>
        <label>project Name</label>
        <input type="text" placeholder="Enter Project Name" />
        <label>Date</label>
        <input type="date" placeholder="Enter Project Name" />
        <label>Month</label>0 <label>Activities</label>
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
    </Grid>
  );
};

export default EntryDetails;
