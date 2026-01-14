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
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const EntryStep1 = ({ formData, setFormData, projectNumber }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("");

  const [materialInventoryRows, setMaterialInventoryRows] = useState([
    { description: "", openingStock: "", issued: "", closingStock: "" },
  ]);

  const [materialRequirementRows, setMaterialRequirementRows] = useState([
    { description: "", quantity: "" },
  ]);

  const handleAddActivity = () => {
    if (inputValue.trim() === "") return;
    const newActivity = {
      text: inputValue,
      quantity: inputQuantity,
      image: imageFile,
      status: status,
    };
    const updatedActivities = [...(formData.activityList || []), newActivity];
    setFormData({ ...formData, activityList: updatedActivities });
    setInputValue("");
    setInputQuantity("");
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

        const opening = Number(updatedRows[index].openingStock) || 0;
        const issued = Number(updatedRows[index].issued) || 0;
        const received = Number(updatedRows[index].received) || 0;

        const closingStock = opening - issued + received;

        updatedRows[index].closingStock = Math.max(closingStock, 0);

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

  const isMaterialInventoryValid = () => {
    return (formData.materialInventoryList || []).every((row) => {
      const opening = Number(row.openingStock) || 0;
      const issued = Number(row.issued) || 0;

      return row.openingStock !== "" && row.issued !== "" && issued <= opening;
    });
  };

  const handleAddRow = (type) => {
    switch (type) {
      case "materialInventory": {
        const updatedRows = [
          ...(formData.materialInventoryList || []),
          {
            description: "",
            openingStock: "",
            issued: "",
            received: 0,
            closingStock: 0,
          },
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

  const materialOptions = [
    { label: "Cement (Bags)" },
    { label: "Sand (CFT)" },
    { label: "Aggregate (CFT)" },
    { label: "Rod (Ton / Kg)" },
    { label: "Bricks (Nos.)" },
    { label: "Binding Wire (Kg)" },
    { label: "Nails (Kg)" },
    { label: "Cover Block (Nos.)" },
    { label: "Wood Cutting Blade (Nos.)" },
    { label: "Rod Cutting Blade (Nos.)" },
    { label: "Others" },
  ];

  const isIssuedMoreThanOpening = (row) => {
    const opening = Number(row.openingStock) || 0;
    const issued = Number(row.issued) || 0;
    return issued > opening;
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

                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => {
                    const newList = [...formData.activityList];
                    newList[index].quantity = e.target.value;
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
              as="textarea"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="mt-2"
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
              <th style={{ width: "150px" }}>Opening Stock</th>
              <th style={{ width: "150px" }}>Issued</th>
              <th style={{ width: "150px" }}>Received</th>
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
                  {/* <Form.Control
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
                  /> */}

                  <Form.Select
                    value={row.materialOptions}
                    onChange={(e) =>
                      handleRowChange(
                        "materialInventory",
                        index,
                        "materialOptions",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Material</option>
                    {materialOptions.map((m, i) => (
                      <option key={i} value={m.label}>
                        {m.label}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={row.openingStock}
                    required
                    min="0"
                    onChange={(e) =>
                      handleRowChange(
                        "materialInventory",
                        index,
                        "openingStock",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      isIssuedMoreThanOpening(row) ? (
                        <Tooltip id={`tooltip-issued-${index}`}>
                          Material Issued cannot be more than Opening Stock
                        </Tooltip>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <Form.Control
                      type="number"
                      value={row.issued}
                      min="0"
                      style={{
                        borderColor: isIssuedMoreThanOpening(row)
                          ? "#dc3545"
                          : "",
                        backgroundColor: isIssuedMoreThanOpening(row)
                          ? "#fdecea"
                          : "",
                      }}
                      onChange={(e) =>
                        handleRowChange(
                          "materialInventory",
                          index,
                          "issued",
                          e.target.value
                        )
                      }
                    />
                  </OverlayTrigger>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={row.received}
                    onChange={(e) =>
                      handleRowChange(
                        "materialInventory",
                        index,
                        "received",
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
          disabled={!isMaterialInventoryValid()}
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
