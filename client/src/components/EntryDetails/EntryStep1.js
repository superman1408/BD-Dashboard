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
  const [status, setStatus] = useState("");

  const [materialInventoryRows, setMaterialInventoryRows] = useState([
    { description: "", quantity: "" },
  ]);

  const [materialRequirementRows, setMaterialRequirementRows] = useState([
    { description: "", quantity: "" },
  ]);

  const handleAddActivity = () => {
    if (inputValue.trim() === "") return;
    const newActivity = { text: inputValue, image: imageFile, status: status };
    const updatedActivities = [...(formData.activityList || []), newActivity];
    setFormData({ ...formData, activityList: updatedActivities });
    setInputValue("");
    setImageFile(null);
    setStatus("");
    setShow(false);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = formData.activityList.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, activityList: updatedActivities });
  };

  const handleRowChange = (type, index, field, value) => {
    let updatedRows;
    switch (type) {
      case "materialInventory":
        updatedRows = [...formData.materialInventoryList];
        updatedRows[index][field] = value;
        setFormData({ ...formData, materialInventoryList: updatedRows });
        break;

      case "materialRequirement":
        updatedRows = [...formData.materialRequiredList];
        updatedRows[index][field] = value;
        setFormData({ ...formData, materialRequiredList: updatedRows });
        break;

      default:
        break;
    }
  };

  const handleAddRow = (type) => {
    switch (type) {
      case "materialInventory": {
        const updatedRows = [
          ...(formData.materialInventoryList || []),
          { description: "", quantity: "" },
        ];
        setFormData({
          ...formData,
          materialInventoryList: updatedRows,
        });
        break;
      }

      case "materialRequirement": {
        const updatedRows = [
          ...(formData.materialRequiredList || []),
          { description: "", quantity: "" },
        ];
        setFormData({
          ...formData,
          materialRequiredList: updatedRows,
        });
        break;
      }

      default:
        break;
    }
  };

  const handleRemoveRow = (type, index) => {
    let updatedRows;
    switch (type) {
      case "materialInventory":
        updatedRows = formData.materialInventoryList.filter(
          (_, i) => i !== index
        );
        setFormData((prev) => ({
          ...prev,
          materialInventoryList: updatedRows,
        }));
        break;

      case "materialRequirement":
        updatedRows = formData.materialRequiredList.filter(
          (_, i) => i !== index
        );
        setFormData((prev) => ({ ...prev, materialRequiredList: updatedRows }));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-blue-700 py-2 border-b-2 border-blue-500 mb-10">
        Detail Input Form
      </h1>

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
          + Add Activity
        </Button>

        <ListGroup className="mt-2">
          {(formData.activityList || []).map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-3 justify-space-evenly">
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
                {/* <label>{item.text}</label> */}

                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const newList = [...formData.activityList];
                    newList[index].text = e.target.value;
                    setFormData({ ...formData, activityList: newList });
                  }}
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "2px 6px",
                    fontSize: "0.85rem",
                  }}
                />

                <label
                  style={{
                    backgroundColor:
                      item.status === "In Progress"
                        ? "orange"
                        : item.status === "Completed"
                        ? "green"
                        : "transparent",
                    color: item.status ? "white" : "black",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                  }}
                >
                  {item.status}
                </label>
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

            <Form.Control
              as="select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="mt-2"
            >
              <option value="">Select Status</option>
              {/* <option value="Pending">Pending</option> */}
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
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

      <Form.Group controlId="formMaterialInventory" className="mb-3">
        <Form.Label>Material Inventory</Form.Label>
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
            {(formData.materialInventoryList || []).map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Control type="text" value={index + 1} readOnly />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={row.description}
                    onChange={(e) =>
                      handleRowChange(
                        "materialInventory",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(
                        "materialInventory",
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveRow("materialInventory", index)}
                    size="sm"
                  >
                    ✖
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="primary"
          onClick={() => handleAddRow("materialInventory")}
        >
          + Add Row
        </Button>
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
                      handleRowChange(
                        "materialRequirement",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(
                        "materialRequirement",
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleRemoveRow("materialRequirement", index)
                    }
                    size="sm"
                  >
                    ✖
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="primary"
          onClick={() => handleAddRow("materialRequirement")}
        >
          + Add Row
        </Button>
      </Form.Group>
    </>
  );
};

export default EntryStep1;
