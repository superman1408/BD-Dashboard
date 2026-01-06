import React, { useState } from "react";
import "./inventory.css";

const InventoryManagement = () => {
  const [formData, setFormData] = useState({
    type: "",
    model: "",
    status: "",
    count: "",
  });

  // Local state to store added rows
  const [rows, setRows] = useState([]);

  // Update form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add row to table (NO BACKEND)
  const handleAddRow = () => {
    if (
      !formData.type ||
      !formData.model ||
      !formData.status ||
      !formData.count
    ) {
      alert("All fields are required!");
      return;
    }

    setRows([...rows, formData]); // push new row

    // Reset form
    setFormData({
      type: "",
      model: "",
      status: "",
      count: "",
    });
  };

  const handleDelete = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="inv-wrapper">
      {/* Top Bar */}
      <div className="inv-topbar">
        <h2>Inventory Dashboard Additions</h2>

        <div className="inv-top-right">
          <span className="version-text">Version: Latest</span>
          <button className="edit-btn">Edit</button>
        </div>
      </div>

      <div className="inv-main">
        {/* Left Sidebar */}
        <div className="inv-left">
          <button className="primary-btn">Load Dashboard</button>
          <button className="primary-btn">Adjust Current Orders</button>

          {/* Search Table */}
          <div className="box">
            <h3>Search Table</h3>

            <div className="field">
              <label>Type</label>
              <select>
                <option></option>
              </select>
            </div>

            <div className="field">
              <label>Model</label>
              <input type="text" placeholder="Search here..." />
            </div>

            <div className="field">
              <label>Status</label>
              <select>
                <option></option>
              </select>
            </div>
          </div>

          {/* Add Row */}
          <div className="box">
            <h3>Add Row</h3>

            <div className="field">
              <label>Type *</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Item Type..."
              />
            </div>

            <div className="field">
              <label>Model *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Item Model..."
              />
            </div>

            <div className="field">
              <label>Status *</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Item Status..."
              />
            </div>

            <div className="field">
              <label>Count *</label>
              <input
                type="number"
                name="count"
                value={formData.count}
                onChange={handleChange}
                placeholder="Item Count..."
              />
            </div>

            <button className="submit-btn" onClick={handleAddRow}>
              Submit
            </button>
          </div>
        </div>

        {/* Right Table Section */}
        <div className="inv-right box">
          <h3>Inventory Dashboard Additions</h3>

          <table className="inv-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Model</th>
                <th>Status</th>
                <th>Count</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {/* Static rows you already had */}

              {/* NEW rows added by user */}
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.type}</td>
                  <td>{row.model}</td>
                  <td>{row.status}</td>
                  <td>
                    <input type="number" value={row.count} readOnly />
                  </td>
                  <td>
                    <button
                      className="del-btn"
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <span>{rows.length + 12} results</span>
            <span>Page 1 of 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
