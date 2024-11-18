import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Card, LinearProgress, Button } from "@mui/material";

import { getContractDetails } from "../../action/contract";

const ContractViewDetail = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Fetch posts from Redux store
  const contract = useSelector((state) => state.contract);

  useEffect(() => {
    setLoading(true);
    dispatch(getContractDetails()).then(() => {
      setLoading(false);
    });
  }, [contract]);

  const handleView = (id) => {
    // navigate(`/${post._id}/contractview`);
    console.log(id);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        "@media (max-width: 600px)": {
          // backgroundColor: "lightgreen",
          padding: "10px", // Adjust padding for smaller screens
          // width:"50vh"
        },
      }}
    >
      {loading ? (
        <div
          style={{
            marginTop: "20px",
            paddingBottom: "200vh",
            // justifyContent: "center",
          }}
        >
          <LinearProgress />
          loading...
        </div>
      ) : (
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
                      <th>Contractor Email</th>
                      <th>Contact Person</th>
                      <th>Contractor Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contract.length > 0 ? (
                      contract.map((post, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {post.contactEmail || "N/A"}
                          </td>
                          <td
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {post.contactPerson || "N/A"}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {post.contractorName || "N/A"}
                          </td>
                          <td style={{ justifyContent: "space-between" }}>
                            <Button
                              variant="contained"
                              style={{ marginRight: "10px" }}
                              onClick={() => {
                                // handleView(post._id);
                                navigate(`/${post._id}/contractview`);
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" align="center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}
    </Container>
  );
};

export default ContractViewDetail;
