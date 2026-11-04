
import React, { useEffect, useState } from "react";
import {
    Form,
    Button,
    ListGroup,
    Modal,
    Row,
    Col,
    Table,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { Divider } from "@mui/material";
import "./EntryDetails.css";

// Reusable image preview component.
// Creates and cleans up object URLs safely.
const ActivityImage = ({ file, alt, style }) => {
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }

        // Existing image URL
        if (typeof file === "string") {
            setPreviewUrl(file);
            return;
        }

        // Uploaded File object
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    if (!previewUrl) return null;

    return (
        <img
            src={previewUrl}
            alt={alt}
            style={style}
        />
    );
};

const EntryStep1 = ({
    formData,
    setFormData,
    projectNumber,
}) => {
    const [show, setShow] = useState(false);

    // Activity form states
    const [inputValue, setInputValue] = useState("");
    const [inputQuantity, setInputQuantity] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [inputDescription, setInputDescription] = useState("");
    const [inputTargetDate, setInputTargetDate] = useState("");
    const [status, setStatus] = useState("");

    // Safe default arrays
    const activityList = formData.activityList || [];
    const materialInventoryList =
        formData.materialInventoryList || [];

    // ----------------------------------------
    // 1. ACTIVITY VALIDATION
    // ----------------------------------------

    const isActivityValid = () => {
        return (
            inputValue.trim() !== "" &&
            inputQuantity.trim() !== "" &&
            inputDescription.trim() !== "" &&
            inputTargetDate !== "" &&
            status !== ""
        );
    };

    // ----------------------------------------
    // 2. ADD ACTIVITY
    // ----------------------------------------

    const handleAddActivity = () => {
        if (!isActivityValid()) {
            return;
        }

        const newActivity = {
            text: inputValue.trim(),
            quantity: inputQuantity.trim(),
            image: imageFile,
            activityDescription: inputDescription.trim(),
            targetDate: inputTargetDate,
            status: status,
        };

        setFormData((prev) => ({
            ...prev,
            activityList: [
                ...(prev.activityList || []),
                newActivity,
            ],
        }));

        // Reset activity inputs
        setInputValue("");
        setInputQuantity("");
        setImageFile(null);
        setInputDescription("");
        setInputTargetDate("");
        setStatus("");

        setShow(false);
    };

    // ----------------------------------------
    // 3. REMOVE ACTIVITY
    // ----------------------------------------

    const handleRemoveActivity = (index) => {
        setFormData((prev) => ({
            ...prev,
            activityList: (prev.activityList || []).filter(
                (_, i) => i !== index
            ),
        }));
    };

    // ----------------------------------------
    // 4. UPDATE ACTIVITY FIELDS
    // ----------------------------------------

    const handleActivityChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedActivities = [
                ...(prev.activityList || []),
            ];

            updatedActivities[index] = {
                ...updatedActivities[index],
                [field]: value,
            };

            return {
                ...prev,
                activityList: updatedActivities,
            };
        });
    };

    // ----------------------------------------
    // 5. MATERIAL INVENTORY VALIDATION
    // ----------------------------------------

    const isNonNegativeNumber = (value) => {
        return (
            value !== "" &&
            value !== null &&
            value !== undefined &&
            Number.isFinite(Number(value)) &&
            Number(value) >= 0
        );
    };

    const isMaterialInventoryValid = () => {
        return materialInventoryList.every((row) => {
            const opening = row.openingStock;
            const issued = row.issued;

            // Both fields must contain valid values
            if (
                !isNonNegativeNumber(opening) ||
                !isNonNegativeNumber(issued)
            ) {
                return false;
            }

            // Issued quantity cannot exceed opening stock
            return Number(issued) <= Number(opening);
        });
    };

    // ----------------------------------------
    // 6. CHECK ISSUED STOCK
    // ----------------------------------------

    const isIssuedMoreThanOpening = (row) => {
        if (
            !isNonNegativeNumber(row.openingStock) ||
            !isNonNegativeNumber(row.issued)
        ) {
            return false;
        }

        return Number(row.issued) > Number(row.openingStock);
    };

    // ----------------------------------------
    // 7. UPDATE INVENTORY ROW
    // ----------------------------------------

    const handleRowChange = (
        type,
        index,
        field,
        value
    ) => {
        setFormData((prev) => {
            const updatedRows = [
                ...(prev.materialInventoryList || []),
            ];

            if (!updatedRows[index]) {
                return prev;
            }

            // Update only the selected row
            updatedRows[index] = {
                ...updatedRows[index],
                [field]: value,
            };

            const row = updatedRows[index];

            // Calculate closing stock
            const opening = Number(row.openingStock) || 0;
            const issued = Number(row.issued) || 0;
            const received = Number(row.received) || 0;

            row.closingStock = Math.max(
                opening - issued + received,
                0
            );

            return {
                ...prev,
                materialInventoryList: updatedRows,
            };
        });
    };

    // ----------------------------------------
    // 8. ADD INVENTORY ROW
    // ----------------------------------------

    const handleAddRow = () => {
        // Do not add another row if existing rows
        // contain invalid opening or issued quantities.
        if (!isMaterialInventoryValid()) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            materialInventoryList: [
                ...(prev.materialInventoryList || []),
                {
                    material: "",
                    unit: "",
                    openingStock: "",
                    issued: "",
                    received: "",
                    closingStock: 0,
                    requirement: "",
                },
            ],
        }));
    };

    // ----------------------------------------
    // 9. REMOVE INVENTORY ROW
    // ----------------------------------------

    const handleRemoveRow = (index) => {
        setFormData((prev) => ({
            ...prev,
            materialInventoryList: (
                prev.materialInventoryList || []
            ).filter((_, i) => i !== index),
        }));
    };

    // ----------------------------------------
    // 10. UNIT OPTIONS
    // ----------------------------------------

    const unitOptions = [
        "Bag",
        "CFT",
        "Ton",
        "Kg",
        "Nos.",
        "Bundle",
        "Packet",
        "sq.ft",
        "Others",
    ];

    // ----------------------------------------
    // 11. RENDER COMPONENT
    // ----------------------------------------

    return (
        <>
            <h1
                className="text-2xl font-bold text-center py-2 border-b-2 border-darkblue-500 mb-10"
                style={{
                    color: "#16355d",
                    fontWeight: 700,
                    fontSize: "22px",
                }}
            >
                Detail Input Form
            </h1>

            {/* PROJECT NUMBER */}

            <Form.Group controlId="formProjectName" className="mb-3">
                <Form.Label>
                    <strong>Project Number :</strong> {projectNumber}
                </Form.Label>
            </Form.Group>

            {/* DATE */}

            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>

                        <Form.Control
                            type="date"
                            value={formData.date || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    date: e.target.value,
                                }))
                            }
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Divider
                className="my-3"
                style={{
                    height: "2px",
                    backgroundColor: "#000",
                }}
            />

            {/* =====================================
          ACTIVITIES
      ===================================== */}

            <h4 className="fw-bold my-3" style={{ color: "#16355d" }}>
                Activities
            </h4>

            <Form.Group className="mb-3">
                <Form.Label>Civil & Structure (Max 5)</Form.Label>

                <Button
                    type="button"
                    onClick={() => setShow(true)}
                    disabled={activityList.length >= 5}
                    className="ms-2"
                    style={{ backgroundColor: "#16355d" }}
                >
                    + Add Activity
                </Button>

                {/* ACTIVITY LIST */}

                <ListGroup className="mt-2">
                    {activityList.map((item, index) => (
                        <ListGroup.Item
                            key={index}
                            className="d-flex align-items-center justify-content-between"
                        >
                            <div className="d-flex align-items-center gap-3 justify-content-evenly flex-wrap w-100">

                                <strong>{index + 1}.</strong>

                                {item.image && (
                                    <ActivityImage
                                        file={item.image}
                                        alt={`Uploaded ${index}`}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "4px",
                                        }}
                                    />
                                )}

                                <input
                                    type="text"
                                    value={item.text || ""}
                                    onChange={(e) =>
                                        handleActivityChange(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Activity"
                                    style={{
                                        width: "100%",
                                        maxWidth: "150px",
                                        padding: "2px 6px",
                                        fontSize: "0.85rem",
                                    }}
                                />

                                <input
                                    type="text"
                                    value={item.quantity || ""}
                                    onChange={(e) =>
                                        handleActivityChange(
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Quantity"
                                    style={{
                                        width: "100%",
                                        maxWidth: "100px",
                                        padding: "2px 6px",
                                        fontSize: "0.85rem",
                                    }}
                                />

                                <input
                                    type="text"
                                    value={item.activityDescription || ""}
                                    onChange={(e) =>
                                        handleActivityChange(
                                            index,
                                            "activityDescription",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Description"
                                    style={{
                                        width: "100%",
                                        maxWidth: "150px",
                                        padding: "2px 6px",
                                        fontSize: "0.85rem",
                                    }}
                                />

                                <input
                                    type="date"
                                    value={item.targetDate || ""}
                                    onChange={(e) =>
                                        handleActivityChange(
                                            index,
                                            "targetDate",
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        maxWidth: "150px",
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
                                type="button"
                                variant="danger"
                                onClick={() => handleRemoveActivity(index)}
                                size="sm"
                            >
                                ✖
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* ADD ACTIVITY MODAL */}

                <Modal
                    show={show}
                    style={{ marginTop: "30px" }}
                    onHide={() => setShow(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Activity</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Control
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter details"
                        />

                        <Form.Control
                            type="text"
                            value={inputQuantity}
                            onChange={(e) =>
                                setInputQuantity(e.target.value)
                            }
                            placeholder="Enter quantity"
                            style={{
                                backgroundColor: "#fff",
                                color: "#212529",
                            }}
                            className="mt-2"
                        />

                        {/* Image is optional */}

                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageFile(e.target.files?.[0] || null)
                            }
                            className="mt-2"
                        />

                        {imageFile && (
                            <ActivityImage
                                file={imageFile}
                                alt="Activity preview"
                                style={{
                                    width: "100px",
                                    marginTop: "10px",
                                }}
                            />
                        )}

                        <Form.Control
                            as="textarea"
                            value={inputDescription}
                            onChange={(e) =>
                                setInputDescription(e.target.value)
                            }
                            placeholder="Enter description"
                            className="mt-2"
                        />

                        <Form.Group controlId="formTargetDate" className="mt-2">
                            <Row className="align-items-center gx-1">
                                <Col xs="auto">
                                    <Form.Label className="target-date-label mb-0">
                                        Target Date
                                    </Form.Label>
                                </Col>

                                <Col>
                                    <Form.Control
                                        type="date"
                                        className="target-date-input"
                                        value={inputTargetDate}
                                        onChange={(e) =>
                                            setInputTargetDate(e.target.value)
                                        }
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-2"
                        >
                            <option value="">Select Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Control>
                    </Modal.Body>

                    <Modal.Footer className="w-100 d-flex justify-content-between">
                        <Button
                            type="button"
                            onClick={() => setShow(false)}
                            variant="secondary"
                        >
                            Close
                        </Button>

                        <Button
                            type="button"
                            onClick={handleAddActivity}
                            variant="primary"
                            disabled={!isActivityValid()}
                        >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form.Group>

            {/* =====================================
          MATERIAL INVENTORY
      ===================================== */}

            <Form.Group controlId="formMaterialInventory" className="mb-3">

                <Form.Label>Material Inventory</Form.Label>

                {/* DESKTOP VIEW */}

                <div className="d-none d-md-block">
                    <Table bordered hover className="align-middle">
                        <thead>
                            <tr>
                                <th>Material Description</th>
                                <th style={{ width: "120px" }}>Unit</th>
                                <th style={{ width: "120px" }}>Opening Stock</th>
                                <th style={{ width: "120px" }}>Issued</th>
                                <th style={{ width: "120px" }}>Received</th>
                                <th style={{ width: "120px" }}>Requirement</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {materialInventoryList.map((row, index) => (
                                <tr key={index}>
                                    {/* MATERIAL */}

                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={row.material ?? ""}
                                            onChange={(e) =>
                                                handleRowChange(
                                                    "materialInventory",
                                                    index,
                                                    "material",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>

                                    {/* UNIT */}

                                    <td>
                                        <Form.Select
                                            size="sm"
                                            value={row.unit ?? ""}
                                            onChange={(e) =>
                                                handleRowChange(
                                                    "materialInventory",
                                                    index,
                                                    "unit",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Select Unit</option>

                                            {unitOptions.map((unit, i) => (
                                                <option key={i} value={unit}>
                                                    {unit}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>

                                    {/* OPENING STOCK */}

                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={row.openingStock ?? ""}
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

                                    {/* ISSUED */}

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
                                                value={row.issued ?? ""}
                                                min="0"
                                                isInvalid={isIssuedMoreThanOpening(row)}
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

                                    {/* RECEIVED */}

                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={row.received ?? ""}
                                            min="0"
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

                                    {/* REQUIREMENT */}

                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={row.requirement ?? ""}
                                            min="0"
                                            onChange={(e) =>
                                                handleRowChange(
                                                    "materialInventory",
                                                    index,
                                                    "requirement",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>

                                    {/* REMOVE */}

                                    <td>
                                        <Button
                                            type="button"
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
                </div>

                {/* MOBILE VIEW */}

                <div className="d-block d-md-none">
                    {materialInventoryList.map((row, index) => (
                        <div
                            key={index}
                            className="mb-3 border rounded p-2"
                        >
                            <Table bordered size="sm" className="mb-2">
                                <tbody>

                                    {/* MATERIAL */}

                                    <tr>
                                        <th style={{ width: "40%" }}>Material</th>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={row.material ?? ""}
                                                onChange={(e) =>
                                                    handleRowChange(
                                                        "materialInventory",
                                                        index,
                                                        "material",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>

                                    {/* UNIT */}

                                    <tr>
                                        <th>Unit</th>
                                        <td>
                                            <Form.Select
                                                size="sm"
                                                value={row.unit ?? ""}
                                                onChange={(e) =>
                                                    handleRowChange(
                                                        "materialInventory",
                                                        index,
                                                        "unit",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">Select Unit</option>

                                                {unitOptions.map((unit, i) => (
                                                    <option key={i} value={unit}>
                                                        {unit}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </td>
                                    </tr>

                                    {/* OPENING STOCK */}

                                    <tr>
                                        <th>Opening Stock</th>
                                        <td>
                                            <Form.Control
                                                size="sm"
                                                type="number"
                                                min="0"
                                                value={row.openingStock ?? ""}
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
                                    </tr>

                                    {/* ISSUED */}

                                    <tr>
                                        <th>Issued</th>
                                        <td>
                                            <Form.Control
                                                size="sm"
                                                type="number"
                                                min="0"
                                                value={row.issued ?? ""}
                                                isInvalid={isIssuedMoreThanOpening(row)}
                                                onChange={(e) =>
                                                    handleRowChange(
                                                        "materialInventory",
                                                        index,
                                                        "issued",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            {isIssuedMoreThanOpening(row) && (
                                                <Form.Text className="text-danger">
                                                    Issued cannot exceed Opening Stock.
                                                </Form.Text>
                                            )}
                                        </td>
                                    </tr>

                                    {/* RECEIVED */}

                                    <tr>
                                        <th>Received</th>
                                        <td>
                                            <Form.Control
                                                size="sm"
                                                type="number"
                                                min="0"
                                                value={row.received ?? ""}
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
                                    </tr>

                                    {/* REQUIREMENT */}

                                    <tr>
                                        <th>Requirement</th>
                                        <td>
                                            <Form.Control
                                                size="sm"
                                                type="number"
                                                min="0"
                                                value={row.requirement ?? ""}
                                                onChange={(e) =>
                                                    handleRowChange(
                                                        "materialInventory",
                                                        index,
                                                        "requirement",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>

                                    {/* REMOVE */}

                                    <tr>
                                        <td colSpan={2} className="text-end">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleRemoveRow(index)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    ))}
                </div>

                {/* ADD INVENTORY ROW */}

                <Button
                    type="button"
                    variant="primary"
                    onClick={handleAddRow}
                    disabled={!isMaterialInventoryValid()}
                    style={{ backgroundColor: "#16355d" }}
                >
                    + Add Row
                </Button>

                {!isMaterialInventoryValid() &&
                    materialInventoryList.length > 0 && (
                        <div className="text-danger mt-2">
                            Please enter valid Opening Stock and Issued
                            quantities. Issued cannot exceed Opening Stock.
                        </div>
                    )}

            </Form.Group>
        </>
    );
};

export default EntryStep1;
