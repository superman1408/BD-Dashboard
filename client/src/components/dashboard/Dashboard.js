import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, IconButton, Typography, LinearProgress } from "@mui/material";
import { Card, Button, Modal } from "react-bootstrap";
import FileBase from "react-file-base64";
import AddchartSharpIcon from "@mui/icons-material/AddchartSharp";
import { createPost, getPosts } from "../../action/posts";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    docNo: "",
    selectedFile: "",
  });
  const posts = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getPosts())
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [dispatch]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true);

    try {
      await dispatch(createPost(formData));
      setFormVisible(false);
      setFormData({
        projectName: "",
        clientName: "",
        docNo: "",
        selectedFile: "",
      });
    } catch (error) {
      console.error("Failed to submit the project", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEntry = (docNo) => {
    navigate(`/entrydetails/${docNo}`);
  };

  const handleDetails = (docNo) => {
    navigate(`/${docNo}/viewdetails`);
  };

  return (
    <div>
      <Grid container spacing={2} marginBottom={10}>
        {/* Add Project Card */}
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Card
            style={{
              margin: "10px",
              padding: "10px",
              border: "2px solid white",
              textAlign: "center",
            }}
          >
            <IconButton onClick={() => setFormVisible(true)}>
              <AddchartSharpIcon
                style={{ fontSize: "36px", color: "#0d6efd" }}
              />
            </IconButton>
            <Typography style={{ color: "#0d6efd" }}>Add Project</Typography>
          </Card>
        </Grid>

        {/* Projects Cards */}
        {loading ? (
          <Grid item xs={12}>
            <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
          </Grid>
        ) : (
          posts.map((post, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{
                  padding: "12px",
                  margin: "20px ",
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
                  <div>
                    <h6 style={{ textAlign: "center" }}>Project Name</h6>
                    <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                      {post?.projectName}
                    </h4>
                    <h6 style={{ textAlign: "center" }}>
                      Project Number: {post?.docNo}
                    </h6>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
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
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal for Adding Projects */}
      <Modal show={formVisible} onHide={() => setFormVisible(false)} centered>
        <Modal.Header closeButton>
          <h5>Add New Project</h5>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project Name: </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleFormChange}
                required
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Client Name: </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleFormChange}
                required
                style={{ marginLeft: "20px" }}
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project No.: </label>
              <input
                type="text"
                name="docNo"
                value={formData.docNo}
                onChange={handleFormChange}
                required
                style={{ marginLeft: "28px" }}
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project Picture: </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formData, selectedFile: base64 })
                }
              />
            </div>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
