import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Card, Button } from "react-bootstrap";

import FileBase from "react-file-base64";
import { createPost, getPosts } from "../../action/posts";
// import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    docNo: "",
    projectFile: "",
  });

  const posts = useSelector((state) => state.posts);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getPosts()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  console.log(posts);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form Submitted");
    setCards([...cards, formData]);
    setFormData({ projectName: "", docNo: "", projectFile: "" });
    setFormVisible(false);

    dispatch(createPost(formData));
  };

  const handleEntry = () => {
    navigate("/entrydetails");
    console.log("Navigated");
  };

  const handleDetails = () => {
    navigate("/detailedprogress");
    console.log("Navigated");
  };

  return (
    <div style={{ display: "flex" }}>
      <Card style={{ width: "200px", justifyContent: "center" }}>
        <button onClick={() => setFormVisible(!formVisible)}>+</button>

        {formVisible && (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label>Doc. No.</label>
                <input
                  type="text"
                  name="docNo"
                  value={formData.docNo}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label>Project Picture</label>
                <FileBase
                  type="file"
                  multiple={false}
                  fileName="Profile.png"
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, selectedFile: base64 })
                  }
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Card>
      <div style={{ display: "flex" }}>
        {posts.map((post) => (
          <Card
            style={{
              width: "18rem",
              padding: "12px",
              margin: "10px",
              backgroundColor: "white",
            }}
          >
            <Card.Img variant="top" src="image-url" />
            <Card.Body>
              <Card.Text>
                <h3 style={{ textAlign: "center" }}>{post.projectName}</h3>
                <h5>{post.docNo}</h5>
              </Card.Text>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button variant="primary" onClick={handleEntry}>
                  Entry
                </Button>
                <Button variant="primary" onClick={handleDetails}>
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
