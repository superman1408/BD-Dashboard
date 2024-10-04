import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { Card, Button, Modal } from "react-bootstrap";

import FileBase from "react-file-base64";
import AddchartSharpIcon from "@mui/icons-material/AddchartSharp";
import { createPost, getPosts } from "../../action/posts";
import { IconButton, Typography, LinearProgress } from "@mui/material";
// import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formVisible, setFormVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    docNo: "",
    selectedFile: "",
  });

  const posts = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getPosts()).finally(() => setLoading(false));
  }, [dispatch, loading]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //For setting the value of different input inside the FormData
  };

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true when starting submission
    // Add the form data to local state (cards) and hide the form
    setCards([...cards, formData]);
    setFormData({
      projectName: "",
      clientName: "",
      docNo: "",
      selectedFile: "",
    });
    setFormVisible(false);

    try {
      await dispatch(createPost(formData)); // Dispatch the async action
    } catch (error) {
      console.error("Failed to submit the project", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after submission
    }
  };

  // ---------Navigation to the different pages in the Application----------------
  const handleEntry = (docNo) => {
    navigate(`/entrydetails/${docNo}`);
  };

  const handleDetails = (docNo) => {
    navigate(`/${docNo}/viewdetails`);
  };

  return (
    <div
      style={{
        display: "flex",
        // height: "446px",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          "@media (max-width):350px": {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Grid>
          <Card
            style={{
              width: "200px",
              // height: "426px",
              flexShrink: 0, // Prevent the card from shrinking
              margin: "10px",
              border: "2px solid white",
              // marginBottom: "300px",
            }}
          >
            <IconButton
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0", // Button background color
                padding: "10px", // Padding inside the button
                borderRadius: "10px", // Rounded corners
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Shadow for the button
              }}
              onClick={() => setFormVisible(true)}
            >
              <AddchartSharpIcon
                style={{
                  fontSize: "36px", // Size of the icon
                  color: "#0d6efd", // Icon color
                }}
              />
              <Typography
                style={{
                  fontSize: "14px", // Font size for the text
                  // color: "#3f51b5", // Text color,
                  color: "#0d6efd",
                  marginTop: "5px", // Space between the icon and text
                }}
              >
                Add Project
              </Typography>
            </IconButton>

            {/* Modal for Form */}
            <Modal
              style={{ marginTop: "80px" }}
              show={formVisible}
              onHide={() => setFormVisible(false)}
              centered
            >
              <Modal.Header closeButton>
                <h5 style={{ fontWeight: "bold" }}>Add New Project</h5>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  <div style={{ padding: "10px" }}>
                    <label>Project Name : </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleFormChange}
                      required
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>Client Name : </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleFormChange}
                      required
                      style={{ marginLeft: "20px" }}
                    />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>Project No. : </label>
                    <input
                      type="text"
                      name="docNo"
                      value={formData.docNo}
                      onChange={handleFormChange}
                      required
                      style={{ marginLeft: "28px" }}
                    />{" "}
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>Project Picture : </label>
                    <FileBase
                      type="file"
                      multiple={false}
                      fileName="Profile.png"
                      onDone={({ base64 }) =>
                        setFormData({ ...formData, selectedFile: base64 })
                      }
                    />
                  </div>
                  <button
                    style={{ margin: "20px", padding: "10px", float: "right" }}
                    type="submit"
                    className="btn-custom"
                  >
                    Submit
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </Card>
        </Grid>
        {loading ? (
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {posts.map((post, index) => (
              <Card
                key={index}
                style={{
                  width: "300px",
                  padding: "12px",
                  margin: "10px",
                  backgroundColor: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={post?.selectedFile} // Ensure post.selectedFile is defined
                  alt="Profile_Picture"
                  style={{ height: "150px" }}
                />

                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center" }}>Project Name</h6>
                    <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                      {post?.projectName}
                    </h4>
                    <h6 style={{ textAlign: "center" }}>
                      Project Number : {post?.docNo}
                    </h6>
                  </Card.Text>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => handleEntry(post.docNo)}
                    >
                      Entry
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleDetails(post.docNo)}
                    >
                      Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
