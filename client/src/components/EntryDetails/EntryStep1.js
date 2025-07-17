import React, { useState } from "react";
import {
  Form,
  Button,
  ListGroup,
  Modal,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { Divider } from "@mui/material";

const EntryStep1 = ({ formData, setFormData }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [materialRows, setMaterialRows] = useState([
    { serialNo: "", description: "", quantity: "" },
  ]);

  const handleAddActivity = () => {
    if (inputValue.trim() === "") return;
    setActivities([...activities, { text: inputValue, image: imageFile }]);
    setInputValue("");
    setImageFile(null);
    setShow(false);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...materialRows];
    updatedRows[index][field] = value;
    setMaterialRows(updatedRows);
    setFormData({ ...formData, materialRows: updatedRows });
  };

  const handleAddRow = () => {
    setMaterialRows([
      ...materialRows,
      { serialNo: "", description: "", quantity: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = materialRows.filter((_, i) => i !== index);
    setMaterialRows(updatedRows);
    setFormData({ ...formData, materialRows: updatedRows });
  };

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          color: "#0d325c",
          padding: "10px",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Detail Input Form
      </h3>

      <Form.Group controlId="formProjectName" className="mb-3">
        <Form.Label style={{ color: "black", fontWeight: "bold" }}>
          Project Number :
        </Form.Label>
      </Form.Group>

      <Row>
        <Col md={6} className="mb-3">
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Divider
        className="mt-3 mb-3"
        style={{ height: "2px", backgroundColor: "#000" }}
      />

      <h4
        style={{
          color: "#0d325c",
          fontWeight: "bold",
          fontSize: "20px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        Activities
      </h4>

      <Form.Group className="mb-3">
        <Form.Label>Civil & Structure (Max 5)</Form.Label>
        <Button onClick={() => setShow(true)} disabled={activities.length >= 5}>
          Add Activity
        </Button>
        <ListGroup className="mt-2">
          {activities.map((item, index) => (
            <ListGroup.Item key={index}>
              {item.text} {item.image && <span>📸</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter details"
            />
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-2"
            />
          </Modal.Body>
          <Modal.Footer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={() => setShow(false)}>Close</Button>
              <Button onClick={handleAddActivity}>Add</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Form.Group>

      <Form.Group controlId="formMaterialRequirement" className="mb-3">
        <Form.Label>Material Requirement</Form.Label>
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ width: "80px" }}>S.No</th>
              <th>Material Description</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {materialRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    style={{ width: "80px" }}
                    value={index + 1}
                    readOnly
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={row.description}
                    onChange={(e) =>
                      handleRowChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveRow(index)}
                  >
                    ✖
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={handleAddRow}>
          + Add Row
        </Button>
      </Form.Group>
    </>
  );
};

export default EntryStep1;
