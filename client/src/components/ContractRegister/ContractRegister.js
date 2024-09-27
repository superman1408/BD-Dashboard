import React from "react";
import { Container, Card, Grid, Divider } from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";

const ContractRegister = () => {
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
                    <Form.Label>Contactor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contactor Name"
                      name="contractorName"
                      // value={}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, date: e.target.value })
                      // }
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Person"
                      name="contactPerson"
                      // value={}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, date: e.target.value })
                      // }
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formDate">
                    <Form.Label>Contact Person Mob. No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Person No"
                      name="contactPersonMob.No"
                      // value={}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, date: e.target.value })
                      // }
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
                      name="contactPersonEmail"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formFemaleLabour">
                    <Form.Label>Contractor Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contractor Address"
                      name="contractorAddress"
                      // value={formData.femaleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     femaleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formFemaleLabour">
                    <Form.Label>Contractor Billing Address</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Contractor Billing Address"
                      name="femaleLabour"
                      // value={formData.femaleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     femaleLabour: e.target.value,
                      //   });
                      // }}
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
                      type="text"
                      placeholder="Enter GST"
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>PAN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter PAN No"
                      name="contactPersonEmail"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Incorporation Certificate</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Incorporation Certificate"
                      name="contactPersonEmail"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
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
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="contactPersonEmail"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank guarantee Submitted?</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Incorporation Certificate"
                      name="contactPersonEmail"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
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
                    <Form.Label>Bank Guarantee Start Date?</Form.Label>
                    <Form.Control
                      type="date"
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank Guarantee End Date?</Form.Label>
                    <Form.Control
                      type="date"
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Bank Guarantee</Form.Label>
                    <Form.Control
                      type="date"
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
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
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Contract currency</Form.Label>
                    <Form.Control
                      type="rupees"
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="formMaleLabour">
                    <Form.Label>Signed Contract Copy</Form.Label>
                    <Form.Control
                      type="document"
                      name="GST"
                      // value={formData.maleLabour}
                      // onChange={(e) => {
                      //   setFormData({
                      //     ...formData,
                      //     maleLabour: e.target.value,
                      //   });
                      // }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default ContractRegister;
