
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  Box,
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

  // Filter project entries
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

    // Sort latest date first
    tempArray.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setFilteredArray(tempArray);
  };

  // Fetch entry details
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Go back
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        margin: "5px",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        paddingBottom: "30px",
      }}
    >
      {/* BACK BUTTON */}

      <Box sx={{ mb: 1 }}>
        <Button
          onClick={handleGoBack}
          startIcon={<ArrowBackIcon />}
          sx={{
            padding: "8px 16px",
            color: "#16355d",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#e9eef5",
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* MAIN CONTAINER */}

     

        {entry.map((post) => {
          if (post.projectNumber === id) {
            return (
              <Typography
                key={post.projectNumber}
                variant="h6"
                className="text-center"
                sx={{
                  margin: "12px 5px 20px",
                  color: "#16355d",
                  fontWeight: 700,
                  fontSize: {
                    xs: "16px",
                    sm: "18px",
                    md: "22px",
                    lg: "24px",
                  },
                }}
              >
                {post.projectName}
              </Typography>
            );
          }

          return null;
        })}

        {/* LOADING */}

        {loading ? (
          <Box
            sx={{
              marginTop: "30px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <LinearProgress
              sx={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "5px",
              }}
            />

            <Typography sx={{ color: "#64748b" }}>
              Loading...
            </Typography>
          </Box>
        ) : (
          <Container
            maxWidth={false}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: { xs: "5px", md: "12px" },
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "80px",
            }}
          >
            {/* ====================================== */}
            {/* DESKTOP MODERN SUBMISSION LIST */}
            {/* ====================================== */}

            <Card
              className="hidden md:block"
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "1100px",
                padding: { sm: 2, md: 3 },
                margin: "10px",
                marginBottom: "100px",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 20px rgba(15,35,65,0.06)",
              }}
            >
              {/* LIST HEADER */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#16355d",
                    }}
                  >
                    Submission History
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#8491a3",
                      mt: 0.5,
                    }}
                  >
                    View and manage project progress reports
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(`/entrydetails/${id}`)
                  }
                  sx={{
                    backgroundColor: "#16355d",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "9px 20px",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#e55d17",
                      boxShadow: "none",
                    },
                  }}
                >
                  + Add More
                </Button>
              </Box>

              {/* LIST COLUMN HEADINGS */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "1.1fr 1.5fr 1fr 1fr 100px",
                  gap: 2,
                  padding: "12px 18px",
                  backgroundColor: "#f5f7fa",
                  borderRadius: "8px",
                  mb: 1.5,
                }}
              >
                {[
                  "Date",
                  "Overview",
                  "Prepared By",
                  "Reviewed By",
                  "Action",
                ].map((heading) => (
                  <Typography
                    key={heading}
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {heading}
                  </Typography>
                ))}
              </Box>

              {/* SUBMISSION ROWS */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  maxHeight: "500px",
                  overflowY: "auto",
                  pr: 0.5,
                }}
              >
                {filteredArray.length > 0 ? (
                  filteredArray.map((item, index) => (
                    <Box
                      key={`${item.date}-${index}`}
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "1.1fr 1.5fr 1fr 1fr 100px",
                        alignItems: "center",
                        gap: 2,
                        padding: "14px 18px",
                        border: "1px solid #e8edf3",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                          borderColor: "#cbd5e1",
                          transform: "translateY(-1px)",
                          boxShadow:
                            "0 4px 12px rgba(15,35,65,0.05)",
                        },
                      }}
                    >
                      {/* DATE */}

                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#16355d",
                        }}
                      >
                        {item.date || "N/A"}
                      </Typography>

                      {/* OVERVIEW */}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          minWidth: 0,
                        }}
                      >
                        {item.uploadPictures1 &&
                        item.uploadPictures1 !== "N/A" ? (
                          <Box
                            component="img"
                            src={item.uploadPictures1}
                            alt="Project overview"
                            sx={{
                              width: 65,
                              height: 48,
                              borderRadius: "7px",
                              objectFit: "cover",
                              border: "1px solid #e2e8f0",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 65,
                              height: 48,
                              borderRadius: "7px",
                              backgroundColor: "#f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#94a3b8",
                              fontSize: "11px",
                              flexShrink: 0,
                            }}
                          >
                            No Image
                          </Box>
                        )}

                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#8491a3",
                          }}
                        >
                          Daily Report
                        </Typography>
                      </Box>

                      {/* PREPARED BY */}

                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#475569",
                          fontWeight: 500,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {item.preparedBy || "N/A"}
                      </Typography>

                      {/* REVIEWED BY */}

                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#475569",
                          fontWeight: 500,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {item.reviewedBy || "N/A"}
                      </Typography>

                      {/* VIEW BUTTON */}

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          navigate(
                            `/${item.date}/detailedprojectpage`
                          )
                        }
                        sx={{
                          borderColor: "#16355d",
                          color: "#16355d",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: "7px",
                          minWidth: "75px",
                          "&:hover": {
                            backgroundColor: "#16355d",
                            color: "#ffffff",
                            borderColor: "#16355d",
                          },
                        }}
                      >
                        View →
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      padding: "40px 20px",
                      textAlign: "center",
                      backgroundColor: "#f8fafc",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "14px",
                      }}
                    >
                      No submissions available for this project.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>

            {/* ====================================== */}
            {/* MOBILE LAYOUT - KEPT UNCHANGED */}
            {/* ====================================== */}

            <div className="grid grid-cols-1 gap-6 md:hidden mb-3b shadow-lg p-2 m-2">
              <div className="p-6 space-y-4 bg-gray-100 ">
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() =>
                      navigate(`/entrydetails/${id}`)
                    }
                    className="bg-green-600 text-white rounded-lg hover:bg-green-700 p-2"
                  >
                    + Add More
                  </button>
                </div>

                <div className="space-y-4 h-[500px] overflow-y-auto">
                  {filteredArray.length > 0 ? (
                    filteredArray.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between min-h-[120px]"
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
                            navigate(
                              `/${item.date}/detailedprojectpage`
                            )
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
    </Box>
  );
};

export default ViewDetails;
