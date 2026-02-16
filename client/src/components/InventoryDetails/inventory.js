import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";

import Procurement from "../Procurement/Procurement";
import { inventoryList } from "../../action/inventory";

export default function InventoryForm() {
  const [entries, setEntries] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  // const [formData, setFormData] = useState({ activityList: [] });

  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [vendor, setVendor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentId, setCurrentId] = useState(id);

  const clearForm = () => {
    setMaterial("");
    setQuantity("");
    setUnit("");
    setVendor("");
    setRemarks("");
    setStatus("");
    setImageFile(null);
  };

  const materialUnitMap = {
    Rod: ["Kg", "Ton", "Nos"],
    Cement: ["Bag", "Kg"],
    Bricks: ["Nos"],
    Sand: ["CFT", "Ton"],
    Aggregate: ["CFT", "Ton"],
    "Binding wire": ["Kg"],
    Nails: ["Kg", "Packets"],
    "Cover block": ["Nos"],
    "Wood cutting blade": ["Pieces"],
    "Rod cutting blade": ["Pieces"],
    Other: ["Kg", "Nos", "Pieces"],
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!material || !unit || Number(quantity) <= 0 || !vendor) {
      alert("⚠️ Fill the form completely");
      setIsSubmitting(false);
      return;
    }

    // const submittedAt = new Date().toISOString();
    // const displayTime = new Date(submittedAt).toLocaleString("en-IN", {
    //   dateStyle: "medium",
    //   timeStyle: "short",
    // });

    const newActivity = {
      material: material.trim(),
      quantity: Number(quantity),
      unit: unit.trim(),
      vendor: vendor?.trim(),
      remarks: remarks?.trim(),
      status: status?.trim(),
      // submittedAt,
      // displayTime,
    };

    // console.log("Sending payload:", newActivity);

    try {
      await dispatch(inventoryList(newActivity, currentId)).then((res) => {
        clearForm(); // <-- Clear form here
        alert("✅ Entry submitted successfully!");
        // window.location.reload();
        setShow(false);
      });
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {" "}
      {/* Added padding */}
      <div className="bg-gray-50 p-6 rounded shadow">
        {" "}
        {/* Form wrapper padding */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid>
            <Form.Group className="mb-2">
              <Button onClick={() => setShow(true)} className="ms-2">
                + Add Inventory
              </Button>

              <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
                container={document.body}
                size="lg"
                style={{ marginTop: "60px" }}
              >
                <Modal.Header closeButton className="justify-content-center">
                  <Modal.Title className="w-100 text-center fw-bold">
                    Inventory Management – Material Received
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    {/* Material ComboBox */}
                    {/* Material + Unit */}
                    <Row>
                      <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Material Name</Form.Label>
                          <Form.Select
                            value={material}
                            onChange={(e) => {
                              setMaterial(e.target.value);
                              setUnit(""); // reset unit when material changes
                            }}
                          >
                            <option value="">Select Material</option>
                            <option value="Rod">Rod</option>
                            <option value="Cement">Cement</option>
                            <option value="Bricks">Bricks</option>
                            <option value="Sand">Sand</option>
                            <option value="Aggregate">Aggregate</option>
                            <option value="Binding wire">Binding wire</option>
                            <option value="Nails">Nails</option>
                            <option value="Cover block">Cover block</option>
                            <option value="Wood cutting blade">
                              Wood cutting blade
                            </option>
                            <option value="Rod cutting blade">
                              Rod cutting blade
                            </option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        {/* Quantity Received */}
                        <Form.Group className="mb-3">
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Unit</Form.Label>
                          <Form.Select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            disabled={!material}
                          >
                            <option value="">Select Unit</option>

                            {[
                              "Kg",
                              "Ton",
                              "Bag",
                              "Nos",
                              "CFT",
                              "Packets",
                              "Pieces",
                            ].map((u) => (
                              <option
                                key={u}
                                value={u}
                                disabled={
                                  material &&
                                  !materialUnitMap[material]?.includes(u)
                                }
                              >
                                {u}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      {/* Image Upload */}
                      {/* <Form.Group className="mb-3">
                      <Form.Label>Upload Challan / Material Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />

                      {imageFile && (
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className="mt-2"
                          style={{ width: "120px", borderRadius: "6px" }}
                        />
                      )}
                    </Form.Group> */}

                      <Col xs={12} md={6}>
                        {/* Status */}
                        <Form.Group className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="">Select Status</option>
                            <option value="Received">Received</option>
                            <option value="Issued">Issued</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Remarks */}
                    <Form.Group>
                      <Form.Label>Remarks</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={2}
                        placeholder="Optional remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </Form.Group>

                    {/* Received by */}
                    <Form.Group className="mb-3">
                      <Form.Label>Received / Issued By</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Received By"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                      />
                    </Form.Group>

                    {/* <Form.Group className="mb-2">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date().toLocaleString("en-IN")}
                        disabled
                      />
                    </Form.Group> */}
                  </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAddActivity}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Inventory"}
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form.Group>
          </Grid>
        </Grid>
      </div>
      <Procurement />
    </div>
  );
}
