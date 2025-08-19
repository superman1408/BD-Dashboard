import React, { useState } from "react";
import { Form, Button, Table, Col, Row } from "react-bootstrap";
import { Divider } from "@mui/material";
import "./EntryDetails.css";

const EntryStep2 = ({ formData, setFormData }) => {
  const [plannedWorkRows, setPlannedWorkRows] = useState([
    // { serialNo: "", description: "", presentCompletion: "" },
    { description: "", presentCompletion: "" },
  ]);

  const [procurementRows, setProcurementRows] = useState([
    { description: "", vendor: "", status: "" },
  ]);

  // Generic Change Handler
  const handleRowChange = (type, index, field, value) => {
    let updatedRows;
    switch (type) {
      case "procurement":
        updatedRows = [...formData.procurementList];
        updatedRows[index][field] = value;
        setFormData({ ...formData, procurementList: updatedRows });
        break;

      case "plannedWork":
        updatedRows = [...formData.plannedWorkList];
        updatedRows[index][field] = value;
        setFormData({ ...formData, plannedWorkList: updatedRows });
        break;

      default:
        break;
    }
  };

  // Generic Add Handler
  const handleAddRow = (type) => {
    switch (type) {
      case "procurement": {
        const updatedRows = [
          ...(formData.procurementList || []),
          { description: "", vendor: "", status: "" },
        ];
        setFormData({
          ...formData,
          procurementList: updatedRows,
        });
        break;
      }

      case "plannedWork": {
        const updatedRows = [
          ...(formData.plannedWorkList || []),
          { description: "", presentCompletion: "" },
        ];
        setFormData({
          ...formData,
          plannedWorkList: updatedRows,
        });
        break;
      }

      default:
        break;
    }
  };

  // Generic Remove Handler
  const handleRemoveRow = (type, index) => {
    let updatedRows;
    switch (type) {
      case "procurement":
        updatedRows = procurementRows.filter((_, i) => i !== index);
        setPlannedWorkRows(updatedRows);
        setFormData({ ...formData, procurementList: updatedRows });
        break;

      case "plannedWork":
        updatedRows = plannedWorkRows.filter((_, i) => i !== index);
        setProcurementRows(updatedRows);
        setFormData({ ...formData, plannedWorkList: updatedRows });
        break;

      default:
        break;
    }
  };

  const isMobile = window.innerWidth <= 600;

  return (
    <>
      {/* Planned Work Table */}
      <div style={{ marginTop: "20px" }}>
        {/* Procurement Status Table */}

        <Form.Group controlId="formProcurementStatus" className="mb-3">
          <Form.Label>Procurement Status</Form.Label>
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>S.No</th>
                <th>Item Description</th>
                <th>Vendor / Petty Cash</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(formData.procurementList || []).map((row, index) => (
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
                          "procurement",
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
                      value={row.vendor}
                      onChange={(e) => {
                        handleRowChange(
                          "procurement",
                          index,
                          "vendor",
                          e.target.value
                        );
                        console.log(row.vendor);
                      }}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.status}
                      onChange={(e) =>
                        handleRowChange(
                          "procurement",
                          index,
                          "status",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveRow("procurement", index)}
                    >
                      ✖
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => handleAddRow("procurement")}>
            + Add Row
          </Button>
        </Form.Group>

        <Form.Group controlId="formPlannedWork" className="mb-3">
          <Form.Label>Planned Work For Tomorrow</Form.Label>
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>S.No</th>
                <th>Description Of Work</th>
                <th>Present Completion Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(formData.plannedWorkList || []).map((row, index) => (
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
                          "plannedWork",
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
                      value={row.presentCompletion}
                      onChange={(e) =>
                        handleRowChange(
                          "plannedWork",
                          index,
                          "presentCompletion",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveRow("plannedWork", index)}
                    >
                      ✖
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => handleAddRow("plannedWork")}>
            + Add Row
          </Button>
        </Form.Group>

        {/* Divider & Labour Inputs */}
        <Divider
          className="mt-3 mb-3"
          style={{ height: "2px", backgroundColor: "#000" }}
        />

        {/* Attendance */}
        {/* <Row>
        <Col md={6} className="mb-3">
          <Form.Group controlId="formMaleLabour">
            <Form.Label>Male Labour</Form.Label>
            <Form.Control
              type="number"
              value={formData.maleLabour}
              onChange={(e) =>
                setFormData({ ...formData, maleLabour: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group controlId="formFemaleLabour">
            <Form.Label>Female Labour</Form.Label>
            <Form.Control
              type="number"
              value={formData.femaleLabour}
              onChange={(e) =>
                setFormData({ ...formData, femaleLabour: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row> */}

        {/* after changing theffrontend my whole structire for backend has changed & not storing like this  I am providing you new code try to make it like the above & saving of sxat in he same format*/}

        <Form.Group controlId="formAttendance" className="mb-3">
          <Form.Label>Attendance</Form.Label>
          {/* <div className="table-responsive"> */}
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>S.No</th>
                <th style={{ width: isMobile ? 150 : 500 }}>Labour Type</th>
                <th>No. of People</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Male Labour",
                "Female Labour",
                "Mason",
                "HQ Staff",
                "Others",
              ].map((type, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      value={index + 1}
                      readOnly
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>
                    <Form.Control type="text" value={type} readOnly />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={formData.attendance?.[type] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendance: {
                            ...formData.attendance,
                            [type]: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* </div> */}
        </Form.Group>

        <Form.Group
          controlId="formSubmittedBy"
          className="mb-3 d-flex justify-content-between"
        >
          <div style={{ width: "48%" }}>
            <Form.Label>Prepared By</Form.Label>
            <Form.Control
              type="text"
              value={formData.preparedBy}
              onChange={(e) =>
                setFormData({ ...formData, preparedBy: e.target.value })
              }
            />
          </div>

          <div style={{ width: "48%" }}>
            <Form.Label>Reviewed By</Form.Label>
            <Form.Control
              type="text"
              value={formData.reviewedBy}
              onChange={(e) =>
                setFormData({ ...formData, reviewedBy: e.target.value })
              }
            />
          </div>
        </Form.Group>
      </div>
    </>
  );
};

export default EntryStep2;
