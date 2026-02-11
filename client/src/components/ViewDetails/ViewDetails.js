/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Card,
  LinearProgress,
  Container,
  Typography,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getEntryDetails } from "../../action/posts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewDetails = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux state
  const entry = useSelector((state) => state.entry);

  // Local state for filtered data
  const [filteredArray, setFilteredArray] = useState([]);

  const filterArray = (entries) => {
    const tempArray = [];
    entries.forEach((post) => {
      if (id === post.projectNumber) {
        post?.preparedBy?.forEach((submittedBy, index) => {
          tempArray.push({
            submittedBy,
            date: post?.date[index],
            uploadPictures1: post?.uploadPictures1[index],
            preparedBy: post?.preparedBy[index],
            reviewedBy: post?.reviewedBy[index],
          });
        });
      }
    });
    tempArray.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredArray(tempArray);
  };

  useEffect(() => {
    if (entry.length === 0) {
      setLoading(true);
      dispatch(getEntryDetails()).then(() => {
        setLoading(false);
      });
    } else {
      filterArray(entry);
    }
  }, [entry, dispatch, id]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  return (
    <div style={{ margin: "5px" }}>
      <div>
        <Button
          onClick={handleGoBack}
          sx={{
            padding: "8px 16px",
            color: "#16355d",
            display: {
              sm: "inline-block",
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
      </div>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          padding: "10px",
          // border: "0.5px solid gray",
          boxShadow: "2px 2px 2px 2px #888888",
          "@media (max-width: 600px)": {
            padding: "5px",
          },
        }}
      >
        {/* Project Name */}
        {entry.map((post) => {
          if (post.projectNumber === id) {
            return (
              <Typography
                key={post.projectNumber}
                variant="h6"
                className="text-center"
                sx={{
                  margin: "5px",
                  color: "#0D325C",
                  fontWeight: "bold",
                  fontSize: {
                    xs: "0.8rem", // mobile
                    sm: "1rem", // small screens
                    md: "1.25rem", // tablets
                    lg: "1.5rem", // laptops
                    xl: "1.5rem", // desktops}}
                  },
                }}
              >
                {post.projectName}
              </Typography>
            );
          }
        })}

        {loading ? (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LinearProgress style={{ width: "100%", marginBottom: "10px" }} />
            <Typography>Loading...</Typography>
          </div>
        ) : (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "12px",
              width: "100%",
            }}
          >
            {/* Add More Button */}
            {/* <div className="hidden md:block ">
              <Button
                variant="contained"
                color="success"
                sx={{
                  marginTop: "20px",
                  float: "right",
                  width: windowWidth <= 600 ? "100%" : "20%",
                }}
                onClick={() => navigate(`/entrydetails/${id}`)}
              >
                + Add More
              </Button>
            </div> */}

            <Card
              className=" hidden md:block "
              elevation={10}
              sx={{
                padding: "10px",
                margin: "10px",
                marginBottom: "50px",
                width: windowWidth <= 600 ? "100%" : "80%",
              }}
            >
              <button
                onClick={() => navigate(`/entrydetails/${id}`)}
                className="bg-green-600 text-white rounded-lg hover:bg-green-700 mb-3 float-right p-2 "
              >
                + Add More
              </button>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  overflowX: "auto",
                  overflowY: "auto",
                }}
              >
                <table
                  className="time-sheet-table"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    border: "1px solid black",
                    minWidth: "600px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Overview</th>
                      <th>Prepared By</th>
                      <th>Reviewed By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArray.length > 0 ? (
                      filteredArray.map((item, index) => (
                        <tr key={index}>
                          <td style={{ padding: "10px" }}>
                            {item.date || "N/A"}
                          </td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{
                                width: "100px",
                                height: "70px",
                                objectFit: "cover",
                              }}
                              src={item.uploadPictures1 || "N/A"}
                              alt="Overview"
                            />
                          </td>
                          <td style={{ padding: "10px" }}>
                            {item?.preparedBy || "N/A"}
                          </td>
                          <td style={{ padding: "10px" }}>
                            {item?.reviewedBy || "N/A"}
                          </td>
                          <td>
                            <Button
                              variant="contained"
                              size={windowWidth <= 600 ? "small" : "medium"}
                              onClick={() =>
                                navigate(`/${item.date}/detailedprojectpage`)
                              }
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:hidden mb-3b shadow-lg p-2 m-2">
              <div className="p-6 space-y-4 bg-gray-100 ">
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => navigate(`/entrydetails/${id}`)}
                    className="bg-green-600 text-white rounded-lg hover:bg-green-700 p-2"
                  >
                    + Add More
                  </button>
                </div>{" "}
                <div className="space-y-4 h-[500px] overflow-y-auto">
                  {filteredArray.length > 0 ? (
                    filteredArray.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between min-h-[120px] "
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            className="w-12 h-12 object-cover"
                            src={item.uploadPictures1 || "N/A"}
                            alt="profile"
                          />
                          <div>
                            <h6 className="font-semibold text-gray-900">
                              Date : {item.date}
                            </h6>
                            <h6 className="text-gray-900">
                              Prepared By : {item.preparedBy}
                            </h6>
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
                          onClick={() =>
                            navigate(`/${item.date}/detailedprojectpage`)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No data</p>
                  )}
                </div>
              </div>
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default ViewDetails;
