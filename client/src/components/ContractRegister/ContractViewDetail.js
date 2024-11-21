import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Container,
  Card,
  LinearProgress,
  Button,
  Typography,
} from "@mui/material";

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

    // Update window width dynamically
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleView = (id) => {
    navigate(`/${id}/contractview`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        padding: windowWidth <= 600 ? "10px" : "20px",
      }}
    >
      {loading ? (
        <div
          style={{
            marginTop: "20px",
            paddingBottom: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LinearProgress style={{ width: "100%", marginBottom: "10px" }} />
          <Typography>Loading...</Typography>
        </div>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: windowWidth <= 600 ? "10px" : "20px",
            marginBottom: "50px",
          }}
        >
          <Card
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              width: windowWidth <= 600 ? "auto" : "80%",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <table
                  className="time-sheet-table"
                  style={{
                    padding: "10px",
                    borderCollapse: "collapse",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                    border: "1px solid black",
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
                              padding: "10px",
                              textAlign: "left",
                              wordBreak: "break-word",
                            }}
                          >
                            {post.contactEmail || "N/A"}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              wordBreak: "break-word",
                            }}
                          >
                            {post.contactPerson || "N/A"}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "center",
                              wordBreak: "break-word",
                            }}
                          >
                            {post.contractorName || "N/A"}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              style={{ margin: "auto" }}
                              onClick={() => handleView(post._id)}
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
