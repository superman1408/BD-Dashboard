import React, { useState } from "react";
import { Container, Card, Grid, Divider } from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createContractPost, createPDFfiles } from "../../action/contract";

const ContractRegister = () => {
  const dispatch = useDispatch();

  const [GST, setGST] = useState(null);
  const [PAN, setPAN] = useState(null);
  const [incorporationCertificate, setincorporationCertificate] =
    useState(null);
  const [bankGurantee, setbankGurantee] = useState(null);
  const [signedContractCopy, setsignedContractCopy] = useState(null);

  const [formData, setFormData] = useState({
    contractorName: "",
    contactperson: "",
    contactNumber: "",
    contactEmail: "",
    contractAddress: "",
    contractBillingAddress: "",

    contractStartDate: "",
    contactEndDate: "",
    bankGuranteeSubmitted: "",
    bankGuranteeStartDate: "",
    bankGuranteeEndDate: "",

    contractValue: "",
    contractCurrency: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createContractPost(formData));
      await handleUpload();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Conflict error:", error.response.data.message);
        alert("Conflict error: " + error.response.data.message);
      } else {
        console.error("Error:", error);
        alert("An error occurred: " + error.message);
      }
    }
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("pdf", GST);
    formData.append("pdf", PAN);
    formData.append("pdf", incorporationCertificate);
    formData.append("pdf", bankGurantee);
    formData.append("pdf", signedContractCopy);

    try {
      await dispatch(
        createPDFfiles(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );

      // Refresh the page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container
        elevation={10}
        // padding="10px"
        // container="true"
        // spacing={0}
        // direction="column"
        // alignitems="center"
        // justifycontent="center"
        // fluid="true"
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
        <Card
          elevation={2}
          sx={{
            padding: "20px",
            borderRadius: "5px",
            display: {
              xs: "0",
              sm: "600",
            },
            bgcolor: "background.Card",
            boxShadow: "5px",
            width: "auto",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontFamily: "Roboto ",
              color: "#0d325c",
            }}
          >
            Contract Detail Form
          </h3>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Form>
              <Form.Group>
                <Form.Label style={{ color: "red" }}>{}</Form.Label>
              </Form.Group>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contractor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contactor Name"
                      name="contractorName"
                      value={formData.contractorName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contractorName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Person"
                      name="contactperson"
                      value={formData.contactperson}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactperson: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contact Person Mob. No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Person No"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contact Person E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Person E-mail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contactEmail: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formFemaleLabour">
                    <Form.Label>Contractor Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contractor Address"
                      name="contractAddress"
                      value={formData.contractAddress}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contractAddress: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formFemaleLabour">
                    <Form.Label>Contractor Billing Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contractor Billing Address"
                      name="contractBillingAddress"
                      value={formData.contractBillingAddress}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contractBillingAddress: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Divider
                className="mt-3 mb-3"
                style={{
                  height: "2px",
                  backgroundColor: "#000",
                  fontWeight: "bold",
                }}
              />
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>GST</Form.Label>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      {/* <Form.Label>GST No.</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder="Enter GST No."
                        name="GSTNo"
                        value={formData.contractAddress}
                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     contractAddress: e.target.value,
                        //   });
                        // }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      marginTop="10px"
                      accept="application/pdf"
                      name="GST"
                      onChange={(e) => {
                        setGST(e.target.files[0]); // Set selected file directly
                      }}
                    />
                    {/* <button onClick={handleUpload}>upload</button> */}
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>PAN</Form.Label>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      {/* <Form.Label>GST No.</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder="Enter PAN No."
                        name="PANNo"
                        value={formData.contractAddress}
                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     contractAddress: e.target.value,
                        //   });
                        // }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="PAN"
                      // value={formData.PAN}
                      onChange={(e) => {
                        setPAN(e.target.files[0]); // Set selected file directly
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Incorporation Certificate</Form.Label>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      {/* <Form.Label>GST No.</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder="Enter Certificate No."
                        name="CertificateNo"
                        value={formData.contractAddress}
                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     contractAddress: e.target.value,
                        //   });
                        // }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="incorporationCertificate"
                      // value={formData.incorporationCertificate}
                      onChange={(e) => {
                        setincorporationCertificate(e.target.files[0]); // Set selected file directly
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="contractStartDate"
                      value={formData.contractStartDate}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contractStartDate: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="contactEndDate"
                      value={formData.contactEndDate}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contactEndDate: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank guarantee Submitted?</Form.Label>
                    <Form.Select
                      name="bankGuranteeSubmitted"
                      value={formData.bankGuranteeSubmitted}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bankGuranteeSubmitted: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Divider
                className="mt-3 mb-3"
                style={{
                  height: "2px",
                  backgroundColor: "#000",
                  fontWeight: "bold",
                }}
              />
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank Guarantee</Form.Label>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      {/* <Form.Label>GST No.</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder="Enter Bank Guarantee No."
                        name="BankGuaranteeNo"
                        value={formData.contractAddress}
                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     contractAddress: e.target.value,
                        //   });
                        // }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="bankGurantee"
                      // value={formData.bankGurantee}
                      onChange={(e) => {
                        setbankGurantee(e.target.files[0]); // Set selected file directly
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank Guarantee Start Date?</Form.Label>
                    <Form.Control
                      type="date"
                      name="bankGuranteeStartDate"
                      value={formData.bankGuranteeStartDate}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bankGuranteeStartDate: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank Guarantee End Date?</Form.Label>
                    <Form.Control
                      type="date"
                      name="bankGuranteeEndDate"
                      value={formData.bankGuranteeEndDate}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bankGuranteeEndDate: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract Value</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount in ₹"
                      name="contractValue"
                      value={formData.contractValue}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contractValue: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract currency</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount in ₹"
                      name="contractCurrency"
                      value={formData.contractCurrency}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contractCurrency: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Signed Contract Copy</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="signedContractCopy"
                      // value={formData.signedContractCopy}
                      onChange={(e) => {
                        setsignedContractCopy(e.target.files[0]); // Set selected file directly
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Grid>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />
          <button
            variant="primary"
            type="submit"
            className="float-end mt-3 mr-3 mb-3 ml-3 btn-custom"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Card>
      </Container>
    </div>
  );
};

export default ContractRegister;
