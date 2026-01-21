import React, { useState, useEffect } from "react";
import {Grid} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  Button,
  Modal,
  Row,
  Col
} from "react-bootstrap";

import Procurement from "../Procurement/Procurement";
import {inventoryList} from "../../action/inventory";

export default function InventoryForm() {
   
   const [entries, setEntries] = useState([]);
   
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(false);
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

  // const [formData, setFormData] = useState({
  //   sno: "",
  //   category: "",
  //   itemName: "",
  //   specification: "",
  //   unit: "",
  //   openingStock: "",
  //   qtyReceived: "",
  //   qtyIssued: "",
  //   closingStock: "",
  //   vendor: "",
  //   invoiceNo: "",
  //   location: "",
  //   condition: "",
  //   remarks: "",
  //   signature: "",
  // });

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
  "Rod cuttting blade": ["Pieces"],
  Other: ["Kg", "Nos", "Pieces"],
};


  // const handleAddActivity = () => {
  //   if (inputValue.trim() === "") return;
  //   const newActivity = { text: inputValue, image: imageFile, status: status };
  //   const updatedActivities = [...(formData.activityList || []), newActivity];
  //   setFormData({ ...formData, activityList: updatedActivities });
  //   setInputValue("");
  //   setImageFile(null);
  //   setStatus("");
  //   setShow(false);
  // };

  const handleAddActivity = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!material?.trim() || !unit?.trim() || Number(quantity) <= 0) {
  alert("⚠️ Fill the form completely");
  setIsSubmitting(false);
  return;
}



  // ✅ Timestamp on submit
  const submittedAt = new Date().toISOString();
  const displayTime = new Date(submittedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const newActivity = {
  material: material.trim(),
  quantity: Number(quantity),
  unit: unit.trim(),
  remarks: remarks?.trim(),
  status: status?.trim(),
  image: imageFile,
  submittedAt,
  displayTime,
};


  // ✅ Validation
  // if (!validateEntry(newActivity)) {
  //   setIsSubmitting(false);
  //   return;
  // }

  try {
    // 🔹 Update local state
    setEntries((prev) => [...prev, newActivity]);

    // 🔹 Send to backend
    await dispatch(inventoryList(newActivity, id));

    // 🔹 Update formData list
    setFormData((prev) => ({
      ...prev,
      activityList: [...(prev.activityList || []), newActivity],
    }));

    alert("✅ Entry submitted successfully!");
    // clearForm();
    setShow(false);
  } catch (error) {
    console.error("Submission failed", error);
    alert("❌ Submission failed");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleRemoveActivity = (index) => {
    const updatedActivities = formData.activityList.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, activityList: updatedActivities });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    console.log("Form Submitted", formData);
    alert("Work in Progress!");
     window.location.reload();
  };

 

  return (
    <div> {/* Added padding */}
      <div className="bg-gray-50 p-6 rounded shadow"> {/* Form wrapper padding */}
        <Grid sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Grid>
            <Form.Group className="mb-2">
               <Button
                 onClick={() => setShow(true)}
                 disabled={(formData.activityList?.length || 0) >= 5}
                 className="ms-2"
               >
                 + Add Inventory
               </Button>

              <Modal
              show={show}
              onHide={() => setShow(false)}
              centered
              container={document.body}
              size="lg"
              style={{ marginTop: "40px" }}
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
          <Col md={6}>
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
                <option value="Wood cutting blade">Wood cutting blade</option>
                <option value="Rod cuttting blade">Rod cuttting blade</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Quantity Received */}
              <Form.Group className="mb-3">
                <Form.Label>Quantity Received</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
          </Col>
        </Row>


         <Form.Group className="mb-3">
        <Form.Label>Unit</Form.Label>
        <Form.Select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          disabled={!material}
        >
          <option value="">Select Unit</option>

          {["Kg", "Ton", "Bag", "Nos", "CFT", "Packets", "Pieces"].map(
            (u) => (
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
            )
          )}
        </Form.Select>
      </Form.Group>



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

          {/* Status */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group> */}
          

          {/* Remarks */}
            <Form.Group>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Optional remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>

            {/* Received by */}
          <Form.Group className="mb-3">
            <Form.Label>Received By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Received By"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="text"
            value={new Date().toLocaleString("en-IN")}
            disabled
          />
        </Form.Group>

          </Form>
        </Modal.Body>

          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddActivity}>
              Save Inventory
            </Button>
          </Modal.Footer>
        </Modal>

          </Form.Group>

          </Grid>
        </Grid>
        
      </div>
       <Procurement/>
    </div>
  );
}
