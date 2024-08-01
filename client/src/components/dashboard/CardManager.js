import { Card } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardManager = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    docNo: "",
    startingDate: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form Submitted");
    setCards([...cards, formData]);
    setFormData({ projectName: "", docNo: "", startingDate: "" });
    setFormVisible(false);
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
              <div>
                <label>Starting Date</label>
                <input
                  type="date"
                  name="startingDate"
                  value={formData.startingDate}
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
        {cards.map((card, index) => (
          <Card sx={{ padding: "12px", margin: "10px" }} key={index}>
            <h3 style={{ textAlign: "center" }}>{card.projectName}</h3>
            <h5>{card.docNo}</h5>
            <h5>{card.startingDate}</h5>
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

export default CardManager;
