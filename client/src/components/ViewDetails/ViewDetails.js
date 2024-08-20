import React from "react";
import {
  Grid,
  Card,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";

const ViewDetails = () => {
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
          View Details Form
        </h3>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <Grid>
            <table>
              <thead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Overview</TableCell>
                  <TableCell align="right">Submitted By</TableCell>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </tbody>
            </table>
          </Grid>
          <Grid sx>
            <button>View</button>
            <button>Details</button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ViewDetails;
