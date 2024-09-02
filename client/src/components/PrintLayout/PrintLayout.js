import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Grid, Card, Container, Button } from "@mui/material";

const PrintLayout = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPrinting, setIsPrinting] = useState(false);

  const componentRef = useRef();

  const handlePpd = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Visitor Pass",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
    fontSize: "15px",
  });

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
        // fluid="true"
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
        <Card
          ref={componentRef}
          elevation={20}
          sx={{
            padding: "40px",
            borderRadius: "20px",
            display: {
              xs: "0",
              sm: "600",
            },
            bgcolor: "background.Card",
            boxShadow: "5px",
            width: "auto",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontFamily: "Roboto ",
              color: "#0d325c",
            }}
          >
            Daily Progress Report
          </h3>
          <Grid>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
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
                        // alignItems="center"
                        // justifyContent="center"
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                          backgroundColor: "#027580",
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
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        PROJECT NAME
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "60%",
                          padding: "10px",
                        }}
                      >
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
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Client
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      >
                        {" "}
                      </td>
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Date
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      >
                        {" "}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Doc No.
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      ></td>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Month
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
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
                    height: "2%",
                    maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Civil & Structure
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      ></td>
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Planned work for Tommorrow
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Material Requirements
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      ></td>
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Procurement Status
                      </th>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "33.33%",
                          padding: "10px",
                        }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
                <br />
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
                    height: "3%",
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
                      ></th>
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
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        S. No.
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        Male Labour
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        Female Labour
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          width: "40%",
                          textAlign: "center",
                          padding: " 0px 20px",
                        }}
                      >
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
                    height: "3%",
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
                      ></th>
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
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "40px",
                          width: "33.33%",
                        }}
                      ></td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "40px",
                          width: "33.33%",
                        }}
                      ></td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "40px",
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
        </Card>
        <Grid>
          {!isPrinting && (
            <Button
              required
              variant="outlined"
              sx={{
                bgcolor: "skyblue",
                color: "black",
                float: "right",
                marginRight: "0px",
                marginTop: "10px",
              }}
              onClick={handlePpd}
            >
              Print
            </Button>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default PrintLayout;
