/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Grid, Card, Container, Button, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEntryDetails } from "../../action/posts";
import LOGO from "../../assets/Ashkam_Logo.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./Style1.css";
import { auto } from "@popperjs/core";

const DetailedProjectPage = () => {
  const { date } = useParams();

  const dispatch = useDispatch();

  const [isPrinting, setIsPrinting] = useState(false);

  const [loading, setLoading] = useState(true);

  const componentRef = useRef();

  const entry = useSelector((state) => state.entry);

  const [filteredData, setFilteredData] = useState([]);

  const [month, setMonth] = useState(null);

  const allEntries = [];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEntryDetails()).finally(() => setLoading(false));

    // Filter the data based on the selected date
    const allEntries = [];
    entry.forEach((post) => {
      // console.log(post);

      for (let index = 0; index < post?.date.length; index++) {
        if (post?.date[index] === date) {
          allEntries.push({
            projectNumber: post?.projectNumber,
            projectName: post?.projectName,
            clientName: post?.clientName,
            date: post?.date[index],
            activityList: post?.activityList[index],
            plannedWorkList: post?.plannedWorkList[index],
            materialRequiredList: post?.materialRequiredList[index],
            materialInventoryList: post?.materialInventoryList[index],
            procurementList: post?.procurementList[index],
            attendance: post?.attendance[index],
            // femaleLabour: post?.femaleLabour[index],
            // mason: post?.mason[index],
            uploadPictures1: post?.uploadPictures1[index],
            uploadPictures2: post?.uploadPictures2[index],
            uploadPictures3: post?.uploadPictures3[index],
            uploadPictures4: post?.uploadPictures4[index],
            uploadPictures5: post?.uploadPictures5[index],
            preparedBy: post?.preparedBy[index],
            reviewedBy: post?.reviewedBy[index],
          });
          const storedDate = post?.date[index]; // Example stored date (ISO format)
          const actualDate = new Date(storedDate);
          // const monthValue = actualDate.getMonth() + 1;
          const monthValue = actualDate.toLocaleString("default", {
            month: "long",
          });
          setMonth(monthValue);
        }
      }
    });

    setFilteredData(allEntries); // Set the filtered data
  }, [date, entry, dispatch, loading]);

  const handlePpd = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Daily Progress Report",
    fontSize: "15px",
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
  });

  entry?.forEach((post) => {
    for (let index = 0; index < post?.date.length; index++) {
      if (post?.date[index] === date) {
        allEntries.push({
          projectNumber: post?.projectNumber,
          projectName: post?.projectName,
          clientName: post?.clientName,
          date: post?.date[index],
          activityList: post?.activityList[index],
          plannedWorkList: post?.plannedWorkList[index],
          materialInventoryList: post?.materialInventoryList[index],
          materialRequiredList: post?.materialRequiredList[index],
          procurementList: post?.procurementList[index],
          attendance: post?.attendance[index],
          // femaleLabour: post?.femaleLabour[index],
          // mason: post?.mason[index],
          uploadPictures1: post?.uploadPictures1[index],
          uploadPictures2: post?.uploadPictures2[index],
          uploadPictures3: post?.uploadPictures3[index],
          uploadPictures4: post?.uploadPictures4[index],
          uploadPictures5: post?.uploadPictures5[index],
          preparedBy: post?.preparedBy[index],
          reviewedBy: post?.reviewedBy[index],
        });
      }
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const storedDate = posts?.date; // Example stored date (ISO format)
  // const actualDate = new Date(storedDate);
  // const month = actualDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-11

  const currentDate = new Date();
  const formattedCurrentDate = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-"); // replace / with -

  // console.log(allEntries);

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  const parseMaterialInventory = (materialInventoryList) => {
    if (!materialInventoryList) return [];

    let rows = [];

    // Case 1: string
    if (typeof materialInventoryList === "string") {
      rows = materialInventoryList.split(",");
    }

    // Case 2: array
    else if (Array.isArray(materialInventoryList)) {
      if (typeof materialInventoryList[0] === "string") {
        rows = materialInventoryList[0].split(",");
      }
    }

    return rows.map((row) => {
      const [
        description,
        unit,
        opening,
        issued,
        received,
        closing,
        requirement,
      ] = row.trim().split("::");

      return {
        description,
        unit,
        opening,
        issued,
        received,
        closing,
        requirement,
      };
    });
  };

  const rowTitleStyle = {
    border: "1px solid black",
    padding: "4px",
    fontWeight: "bold",
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "4px",
    textAlign: "center",
  };

  return (
    <div>
      <div>
        <Button
          onClick={handleGoBack}
          sx={{
            padding: "8px 14px",
            color: "#16355d",
            display: {
              sm: "inline-block",
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
      </div>
      {loading ? (
        <div style={{ marginTop: "20px", paddingBottom: "200vh" }}>
          <LinearProgress />
          Loading...
        </div>
      ) : (
        <Container
          elevation={10}
          padding="10px"
          container="true"
          spacing={0}
          direction="column"
          alignitems="center"
          justifycontent="center"
          // fluid="true"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexDirection: "column",
            marginBottom: "50px",
          }}
        >
          <Card
            elevation={20}
            sx={{
              borderRadius: "10px",
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
            <div ref={componentRef} style={{ padding: "30px" }}>
              {/* {isPrinting && ( */}
              {/* for printing only  */}
              <div className="print-header">
                <div className="print-header ">
                  ASHKAM ENERGY PRIVATE LIMTED
                </div>
                <table
                  className="dpr-table"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid black",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <tbody>
                    <tr>
                      {/* Logo */}
                      <td
                        className="report-cell"
                        style={{
                          width: "30%",
                          borderRight: "1px solid black",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <img
                          src={LOGO}
                          alt="Company Logo"
                          style={{ height: "auto" }}
                        />
                      </td>

                      {/* Title */}
                      <td
                        className="report-cell"
                        style={{
                          width: "40%",
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "14px",
                          borderRight: "1px solid black",
                          verticalAlign: "middle",
                        }}
                      >
                        DAILY PROGRESS REPORT
                      </td>

                      {/* Info box (Date, Location, Doc.No) */}
                      <td className="report-cell">
                        <table
                          className="dpr-table"
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "12px", // smaller text
                          }}
                        >
                          {/* {filteredData.length > 0 ? (
                            filteredData.map((entry, index) => (
                              <tr key={index}>
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        padding: "2px 4px",
                                        textAlign: "left",
                                      }}
                                    >
                                      Date: {entry?.date}
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td
                                      style={{
                                        padding: "2px 4px",
                                        textAlign: "left",
                                      }}
                                    >
                                      Project Number: {entry?.projectNumber}
                                    </td>
                                  </tr>
                                </tbody>
                              </tr>
                            ))
                          ) : (
                            <p>No data</p>
                          )} */}

                          <tbody>
                            {filteredData.map((entry) => (
                              <React.Fragment
                                key={`${entry.projectNumber}-${entry.date}`}
                              >
                                <tr>
                                  <td>Date: {entry.date}</td>
                                </tr>
                                <tr>
                                  <td>Project Number: {entry.projectNumber}</td>
                                </tr>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="dpr-table"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid black",
                    marginTop: "5px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((entry, index) => (
                        <tr key={index}>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "2px 4px",
                              fontWeight: "bold",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            PROJECT NAME
                          </th>

                          <td
                            style={{
                              border: "1px solid black",
                              width: "80%",
                              padding: "2px 4px",
                              textAlign: "center",
                              fontSize: "15px",
                            }}
                          >
                            {entry?.projectName}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No data available for this date.</p>
                    )}
                    {filteredData.length > 0 ? (
                      filteredData.map((entry, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "2px 4px",
                              fontWeight: "bold",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            CLIENT
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "80%",
                              padding: "2px 4px",
                              textAlign: "center",
                              fontSize: "15px",
                            }}
                          >
                            {entry?.clientName}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No data available for this date.</p>
                    )}
                  </tbody>
                </table>
              </div>
              {/* till here */}
              <div className="hide-on-print">
                <h3
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto ",
                    color: "#0d325c",
                    padding: "10px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  DAILY PROGRESS REPORT
                </h3>
                <div>
                  <Grid>
                    <table
                      className="dpr-table"
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                              backgroundColor: "#0d325c",
                              color: "white",
                            }}
                          >
                            GENERATED REPORT
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table
                      className="dpr-table"
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
                        {filteredData.length > 0 ? (
                          filteredData.map((entry, index) => (
                            <tr key={index}>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "4px 4px",
                                }}
                              >
                                PROJECT NAME
                              </th>

                              <td
                                style={{
                                  border: "1px solid black",
                                  width: "80%",
                                  padding: "4px 4px",
                                  textAlign: "center",
                                }}
                              >
                                {entry?.projectName}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <p>No data available for this date.</p>
                        )}
                      </thead>
                    </table>
                    {filteredData.length > 0 ? (
                      filteredData.map((entry, index) => (
                        <table
                          className="dpr-table"
                          style={{
                            padding: "10px",
                            borderCollapse: "collapse",
                            border: "1px solid black",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                            maxWidth: "800px",
                          }}
                        >
                          <tbody>
                            <tr key={index}>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "4px",
                                }}
                              >
                                Client
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "4px",
                                  width: "40%",
                                  textAlign: "center",
                                }}
                              >
                                {entry.clientName}
                              </td>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Date
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "4px",
                                  width: "30%",
                                  textAlign: "center",
                                }}
                              >
                                {entry.date}
                              </td>
                            </tr>
                            <tr>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "4px",
                                }}
                              >
                                Project Number
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                  textAlign: "center",
                                  width: "40%",
                                }}
                              >
                                {entry.projectNumber}
                              </td>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Month
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                  width: "30%",
                                  textAlign: "center",
                                }}
                              >
                                {month}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))
                    ) : (
                      <p>No data available for this date.</p>
                    )}
                  </Grid>
                </div>
              </div>
              <Grid>
                <Grid>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <br />

                    {/* table for activity List */}
                    <table
                      className="dpr-table"
                      style={{
                        padding: "4px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "800px",
                      }}
                    >
                      <colgroup>
                        <col style={{ width: "10px" }} />
                        <col style={{ width: "600px" }} />
                        <col style={{ width: "200px" }} />
                        <col style={{ width: "450px" }} />
                        <col style={{ width: "250px" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th
                            colSpan="5"
                            style={{
                              textAlign: "left",
                              padding: "4px",
                              backgroundColor: "#0d325c",
                              color: "white",
                            }}
                          >
                            CIVIL AND STRUCTURE
                          </th>
                        </tr>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            S.No
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Activities
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                              textAlign: "center",
                            }}
                          >
                            Quantity
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                              textAlign: "center",
                            }}
                          >
                            Related Image
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                              textAlign: "center",
                            }}
                          >
                            Status
                          </th>
                          {/* <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            Remark
                          </th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {filteredData?.map((entry, index) => {
                          let activityListData = [];

                          // Normalize procurementList into an array of "Description: Quantity"
                          if (Array.isArray(entry.activityList)) {
                            if (typeof entry.activityList[0] === "string") {
                              activityListData = entry.activityList[0]
                                .split("||")
                                .map((item) => item.trim());
                            } else if (Array.isArray(entry.activityList[0])) {
                              activityListData = entry.activityList[0].map(
                                (item) => item.trim(),
                              );
                            } else if (
                              typeof entry.activityList[0] === "object" &&
                              entry.activityList[0] !== null
                            ) {
                              activityListData = Object.entries(
                                entry.activityList[0],
                              ).map(([key, value]) => `${key}: ${value}`);
                            }
                          } else if (typeof entry.activityList === "string") {
                            activityListData = entry.activityList
                              .split("||")
                              .map((item) => item.trim());
                          }

                          const images = [
                            entry.uploadPictures1,
                            entry.uploadPictures2,
                            entry.uploadPictures3,
                            entry.uploadPictures4,
                            entry.uploadPictures5,
                          ];

                          return activityListData.map((item, i) => {
                            // const [textRaw, statusRaw] = item.split(":");
                            // const text = textRaw?.trim();
                            // const status = statusRaw?.trim();

                            const [text, quantity, status] = item
                              .split("::")
                              .map((v) => v?.trim());

                            return (
                              <tr key={`${index}-${i}`}>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "8px",
                                    textAlign: "center",
                                    width: "130px",
                                  }}
                                >
                                  {i + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    wordBreak: "break-word", // 🔑 this forces long strings to break
                                    whiteSpace: "pre-wrap", // keeps line breaks, wraps text
                                    maxWidth: "200px", // adjust width so it stays in card
                                    overflowWrap: "anywhere", //
                                  }}
                                >
                                  {text}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "2px",
                                    wordBreak: "break-word", // 🔑 this forces long strings to break
                                    whiteSpace: "pre-wrap", // keeps line breaks, wraps text
                                    maxWidth: "100px", // adjust width so it stays in card
                                    overflowWrap: "anywhere",
                                    textAlign: "center",
                                  }}
                                >
                                  {quantity}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                >
                                  {images[i] ? (
                                    <img
                                      src={images[i]}
                                      alt={`Activity ${i + 1}`}
                                      style={{
                                        width: "180px",
                                        height: "100px",
                                        margin: "5px",
                                      }}
                                    />
                                  ) : (
                                    "No image"
                                  )}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                    color:
                                      status === "In Progress"
                                        ? "orange"
                                        : status === "Completed"
                                          ? "#006400"
                                          : "transparent",
                                    // color: status ? "white" : "black",
                                  }}
                                >
                                  {status}
                                </td>
                              </tr>
                            );
                          });
                        })}
                      </tbody>
                    </table>

                    <br />

                    <div className="hide-mobile">
                      <table
                        className="dpr-table"
                        style={{
                          padding: "4px",
                          borderCollapse: "collapse",
                          border: "1px solid black",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "100%",
                          maxWidth: "800px",
                        }}
                      >
                        <colgroup>
                          <col style={{ width: "60px" }} />
                          <col style={{ width: auto }} />
                          <col style={{ width: "100px" }} />
                          <col style={{ width: "100px" }} />
                          <col style={{ width: "100px" }} />
                          <col style={{ width: "100px" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th
                              colSpan="7"
                              style={{
                                textAlign: "left",
                                padding: "4px",
                                backgroundColor: "#0d325c",
                                color: "white",
                              }}
                            >
                              MATERIAL INVENTORY
                            </th>
                          </tr>
                          <tr>
                            <th
                              className="hide-mobile"
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                              }}
                            >
                              S.No
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                              }}
                            >
                              Description
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                                textAlign: "center",
                              }}
                            >
                              Opening Stock
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                                textAlign: "center",
                              }}
                            >
                              Issued
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                                textAlign: "center",
                              }}
                            >
                              Received
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                                textAlign: "center",
                              }}
                            >
                              Closing Stock
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "4px",
                                backgroundColor: "#e9eef4",
                                textAlign: "center",
                              }}
                            >
                              Requirement
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredData?.map((entry, index) => {
                            let materialInventoryListData = [];

                            // Normalize procurementList into an array of "Description: Quantity"
                            if (Array.isArray(entry.materialInventoryList)) {
                              if (
                                typeof entry.materialInventoryList[0] ===
                                "string"
                              ) {
                                materialInventoryListData =
                                  entry.materialInventoryList[0]
                                    .split(",")
                                    .map((item) => item.trim());
                              } else if (
                                Array.isArray(entry.materialInventoryList[0])
                              ) {
                                materialInventoryListData =
                                  entry.materialInventoryList[0].map((item) =>
                                    item.trim(),
                                  );
                              } else if (
                                typeof entry.materialInventoryList[0] ===
                                  "object" &&
                                entry.materialInventoryList[0] !== null
                              ) {
                                materialInventoryListData = Object.entries(
                                  entry.materialInventoryList[0],
                                ).map(([key, value]) => `${key}: ${value}`);
                              }
                            } else if (
                              typeof entry.materialInventoryList === "string"
                            ) {
                              materialInventoryListData =
                                entry.materialInventoryList
                                  .split(",")
                                  .map((item) => item.trim());
                            }

                            return materialInventoryListData.map((item, i) => {
                              const [
                                material,
                                unit,
                                openingStock,
                                issued,
                                received,
                                closingStock,
                                requirement,
                              ] = item.split("::");

                              return (
                                <tr key={`${index}-${i}`}>
                                  <td
                                    className="hide-mobile"
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {i + 1}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                    }}
                                  >
                                    {material} ({unit})
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {openingStock}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {issued}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {received || ""}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {closingStock}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {requirement}
                                  </td>
                                </tr>
                              );
                            });
                          })}
                        </tbody>
                      </table>
                    </div>
                    <br />

                    {/* Mobile Resolution*/}

                    <div className="hide-desktop">
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "800px",
                          overflowX: "auto",
                          margin: "0 auto",
                        }}
                      >
                        <table
                          className="dpr-table"
                          style={{
                            padding: "4px",
                            borderCollapse: "collapse",
                            border: "1px solid black",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                            maxWidth: "800px",
                          }}
                        >
                          <thead>
                            <tr>
                              <th
                                colSpan={
                                  filteredData?.[0]
                                    ? parseMaterialInventory(
                                        filteredData[0].materialInventoryList,
                                      ).length + 1
                                    : 1
                                }
                                style={{
                                  textAlign: "left",
                                  padding: "4px",
                                  backgroundColor: "#0d325c",
                                  color: "white",
                                }}
                              >
                                MATERIAL INVENTORY
                              </th>
                            </tr>

                            <tr>
                              <th
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "#e9eef4",
                                  padding: "4px",
                                }}
                              >
                                Description
                              </th>

                              {filteredData?.[0] &&
                                parseMaterialInventory(
                                  filteredData[0].materialInventoryList,
                                ).map((m, i) => (
                                  <th
                                    key={i}
                                    style={{
                                      border: "1px solid black",
                                      backgroundColor: "#e9eef4",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {m.description} ({m.unit})
                                  </th>
                                ))}
                            </tr>
                          </thead>

                          <tbody>
                            {filteredData?.map((entry, index) => {
                              const materials = parseMaterialInventory(
                                entry.materialInventoryList,
                              );

                              if (materials.length === 0) return null;

                              return (
                                <React.Fragment key={`entry-${index}`}>
                                  <tr key={`opening-${index}`}>
                                    <td style={rowTitleStyle}>Opening Stock</td>
                                    {materials.map((m, i) => (
                                      <td
                                        key={`opening-${index}-${i}`}
                                        style={cellStyle}
                                      >
                                        {m.opening}
                                      </td>
                                    ))}
                                  </tr>

                                  <tr key={`issued-${index}`}>
                                    <td style={rowTitleStyle}>Issued</td>
                                    {materials.map((m, i) => (
                                      <td
                                        key={`issued-${index}-${i}`}
                                        style={cellStyle}
                                      >
                                        {m.issued}
                                      </td>
                                    ))}
                                  </tr>

                                  <tr key={`received-${index}`}>
                                    <td style={rowTitleStyle}>Received</td>
                                    {materials.map((m, i) => (
                                      <td
                                        key={`received-${index}-${i}`}
                                        style={cellStyle}
                                      >
                                        {m.received}
                                      </td>
                                    ))}
                                  </tr>

                                  <tr key={`closing-${index}`}>
                                    <td style={rowTitleStyle}>Closing Stock</td>
                                    {materials.map((m, i) => (
                                      <td
                                        key={`closing-${index}-${i}`}
                                        style={cellStyle}
                                      >
                                        {m.closing}
                                      </td>
                                    ))}
                                  </tr>

                                  <tr key={`requirement-${index}`}>
                                    <td style={rowTitleStyle}>Requirement</td>
                                    {materials.map((m, i) => (
                                      <td
                                        key={`requirement-${index}-${i}`}
                                        style={cellStyle}
                                      >
                                        {m.requirement}
                                      </td>
                                    ))}
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <br />
                    </div>

                    {/* <table
                      className="dpr-table"
                      style={{
                        padding: "4px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    > */}
                    {/* <colgroup>
                        <col style={{ width: "60px" }} />
                        <col style={{ width: auto }} />
                        <col style={{ width: "250px" }} />
                      </colgroup> */}
                    {/* <thead>
                        <tr>
                          <th
                            colSpan="4"
                            style={{
                              textAlign: "left",
                              padding: "4px",
                              backgroundColor: "#0d325c",
                              color: "white",
                            }}
                          >
                            MATERIAL REQUIREMENT
                          </th>
                        </tr>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            S.No
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Description
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Quantity Required
                          </th> */}
                    {/* <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            Remark
                          </th> */}
                    {/* </tr>
                      </thead> */}

                    {/* <tbody>
                        {filteredData?.map((entry, index) => {
                          let materialRequiredListData = [];

                          if (Array.isArray(entry.materialRequiredList)) {
                            if (
                              typeof entry.materialRequiredList[0] === "string"
                            ) {
                              materialRequiredListData =
                                entry.materialRequiredList[0]
                                  .split(",")
                                  .map((item) => item.trim());
                            } else if (
                              Array.isArray(entry.materialRequiredList[0])
                            ) {
                              materialRequiredListData =
                                entry.materialRequiredList[0].map((item) =>
                                  item.trim()
                                );
                            } else if (
                              typeof entry.materialRequiredList[0] ===
                                "object" &&
                              entry.materialRequiredList[0] !== null
                            ) {
                              materialRequiredListData = Object.entries(
                                entry.materialRequiredList[0]
                              ).map(([key, value]) => `${key}: ${value}`);
                            }
                          } else if (
                            typeof entry.materialRequiredList === "string"
                          ) {
                            materialRequiredListData =
                              entry.materialRequiredList
                                .split(",")
                                .map((item) => item.trim());
                          }

                          return materialRequiredListData.map((item, i) => {
                            const [description, quantity] = item.split(":");
                            return (
                              <tr key={`${index}-${i}`}>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {i + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                  }}
                                >
                                  {description}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {quantity}
                                </td>
                              </tr>
                            );
                          });
                        })}
                      </tbody> */}
                    {/* </table> */}

                    {/* <table
                      className="dpr-table"
                      style={{
                        padding: "4px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    > */}
                    {/* <colgroup>
                        <col style={{ width: "60px" }} />
                        <col style={{ width: auto }} />
                        <col style={{ width: "200px" }} />
                        <col style={{ width: "150px" }} />
                      </colgroup> */}
                    {/* <thead> */}
                    {/* <tr> */}
                    {/* <th
                            colSpan="4"
                            style={{
                              textAlign: "left",
                              padding: "4px",
                              backgroundColor: "#0d325c",
                              color: "white",
                            }}
                          >
                            PROCUREMENT LIST
                          </th> */}
                    {/* </tr> */}
                    {/* <tr> */}
                    {/* <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            S.No
                          </th> */}
                    {/* <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Description
                          </th> */}
                    {/* <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Vendor / Petty Cash
                          </th> */}
                    {/* <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Quantity Procured
                          </th> */}
                    {/* </tr> */}
                    {/* </thead> */}

                    {/* <tbody>
                        {filteredData?.map((entry, index) => {
                          let procurementListData = [];

                          if (Array.isArray(entry.procurementList)) {
                            if (typeof entry.procurementList[0] === "string") {
                              procurementListData = entry.procurementList[0]
                                .split(",")
                                .map((item) => item.trim());
                            } else if (
                              Array.isArray(entry.procurementList[0])
                            ) {
                              procurementListData =
                                entry.procurementList[0].map((item) =>
                                  item.trim()
                                );
                            } else if (
                              typeof entry.procurementList[0] === "object" &&
                              entry.procurementList[0] !== null
                            ) {
                              procurementListData = Object.entries(
                                entry.procurementList[0]
                              ).map(([key, value]) => `${key}: ${value}`);
                            }
                          } else if (
                            typeof entry.procurementList === "string"
                          ) {
                            procurementListData = entry.procurementList
                              .split(",")
                              .map((item) => item.trim());
                          }

                          return procurementListData.map((item, i) => {
                            const [description, vendor, quantity] =
                              item.split(":");
                            return (
                              <tr key={`${index}-${i}`}>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {i + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                  }}
                                >
                                  {description}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {vendor}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {quantity}
                                </td>
                              </tr>
                            );
                          });
                        })}
                      </tbody> */}
                    {/* </table> */}

                    {/* <table
                      className="dpr-table"
                      style={{
                        padding: "4px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    > */}
                    {/* <colgroup>
                        <col style={{ width: "60px" }} /> 
                        <col style={{ width: auto }} /> 
                        <col style={{ width: "250px" }} /> 
                      </colgroup> */}
                    {/* <thead>
                        <tr>
                          <th
                            colSpan="3"
                            style={{
                              textAlign: "left",
                              padding: "4px",
                              backgroundColor: "#0d325c",
                              color: "white",
                            }}
                          >
                            PLANNED WORK LIST
                          </th>
                        </tr>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            S.No
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Description
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                            }}
                          >
                            Completed Status
                          </th>
                        </tr>
                      </thead> */}

                    {/* <tbody>
                        {filteredData?.map((entry, index) => {
                          let plannedWorkListData = [];

                          if (Array.isArray(entry.plannedWorkList)) {
                            if (typeof entry.plannedWorkList[0] === "string") {
                              plannedWorkListData = entry.plannedWorkList[0]
                                .split(",")
                                .map((item) => item.trim());
                            } else if (
                              Array.isArray(entry.plannedWorkList[0])
                            ) {
                              plannedWorkListData =
                                entry.plannedWorkList[0].map((item) =>
                                  item.trim()
                                );
                            } else if (
                              typeof entry.plannedWorkList[0] === "object" &&
                              entry.plannedWorkList[0] !== null
                            ) {
                              plannedWorkListData = Object.entries(
                                entry.plannedWorkList[0]
                              ).map(([key, value]) => `${key}: ${value}`);
                            }
                          } else if (
                            typeof entry.plannedWorkList === "string"
                          ) {
                            plannedWorkListData = entry.plannedWorkList
                              .split(",")
                              .map((item) => item.trim());
                          }

                          return plannedWorkListData.map((item, i) => {
                            // const [description, quantity] = item.split(":");
                            const description = item;
                            return (
                              <tr key={`${index}-${i}`}>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {i + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                  }}
                                >
                                  {description}
                                </td> */}
                    {/* <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {quantity}
                                </td> */}
                    {/* </tr>
                            );
                          });
                        })}
                      </tbody> */}
                    {/* </table> */}

                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#0d325c",
                              color: "white",
                              textAlign: "left",
                            }}
                          >
                            ATTENDANCE
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#0d325c",
                              color: "white",
                              textAlign: "left",
                            }}
                          ></th>
                        </tr>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",

                              backgroundColor: "#e9eef4",
                            }}
                          ></th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",

                              backgroundColor: "#e9eef4",
                              textAlign: "center",
                            }}
                          >
                            Count
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          let grandTotal = 0; // To store the sum of all values

                          // Loop through filteredData and render rows
                          const tableRows = filteredData?.flatMap(
                            (entry, index) => {
                              let attendanceData = [];

                              if (Array.isArray(entry.attendance)) {
                                if (typeof entry.attendance[0] === "string") {
                                  attendanceData = entry.attendance[0]
                                    .split(",")
                                    .map((item) => item.trim());
                                } else if (Array.isArray(entry.attendance[0])) {
                                  attendanceData = entry.attendance[0].map(
                                    (item) => item.trim(),
                                  );
                                } else if (
                                  typeof entry.attendance[0] === "object" &&
                                  entry.attendance[0] !== null
                                ) {
                                  attendanceData = Object.entries(
                                    entry.attendance[0],
                                  ).map(([key, value]) => `${key}: ${value}`);
                                }
                              } else if (typeof entry.attendance === "string") {
                                attendanceData = entry.attendance
                                  .split(",")
                                  .map((item) => item.trim());
                              }

                              const getValue = (label) =>
                                parseInt(
                                  attendanceData
                                    .find((a) =>
                                      a
                                        .toLowerCase()
                                        .startsWith(label.toLowerCase()),
                                    )
                                    ?.split(":")[1]
                                    ?.trim() || "0",
                                  10,
                                );

                              const rows = [
                                {
                                  label: "Male Labour",
                                  value: getValue("Male Labour"),
                                },
                                {
                                  label: "Female Labour",
                                  value: getValue("Female Labour"),
                                },
                                { label: "Mason", value: getValue("Mason") },
                                {
                                  label: "HQ Staff",
                                  value: getValue("HQ Staff"),
                                },
                                {
                                  label: "Security Staff",
                                  value: getValue("Security Staff"),
                                },
                                { label: "Others", value: getValue("Others") },
                              ];

                              // Add this entry's total to grand total
                              grandTotal += rows.reduce(
                                (sum, row) => sum + row.value,
                                0,
                              );

                              // Return table rows for this entry
                              return rows.map((row, i) => (
                                <tr key={`${index}-${i}`}>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                    }}
                                  >
                                    {row.label}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      padding: "4px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {row.value}
                                  </td>
                                </tr>
                              ));
                            },
                          );

                          return (
                            <>
                              {tableRows}
                              <tr
                                style={{
                                  backgroundColor: "#e9eef4",
                                  fontWeight: "bold",
                                }}
                              >
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                  }}
                                >
                                  Total
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {grandTotal}
                                </td>
                              </tr>
                            </>
                          );
                        })()}
                      </tbody>
                    </table>

                    <br />

                    <table
                      className="dpr-table"
                      style={{
                        padding: "4px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      <colgroup>
                        <col style={{ width: auto }} />
                        <col style={{ width: auto }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                              textAlign: "center",
                            }}
                          >
                            Prepared By
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "4px",
                              backgroundColor: "#e9eef4",
                              textAlign: "center",
                            }}
                          >
                            Reviewed By
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredData.length > 0 ? (
                          filteredData.map((entry, index) => (
                            <>
                              <tr key={index}>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {entry?.preparedBy}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    padding: "4px",
                                    textAlign: "center",
                                  }}
                                >
                                  {entry?.reviewedBy}
                                </td>
                              </tr>
                            </>
                          ))
                        ) : (
                          <p>No data available</p>
                        )}
                      </tbody>
                    </table>
                    <div className="print-footer">
                      Printed on: {new Date().toLocaleString()}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
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
                Download ↓
              </Button>
            )}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default DetailedProjectPage;
