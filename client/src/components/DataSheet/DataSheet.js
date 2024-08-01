import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";

import { useDispatch } from "react-redux";
import "./Style1.css";

const DataSheet = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    serialNo: "",
    bidNo: "",
    clientName: "",
    opportunityDetail: "",
    probability: "",
    amount: "",
    weightageAmount: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // dispatch("/datasheet", formData);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
      {" "}
      <Card>
        <Grid
          sx={{
            width: "auto",
            padding: "30px",
            backgroundColor: "whitesmoke",
            margin: "0px 8px 8px 8px",
          }}
        >
          <form onSubmit={handleSubmit} className="time-sheet-form">
            <div className="form-group">
              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="date"
                >
                  Serial No.:
                </label>
                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                />
              </Grid>

              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="projectCode"
                >
                  Bid No.:
                </label>
                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                />
              </Grid>

              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="activityCode"
                >
                  Client Name:
                </label>

                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                />
              </Grid>

              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="netTime"
                >
                  Opportunity Detail:
                </label>

                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                />
              </Grid>
              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="overTime"
                >
                  Probability:
                </label>

                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                />
              </Grid>
              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="overTime"
                >
                  Amount:
                </label>

                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                />
              </Grid>
              <Grid sx={{ display: "flex", padding: "10px" }}>
                <label
                  style={{
                    color: "#16355d",
                    fontFamily: "Roboto",
                    width: "100px",
                  }}
                  htmlFor="overTime"
                >
                  Weitage Amount :
                </label>

                <input
                  style={{
                    width: "100%",
                    // height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#e55d17",
                  }}
                  type="text"
                  id="date"
                  required
                  value={(formData.probability * formData.amount) / 100}
                />
              </Grid>
              {/* </div> */}
              <Grid style={{ display: "flex", justifyContent: "space-around" }}>
                <button style={{ fontFamily: "Roboto" }} type="submit">
                  {" "}
                  Submit
                </button>
                <button style={{ fontFamily: "Roboto" }} type="button">
                  Clear
                </button>
              </Grid>
              {/* </Grid> */}
            </div>
          </form>
        </Grid>
      </Card>
      <Grid
        sx={{ display: "flex", padding: "10px", margin: "0px 5px 0px 5px" }}
      >
        <Card>
          <Grid sx={{ backgroundColor: "white", padding: "10px" }}>
            <table
              className="time-sheet-table"
              style={{
                padding: "10px",
                borderCollapse: "collapse",
                // border: "1px solid black",
                marginLeft: "auto",
                marginRight: "auto",

                width: windowWidth <= 600 ? "30%" : "100%",
              }}
            >
              <thead>
                <tr>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    S.No.
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Bid No.
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Client Name
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Opportunity Detail
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Probability
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Amount
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Weightage Amount
                  </th>
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    2
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    3
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    5
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    6
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    8
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    4
                  </td>
                  <td
                    style={{
                      color: "#e55d17",
                      fontFamily: "Roboto",
                      padding: "10px",
                      alignContent: "center",
                    }}
                  >
                    9
                  </td>
                  <td style={{ display: "flex" }}>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default DataSheet;
