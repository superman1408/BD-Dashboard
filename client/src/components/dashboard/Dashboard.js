import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../action/posts";
import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    docNo: "",
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
    setFormData({ projectName: "", docNo: "" });
    setFormVisible(false);

    dispatch(createPost(formData));
  };

  const handleEntry = () => {
    navigate("/datasheet");
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

              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Card>
      <div style={{ display: "flex" }}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ padding: "12px", margin: "10px" }}>
            <h3 style={{ textAlign: "center" }}>{post.projectName}</h3>
            <h5>{post.docNo}</h5>

            <div style={{ display: "flex" }}>
              <button onClick={handleEntry}>Entry</button>
              <button onClick={handleDetails}>Details</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
