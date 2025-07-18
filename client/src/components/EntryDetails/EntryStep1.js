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

const EntryStep1 = ({ formData, setFormData, projectNumber }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleAddActivity = () => {
    if (inputValue.trim() === "") return;
    const newActivity = { text: inputValue, image: imageFile };
    const updatedActivities = [...(formData.activityList || []), newActivity];
    setFormData({ ...formData, activityList: updatedActivities });
    setInputValue("");
    setImageFile(null);
    setShow(false);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = formData.activityList.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, activityList: updatedActivities });
  };

  const handleAddRow = () => {
    const updatedRows = [
      ...(formData.materialRequiredList || []),
      { serialNo: "", description: "", quantity: "" },
    ];
    setFormData({ ...formData, materialRequiredList: updatedRows });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formData.materialRequiredList];
    updatedRows[index][field] = value;
    setFormData({ ...formData, materialRequiredList: updatedRows });
  };

  const handleRemoveRow = (index) => {
    const updatedRows = formData.materialRequiredList.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, materialRequiredList: updatedRows });
  };

  return (
    <>
      <h3 className="text-center text-primary fw-bold py-2">
        Detail Input Form
      </h3>

      <Form.Group controlId="formProjectName" className="mb-3">
        <Form.Label>
          <strong>Project Number :</strong> {projectNumber}
        </Form.Label>
      </Form.Group>

      <Row>
        <Col md={6} className="mb-3">
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date || ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Divider
        className="my-3"
        style={{ height: "2px", backgroundColor: "#000" }}
      />

      <h4 className="text-primary fw-bold my-3">Activities</h4>

      <Form.Group className="mb-3">
        <Form.Label>Civil & Structure (Max 5)</Form.Label>
        <Button
          onClick={() => setShow(true)}
          disabled={(formData.activityList?.length || 0) >= 5}
          className="ms-2"
        >
          Add Activity
        </Button>

        <ListGroup className="mt-2">
          {(formData.activityList || []).map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-3">
                <strong>{index + 1}.</strong>
                {item.image && (
                  <img
                    src={URL.createObjectURL(item.image)}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}
                <span>{item.text}</span>
              </div>

              <Button
                variant="danger"
                onClick={() => handleRemoveActivity(index)}
                size="sm"
              >
                ✖
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Modal
          show={show}
          style={{ marginTop: "150px" }}
          onHide={() => setShow(false)}
        >
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
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Modal.Body>
          <Modal.Footer className="w-100 d-flex justify-content-between">
            <Button onClick={() => setShow(false)} variant="secondary">
              Close
            </Button>
            <Button onClick={handleAddActivity} variant="primary">
              Add
            </Button>
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
            {(formData.materialRequiredList || []).map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Control type="text" value={index + 1} readOnly />
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
                    size="sm"
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
