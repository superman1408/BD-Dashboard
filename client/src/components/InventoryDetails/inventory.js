import React, { useState, useEffect } from "react";
import {Grid} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Modal,
  Row,
  Col
} from "react-bootstrap";

import Procurement from "../Procurement/Procurement";

export default function InventoryForm() {

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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted", formData);
  //   alert("Work in Progress!");
  //   navigate(`/dashboard/${id}`);
  // };

  // const Input = ({ label, name, type = "text" }) => (
  //   <div className="mb-1"> {/* Reduced gap */}
  //     <label className="block mb-1 font-medium text-sm">{label}</label>
  //     <input
  //       type={type}
  //       name={name}
  //       value={formData[name]}
  //       onChange={handleChange}
  //       className="w-full p-2 border rounded"
  //     />
  //   </div>
  // );

//   const Select = ({ label, name, options }) => (
//   <div className="mb-1">
//     <label className="block mb-1 font-medium text-sm">{label}</label>
//     <select
//       name={name}
//       value={formData[name]}
//       onChange={handleChange}
//       className="w-full p-2 border rounded"
//     >
//       <option value="">Select {label}</option>
//       {options.map((opt, idx) => (
//         <option key={idx} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   </div>
// );


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
            onChange={(e) => setMaterial(e.target.value)}
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
        <Form.Group className="mb-3">
          <Form.Label>Unit</Form.Label>
          <Form.Select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="">Select Unit</option>
            <option value="Kg">Kg</option>
            <option value="Ton">Ton</option>
            <option value="Bag">Bag</option>
            <option value="Nos">Nos</option>
            <option value="CFT">CFT</option>
            <option value="Packets">Packets</option>
            <option value="Pieces">Pieces</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>

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


      {/* Vendor / Invoice */}
          <Form.Group className="mb-3">
            <Form.Label>Vendor / Invoice No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter vendor or invoice number"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
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
          </Form.Group>

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
