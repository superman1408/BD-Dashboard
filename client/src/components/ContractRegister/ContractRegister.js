import React, { useState } from "react";
import { Container, Card, Grid, Divider } from "@mui/material";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createContractPost } from "../../action/contract";

const ContractRegister = () => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const [visible, setVisible] = useState(false);

  const [GST, setGST] = useState(null);
  const [PAN, setPAN] = useState(null);
  const [incorporationCertificate, setincorporationCertificate] =
    useState(null);
  const [bankGurantee, setBankGurantee] = useState(null);
  const [signedContractCopy, setsignedContractCopy] = useState(null);

  const [contactEmail, setContactEmail] = useState();
  const [contractorName, setContractorName] = useState();
  const [contactPerson, setContactPerson] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [contractBillingAddress, setContractBillingAddress] = useState();

  const [contractStartDate, setContractStartDate] = useState();
  const [contractEndDate, setContractEndDate] = useState();
  const [bankGuranteeSubmitted, setBankGuranteeSubmitted] = useState();
  const [bankGuranteeStartDate, setBankGuranteeStartDate] = useState();
  const [bankGuranteeEndDate, setBankGuranteeEndDate] = useState();
  const [contractValue, setContractValue] = useState();
  const [contractCurrency, setContractCurrency] = useState();

  const [GSTNo, setGSTNo] = useState();
  const [PANNo, setPANNo] = useState();
  const [incorporationCertificateNo, setIncorporationCertificateNo] =
    useState();
  const [bankGuaranteeNo, setBankGuaranteeNo] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gstPdf", GST); // Renamed field for GST PDF
    formData.append("panPdf", PAN); // Renamed field for PAN PDF
    formData.append("incorporationPdf", incorporationCertificate); // Renamed field for incorporation certificate PDF
    formData.append("bankGuaranteePdf", bankGurantee); // Renamed field for bank guarantee PDF
    formData.append("signedContractPdf", signedContractCopy);
    // formData.append("string", formData);

    formData.append("contactEmail", contactEmail);
    formData.append("contractorName", contractorName);
    formData.append("contactNumber", contactNumber);
    formData.append("contactPerson", contactPerson);
    formData.append("contractAddress", contractAddress);
    formData.append("contractBillingAddress", contractBillingAddress);

    formData.append("contractStartDate", contractStartDate);
    formData.append("contractEndDate", contractEndDate);
    formData.append("bankGuranteeSubmitted", bankGuranteeSubmitted);
    formData.append("bankGuranteeStartDate", bankGuranteeStartDate);
    formData.append("bankGuranteeEndDate", bankGuranteeEndDate);
    formData.append("contractValue", contractValue);
    formData.append("contractCurrency", contractCurrency);

    formData.append("GSTNo", GSTNo);
    formData.append("PANNo", PANNo);
    formData.append("incorporationCertificateNo", incorporationCertificateNo);
    formData.append("bankGuaranteeNo", bankGuaranteeNo);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      try {
        await dispatch(
          createContractPost(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );

        // Refresh the page
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleBankSubmitted = (e) => {
    e.preventDefault();
    const data = e.target.value;

    if (data === "yes") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (
    <div>
      <Container
        elevation={10}
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
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Contract Detail Form
          </h3>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ color: "red" }}>{}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid input.
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contractor Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contactor Name"
                      name="contractorName"
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contact Person"
                      name="contactPerson"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contact Person Mob. No</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contact Person No"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contact Person E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contact Person E-mail"
                      name="contactEmail"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formFemaleLabour">
                    <Form.Label>Contractor Address</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contractor Address"
                      name="contractAddress"
                      value={contractAddress}
                      onChange={(e) => {
                        setContractAddress(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formFemaleLabour">
                    <Form.Label>Contractor Billing Address</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Contractor Billing Address"
                      name="contractBillingAddress"
                      value={contractBillingAddress}
                      onChange={(e) => {
                        setContractBillingAddress(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
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
                        // required
                        placeholder="Enter GST No."
                        name="GSTNo"
                        value={GSTNo}
                        onChange={(e) => {
                          // setGSTNo(e.target.value);
                          const value = e.target.value.toUpperCase(); // Convert to uppercase for standard GST format
                          const gstPattern =
                            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

                          if (gstPattern.test(value) || value === "") {
                            setGSTNo(value); // Only update the state if the GST No is valid or empty
                          } else {
                            alert(
                              "Invalid GST number. Please follow the correct format."
                            );
                          }
                        }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      // required
                      margintop="10px"
                      accept="application/pdf"
                      name="GST"
                      style={{}}
                      onChange={(e) => {
                        setGST(e.target.files[0]); // Set selected file directly
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>PAN</Form.Label>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Form.Control
                        type="text"
                        // required
                        placeholder="Enter PAN No."
                        name="PANNo"
                        value={PANNo}
                        onChange={(e) => {
                          // setPANNo(e.target.value);
                          const value = e.target.value.toUpperCase(); // Convert to uppercase for PAN format
                          const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

                          if (value === "" || panPattern.test(value)) {
                            // If the input is empty or matches the pattern, update the state
                            setPANNo(value);
                          } else {
                            console.log(
                              "Invalid PAN number. Please follow the correct format."
                            );
                          }
                        }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      required
                      accept="application/pdf"
                      name="PAN"
                      // value={formData.PAN}
                      onChange={(e) => {
                        setPAN(e.target.files[0]); // Set selected file directly
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Incorporation Certificate</Form.Label>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Certificate No."
                        name="incorporationCertificateNo"
                        value={incorporationCertificateNo}
                        onChange={(e) => {
                          setIncorporationCertificateNo(e.target.value);
                        }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      required
                      accept="application/pdf"
                      name="incorporationCertificate"
                      // value={formData.incorporationCertificate}
                      onChange={(e) => {
                        setincorporationCertificate(e.target.files[0]); // Set selected file directly
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
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
                      value={contractStartDate}
                      onChange={(e) => {
                        setContractStartDate(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="contactEndDate"
                      value={contractEndDate}
                      onChange={(e) => {
                        setContractEndDate(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank guarantee Submitted?</Form.Label>
                    <Form.Select
                      name="bankGuranteeSubmitted"
                      value={bankGuranteeSubmitted}
                      // onChange={(e) => {
                      //   setBankGuranteeSubmitted(e.target.value);
                      // }}

                      onChange={handleBankSubmitted}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
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

              {visible && (
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
                          value={bankGuaranteeNo}
                          onChange={(e) => {
                            setBankGuaranteeNo(e.target.value);
                          }}
                        />
                      </div>
                      <Form.Control
                        type="file"
                        accept="application/pdf"
                        name="bankGurantee"
                        // value={formData.bankGurantee}
                        onChange={(e) => {
                          setBankGurantee(e.target.files[0]); // Set selected file directly
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="formMaleLabour">
                      <Form.Label>Bank Guarantee Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="bankGuranteeStartDate"
                        value={bankGuranteeStartDate}
                        onChange={(e) => {
                          setBankGuranteeStartDate(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="formMaleLabour">
                      <Form.Label>Bank Guarantee End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="bankGuranteeEndDate"
                        value={bankGuranteeEndDate}
                        onChange={(e) => {
                          setBankGuranteeEndDate(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract Value</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount in ₹"
                      name="contractValue"
                      value={contractValue}
                      onChange={(e) => {
                        setContractValue(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract currency</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount in ₹"
                      name="contractCurrency"
                      value={contractCurrency}
                      onChange={(e) => {
                        setContractCurrency(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid input.
                    </Form.Control.Feedback>
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
              <Button type="submit" style={{ float: "right" }}>
                Submit
              </Button>
            </Form>
          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default ContractRegister;
