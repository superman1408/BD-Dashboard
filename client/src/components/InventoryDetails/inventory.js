import React, { useState } from "react";
import {divider, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function InventoryForm() {

  const navigate = useNavigate();
   const { id } = useParams();
  const [formData, setFormData] = useState({
    sno: "",
    category: "",
    itemName: "",
    specification: "",
    unit: "",
    openingStock: "",
    qtyReceived: "",
    qtyIssued: "",
    closingStock: "",
    vendor: "",
    invoiceNo: "",
    location: "",
    condition: "",
    remarks: "",
    signature: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Work in Progress!");
    navigate(`/dashboard/${id}`);
  };

  const Input = ({ label, name, type = "text" }) => (
    <div className="mb-1"> {/* Reduced gap */}
      <label className="block mb-1 font-medium text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const Select = ({ label, name, options }) => (
  <div className="mb-1">
    <label className="block mb-1 font-medium text-sm">{label}</label>
    <select
      name={name}
      value={formData[name]}
      onChange={handleChange}
      className="w-full p-2 border rounded"
    >
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);


  return (
    <div className="max-w-5xl mx-auto p-4"> {/* Added padding */}
      <div className="bg-gray-50 p-6 rounded shadow"> {/* Form wrapper padding */}
        <Grid sx={{justifyContent:"space-evenly"}}>
          <Grid>
        <button
            type="submit"
            onClick={() => navigate("/procurement")}
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Pocurement
          </button>
          </Grid>
          <Grid>
             <Link to="/inventory">
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Inventory
          </button>
          </Link>
          </Grid>
          </Grid>
        <u><h2 className="text-2xl font-bold mb-4 text-center font-['Roboto'] underline">INVENTORY MANAGEMENT FORM</h2></u>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 p-2"> 
          {/* Increased form padding + reduced row gap */}
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Select 
            label="Item Category" 
            name="category" 
            options={["Electrical", "Civil", "Mechanical", "Office Supply", "Safety"]}
          />

          <Select 
            label="Item Name" 
            name="itemName" 
            options={["Cement", "Sand", "Bricks", "Steel", "Cable", "Switch", "Pipe"]}
          />

          <Select 
            label="Specification" 
            name="specification" 
            options={["Small", "Medium", "Large", "High Quality", "Low Quality"]}
          />

          <Input label="Unit" name="unit" type="number" />
          <Input label="Opening Stock" name="openingStock" type="number" />
          <Input label="Quantity Received" name="qtyReceived" type="number" />

          <Input label="Quantity Issued" name="qtyIssued" type="number" />
          <Input label="Closing Stock" name="closingStock" type="number" />
          <Input label="Vendor/Supplier (Name/Company)" name="vendor" />

          <Input label="Invoice/Challan No." name="invoiceNo" type="text"/>
          <Input label="Location" name="location" type="text" />
          <Input label="Condition (New/Used/Damaged)" name="condition" type="text"/>

          <Input label="Remarks" name="remarks" type="text"/>
          <Input label="Signature" name="signature" type="text" />
          <divider/>

        </div>

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>

        </form>

      </div>
    </div>
  );
}
