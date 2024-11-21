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
        post?.submittedBy?.forEach((submittedBy, index) => {
          tempArray.push({
            submittedBy,
            date: post?.date[index],
            uploadPictures1: post?.uploadPictures1[index],
          });
        });
      }
    });
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

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          padding: "10px",
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
                sx={{ color: "blue", fontWeight: "bold" }}
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

            {/* Data Table */}
            <Card
              elevation={10}
              sx={{
                padding: "10px",
                margin: "10px",
                marginBottom: "50px",
                width: windowWidth <= 600 ? "100%" : "80%",
              }}
            >
              <table
                className="time-sheet-table"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "center",
                  border: "1px solid black",
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
                <tbody>
                  {filteredArray.length > 0 ? (
                    filteredArray.map((item, index) => (
                      <tr key={index}>
                        <td style={{ padding: "10px" }}>
                          {item.date || "N/A"}
                        </td>
                        <td>
                          <img
                            style={{
                              width: "100px",
                              height: "70px",
                              objectFit: "cover",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            src={item.uploadPictures1 || "N/A"}
                            alt="Overview"
                          />
                        </td>
                        <td style={{ padding: "10px" }}>
                          {item.submittedBy || "N/A"}
                        </td>
                        <td>
                          <Button
                            variant="contained"
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
            </Card>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default ViewDetails;
