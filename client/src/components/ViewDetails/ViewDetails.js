import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEntryDetails } from "../../action/posts";

const ViewDetails = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntryDetails());
  }, []);

  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return (
    <Grid
      padding="10px"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        elevation={10}
        sx={{
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#f2f2f2",
          borderCollapse: "collapse",
          marginBottom: "130px",
          // border: "1px solid black",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontFamily: "Roboto ",
            color: "#0d325c",
          }}
        >
          View Details Form
        </h3>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <Grid>
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
                  <td>Date</td>
                  <td align="right">Overview</td>
                  <td align="right">Submitted By</td>
                  <td align="right"></td>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td>{post.date}</td>
                    <td align="right">{post.overview}</td>
                    <td align="right">{post.submittedBy}</td>
                    <td align="right">
                      <button onClick={() => navigate("/printlayout")}>
                        View
                      </button>
                      <button onClick={() => navigate("/entrydetails")}>
                        Edit
                      </button>
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ViewDetails;
