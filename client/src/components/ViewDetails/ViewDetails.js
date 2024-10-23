/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Card, LinearProgress, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEntryDetails } from "../../action/posts";
import { Button } from "react-bootstrap";

const ViewDetails = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Fetch posts from Redux store
  const entry = useSelector((state) => state.entry);

  let array = [];

  const updateArray = async (post) => {
    const array = [];
    entry.map((post) => {
      for (let index = 0; index < post?.submittedBy.length; index++) {
        if (id === post.projectNumber) {
          array.push({
            submittedBy: post?.submittedBy[index],
            date: post?.date[index],
            uploadPictures1: post?.uploadPictures1[index],
          });
        }
      }
      console.log(array.uploadPictures1);
    });
    setLoading(false);
  };

  // Fetch data when component mounts
  // useEffect(() => {
  //   if (entry.length === 0) {
  //     if (loading) {
  //       dispatch(getEntryDetails()).then(() => {
  //         updateArray().then(() => {
  //           console.log("Data fetched, setting loading to false");
  //           setLoading(false);
  //         });
  //       });
  //     }
  //   }
  // }, [dispatch, entry.length]);

  useEffect(() => {
    if (entry.length === 0) {
      setLoading(true);
      window.scrollTo(0, 0);

      dispatch(getEntryDetails()).then(() => {
        updateArray().then(() => {
          setLoading(false);
        });
      });
    }

    // return () => {
    //   // Dispatch an action to reset the entry state if necessary
    //   // dispatch(resetEntryState());
    // };
  }, [dispatch, entry]);

  // Optional: Update windowWidth on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  entry.map((post) => {
    for (let index = 0; index < post?.submittedBy.length; index++) {
      if (id === post.projectNumber) {
        array.push({
          submittedBy: post?.submittedBy[index],
          date: post?.date[index],
          uploadPictures1: post?.uploadPictures1[index],
        });
      }
      console.log(array.uploadPictures1);
    }
  });

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
        {loading ? (
          <div style={{ marginTop: "20px", paddingBottom: "200vh" }}>
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
                        <th>Date</th>
                        <th>Overview</th>
                        <th>Submitted By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {array.length > 0 ? (
                        array.map((post, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              {post.date || "N/A"}
                            </td>
                            <td style={{ width: "150px", height: "100px" }}>
                              <img
                                style={{
                                  width: "120px",
                                  height: "80px",
                                  margin: "10px",
                                }}
                                src={post.uploadPictures1 || "N/A"}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {post.submittedBy || "N/A"}
                            </td>
                            <td style={{ justifyContent: "space-between" }}>
                              <button
                                style={{ marginRight: "10px" }}
                                onClick={() => {
                                  navigate(`/${post.date}/detailedprojectpage`);
                                  window.location.reload();
                                  // window.scrollTo(0, 0);
                                  // });
                                }}
                              >
                                View
                              </button>
                              {/* <button
                              onClick={() =>
                                navigate(`/entrydetails/${post.date}`)
                              } // Pass date to edit page
                            >
                              Edit
                            </button> */}
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
            </Card>{" "}
            <Button
              onClick={() => {
                navigate(`/entrydetails/${id}`);
              }}
            >
              Add more
            </Button>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default ViewDetails;

// the above works just once then again going to smae pages same error occurs needs to rfresh th epage
