import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, button } from "react-bootstrap";
import "./EntryDetails.css";
import { Divider } from "@mui/material";
import { entryDetails } from "../../action/posts";

const EntryDetails = () => {
  const [fileError, setFileError] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    activity1: "",
    activity2: "",
    activity3: "",
    activity4: "",
    maleLabour: "",
    femaleLabour: "",
    mason: "",
    uploadPictures: "",
    submittedBy: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(entryDetails(formData));

    console.log(formData);
    navigate("/viewdetails");
  };

  const handleKeyDown = (e, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: prevFormData[fieldName] + "\n•",
      }));
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", paddingTop: "10px" }}
    >
      <Card className="p-4 custom-card">
        <h3 className="text-center text-primary">Entry Detail Form</h3>
        <Form>
          <Form.Group controlId="formProjectName" className="mb-3">
            <Form.Label>Project Name</Form.Label>
          </Form.Group>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />

          <Form.Group controlId="formActivities" className="mb-3 ">
            <Form.Label style={{ fontSize: "18px" }}>Activities</Form.Label>
          </Form.Group>

          <Form.Group controlId="formCivilStructure" className="mb-3">
            <Form.Label>Civil & Structure</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter civil & structure details"
              name="activity1"
              style={{ height: "80px" }}
              value={formData.activity1}
              onChange={(e) =>
                setFormData({ ...formData, activity1: e.target.value })
              }
              onKeyDown={(e) => handleKeyDown(e, "activity1")}
            />
          </Form.Group>

          <Form.Group controlId="formPlannedWork" className="mb-3">
            <Form.Label>Planned Work For Tomorrow</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter planned work for tomorrow"
              name="activity2"
              style={{ height: "80px" }}
              value={formData.activity2}
              onChange={(e) => {
                setFormData({ ...formData, activity2: e.target.value });
              }}
              onKeyDown={(e) => handleKeyDown(e, "activity2")}
            />
          </Form.Group>

          <Form.Group controlId="formMaterialRequirement" className="mb-3">
            <Form.Label>Material Requirement</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter material requirement"
              name="activity3"
              style={{ height: "80px" }}
              value={formData.activity3}
              onChange={(e) => {
                setFormData({ ...formData, activity3: e.target.value });
              }}
              onKeyDown={(e) => handleKeyDown(e, "activity3")}
            />
          </Form.Group>

          <Form.Group controlId="formProcurementStatus" className="mb-3">
            <Form.Label>Procurement Status</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter procurement status"
              name="activity4"
              style={{ height: "80px" }}
              value={formData.activity4}
              onChange={(e) => {
                setFormData({ ...formData, activity4: e.target.value });
              }}
              onKeyDown={(e) => handleKeyDown(e, "activity4")}
            />
          </Form.Group>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formMaleLabour">
                <Form.Label>Male Labour</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter male labour count"
                  name="maleLabour"
                  value={formData.maleLabour}
                  onChange={(e) => {
                    setFormData({ ...formData, maleLabour: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formFemaleLabour">
                <Form.Label>Female Labour</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter female labour count"
                  name="femaleLabour"
                  value={formData.femaleLabour}
                  onChange={(e) => {
                    setFormData({ ...formData, femaleLabour: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formMason">
                <Form.Label>Mason</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter mason"
                  name="mason"
                  value={formData.mason}
                  onChange={(e) => {
                    setFormData({ ...formData, mason: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formUploadPictures" className="mb-3">
            <Form.Label>Upload Pictures</Form.Label>
            <Form.Control
              type="file"
              accept="/*"
              multiple
              name="uploadPictures"
              // onChange={handleFileChange}
              value={formData.uploadPictures}
              onChange={(e) => {
                setFormData({ ...formData, uploadPictures: e.target.value });
                const files = e.target.files;

                if (files.length > 2) {
                  setFileError("Please select only 2 photos");
                  e.target.value = null;
                } else {
                  setFileError(null);
                }
              }}
            />
            {fileError && <p>{fileError}</p>}
          </Form.Group>

          <Form.Group controlId="formSubmittedBy" className="mb-3">
            <Form.Label>Submitted By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter"
              name="submittedBy"
              value={formData.submittedBy}
              onChange={(e) => {
                setFormData({ ...formData, submittedBy: e.target.value });
              }}
            />
          </Form.Group>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />

          <button
            variant="primary"
            type="submit"
            className="float-end mt-3 mr-3 mb-3 ml-3 btn-custom"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Form>
      </Card>
    </Container>
  );
};

export default EntryDetails;
