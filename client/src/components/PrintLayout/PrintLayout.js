import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Container } from "@mui/material";

const PrintLayout = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  return (
    <div>
      <Container
        elevation={10}
        padding="10px"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        fluid="true"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        <Grid>
          <Grid>
            <h3
              style={{
                textAlign: "center",
                fontFamily: "Roboto ",
                color: "#0d325c",
              }}
            >
              Daily Progress Report
            </h3>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <table
                table
                style={{
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        alignItems: "center",
                      }}
                    >
                      DAILY PROGRESS REPORT
                    </th>
                  </tr>
                </thead>
              </table>

              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>PROJECT NAME</th>
                    <td style={{ border: "1px solid black", width: "33.33%" }}>
                      {" "}
                    </td>
                  </tr>
                </thead>
              </table>

              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <tbody>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Client</th>
                    <td style={{ border: "1px solid black", width: "33.33%" }}>
                      {" "}
                    </td>
                    <th style={{ border: "1px solid black" }}>Date</th>
                    <td style={{ border: "1px solid black", width: "33.33%" }}>
                      {" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>Doc No.</td>
                    <td
                      style={{ border: "1px solid black", width: "33.33%" }}
                    ></td>
                    <td style={{ border: "1px solid black" }}>Month</td>
                    <td
                      style={{ border: "1px solid black", width: "33.33%" }}
                    ></td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        backgroundColor: "#027580",
                        textAlign: "center",
                      }}
                    >
                      Activities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ border: "1px solid black" }}>
                      Civil & Structure
                    </th>
                    <td
                      style={{ border: "1px solid black", width: "33.33%" }}
                    ></td>
                    <th style={{ border: "1px solid black" }}>
                      Planned work for Tommorrow
                    </th>
                    <td
                      style={{ border: "1px solid black", width: "33.33%" }}
                    ></td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>
                      Material Requirements
                    </th>
                    <td
                      style={{ border: "1px solid black", width: "33.33%" }}
                    ></td>
                    <th style={{ border: "1px solid black" }}>
                      Procurement Status
                    </th>
                    <td
                      style={{ border: "1px solid black", width: "33.33%" }}
                    ></td>
                  </tr>
                </tbody>
              </table>
              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}>S. No.</td>
                    <td style={{ border: "1px solid black" }}>Male Labour</td>
                    <td style={{ border: "1px solid black" }}>Female Labour</td>
                    <td style={{ border: "1px solid black", width: "33.33%" }}>
                      Mason
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        width: "33.33%",
                        padding: "20px",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        width: "33.33%",
                        padding: "20px",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        width: "33.33%",
                        padding: "20px",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        width: "33.33%",
                        padding: "20px",
                      }}
                    ></td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "33.33%",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "33.33%",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "33.33%",
                      }}
                    ></td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      PREPARED BY
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      SITE SUPERVISOR
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      LABOUR CONTRACTOR
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#027580",
                        padding: "2px",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#027580",
                        padding: "2px",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#027580",
                        padding: "2px",
                      }}
                    ></td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PrintLayout;
