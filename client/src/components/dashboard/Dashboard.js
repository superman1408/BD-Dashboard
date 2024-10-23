import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  IconButton,
  Typography,
  LinearProgress,
  Divider,
} from "@mui/material";
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
    projectNumber: "",
    commencementDate: "",
    projectManager: "",
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
  }, [dispatch, loading]);

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
        projectNumber: "",
        selectedFile: "",
      });
    } catch (error) {
      console.error("Failed to submit the project", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEntry = (projectNumber) => {
    navigate(`/entrydetails/${projectNumber}`);
  };

  const handleDetails = (projectNumber) => {
    navigate(`/${projectNumber}/viewdetails`);
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
                  width: "350px",
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
                    <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                      {post?.projectName}
                    </h4>
                    <Divider
                      sx={{
                        borderWidth: "3px",
                        bgcolor: "black",
                        marginBottom: "5px",
                      }}
                    />
                    <h6 style={{}}>Project Number: {post?.projectNumber}</h6>
                    <h6 style={{ display: "flex" }}>
                      Date of Commencement: {post?.commencementDate}
                    </h6>
                    <h6 style={{}}>Project Manager: {post?.projectManager}</h6>
                  </div>

                  <Button
                    variant="primary"
                    style={{ display: "flex", float: "right" }}
                    onClick={() => handleEntry(post.projectNumber)}
                  >
                    Details
                  </Button>
                  {/* </div> */}
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
                style={{ marginLeft: "100px" }}
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
                style={{ marginLeft: "110px" }}
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project No.: </label>
              <input
                type="text"
                name="projectNumber"
                value={formData.projectNumber}
                onChange={handleFormChange}
                required
                style={{ marginLeft: "120px" }}
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Date of Commencement: </label>
              <input
                type="date"
                name="commencementDate"
                value={formData.commencementDate}
                onChange={handleFormChange}
                required
                style={{ marginLeft: "20px" }}
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project Manager: </label>
              <input
                type="text"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleFormChange}
                required
                style={{ marginLeft: "80px" }}
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
            <Button
              type="submit"
              variant="primary"
              style={{ display: "flex", float: "right" }}
            >
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
