import React, { useState } from "react";
import { Container, Card, Grid, Divider } from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createContractPost } from "../../action/posts";

const ContractRegister = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    contractorName: "",
    contactperson: "",
    contactNumber: "",
    contactEmail: "",
    contractAddress: "",
    contractBillingAddress: "",
    GST: null,
    PAN: null,
    incorporationCertificate: null,
    contractStartDate: "",
    contactEndDate: "",
    bankGuranteeSubmitted: "",
    bankGuranteeStartDate: "",
    bankGuranteeEndDate: "",
    bankGurantee: null,
    contractValue: "",
    contractCurrency: "",
    signedContractCopy: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormData({
    //   contractorName: "",
    //   contactperson: "",
    //   contactNumber: "",
    //   contactEmail: "",
    //   contractAddress: "",
    //   contractBillingAddress: "",
    //   GST: "",
    //   PAN: "",
    //   incorporationCertificate: "",
    //   contractStartDate: "",
    //   contactEndDate: "",
    //   bankGuranteeSubmitted: "",
    //   bankGuranteeStartDate: "",
    //   bankGuranteeEndDate: "",
    //   bankGurantee: "",
    //   contractValue: "",
    //   contractCurrency: "",
    //   signedContractCopy: null,
    // });
    // dispatch(createContractPost(formData));
    // console.log(formData);

    try {
      await dispatch(createContractPost(formData));
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
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="GST"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          GST: e.target.files[0], // Store the selected file in form data
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>PAN</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="PAN"
                      // value={formData.PAN}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          PAN: e.target.files[0], // Store the selected file in form data
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Incorporation Certificate</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="incorporationCertificate"
                      // value={formData.incorporationCertificate}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          incorporationCertificate: e.target.files[0], // Store the selected file in form data
                        });
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
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank Guarantee</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      name="bankGurantee"
                      // value={formData.bankGurantee}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bankGurantee: e.target.files[0], // Store the selected file in form data
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
                        setFormData({
                          ...formData,
                          signedContractCopy: e.target.files[0], // Store the selected file in form data
                        });
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
