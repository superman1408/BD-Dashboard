import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./EntryDetails.css";
import { Divider } from "@mui/material";

const EntryDetails = () => {
  const [fileError, setFileError] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length > 2) {
      setFileError("Please select only 2 photos");
      e.target.value = null;
    } else {
      setFileError(null);
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
                <Form.Control type="date" />
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
              style={{ height: "80px" }}
            />
          </Form.Group>

          <Form.Group controlId="formPlannedWork" className="mb-3">
            <Form.Label>Planned Work For Tomorrow</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter planned work for tomorrow"
              style={{ height: "80px" }}
            />
          </Form.Group>

          <Form.Group controlId="formMaterialRequirement" className="mb-3">
            <Form.Label>Material Requirement</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter material requirement"
              style={{ height: "80px" }}
            />
          </Form.Group>

          <Form.Group controlId="formProcurementStatus" className="mb-3">
            <Form.Label>Procurement Status</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter procurement status"
              style={{ height: "80px" }}
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
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formFemaleLabour">
                <Form.Label>Female Labour</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter female labour count"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formMason">
                <Form.Label>Mason</Form.Label>
                <Form.Control type="number" placeholder="Enter mason" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formUploadPictures" className="mb-3">
            <Form.Label>Upload Pictures</Form.Label>
            <Form.Control
              type="file"
              accept="/*"
              multiple
              onChange={handleFileChange}
            />
            {fileError && <p>{fileError}</p>}
          </Form.Group>

          <Form.Group controlId="formSubmittedBy" className="mb-3">
            <Form.Label>Submitted By</Form.Label>
            <Form.Control type="text" placeholder="Enter" />
          </Form.Group>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />

          <Button
            variant="primary"
            type="submit"
            className="float-end mt-3 mr-3 mb-3 ml-3"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EntryDetails;
