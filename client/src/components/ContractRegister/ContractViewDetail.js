import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Card, LinearProgress } from "@mui/material";

import getContractDetails from "../../action/contract";

const ContractViewDetail = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  let array = [];

  // Fetch posts from Redux store
  const contract = useSelector((state) => state.contract);

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          "@media (max-width: 600px)": {
            // backgroundColor: "lightgreen",
            padding: "10px", // Adjust padding for smaller screens
          },
        }}
      >
        {/* {loading ? (
          <div style={{ marginTop: "20px", paddingBottom: "200vh" }}>
            <LinearProgress />
            loading...
          </div>
        ) : ( */}
        <Container
          sx={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            padding: "12px",
            marginBottom: "50vh",
            width: "auto",
          }}
        >
          <Card
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: "column", // Optional, based on your design
              alignItems: "center", // Center contents horizontally
              justifyContent: "center", // Center contents vertically
              padding: "20px",
            }}
          >
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid>
                <table
                  className="time-sheet-table"
                  style={{
                    padding: "10px",
                    borderCollapse: "collapse",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: windowWidth <= 600 ? "30%" : "100%",
                    border: "1px solid black", // Optional: Add border for clarity
                  }}
                >
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Overview</th>
                      <th>Submitted By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </Grid>
            </Grid>
          </Card>
        </Container>
        {/* )} */}
      </Container>
    </div>
  );
};

export default ContractViewDetail;
