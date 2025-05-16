import React from "react";

import { Form, Row, Col, Button, Table, Container } from "react-bootstrap";

import { Divider, Card } from "@mui/material";

const LetterTracker = () => {
  return (
    <div style={{ marginBottom: "50px" }}>
      <Container
        elevation={10}
        sx={{
          padding: "12px",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
          marginBottom: "50px",
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
          <h3>Letter Tracker Form</h3>
          <Form>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Project Reference</Form.Label>
                  <Form.Select
                    type="text"
                    required
                    placeholder="Enter Project Reference"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Letter No.</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="Enter Letter No."
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Letter Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    placeholder="Enter Letter Date"
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Letter Sent or Receieved</Form.Label>
                  <Form.Select
                    type="text"
                    required
                    placeholder="Enter Letter Sent or Receieved"
                  >
                    <option value="">Select an option</option>
                    <option value="sent">Sent</option>
                    <option value="recieved">Recieved</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Letter Reference</Form.Label>
                  <Form.Select
                    type="text"
                    required
                    placeholder="Enter Letter Reference"
                  >
                    <option value="">Select an option</option>
                    <option value="sent">Sent</option>
                    <option value="recieved">Recieved</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Sent by</Form.Label>
                  <Form.Select type="text" required placeholder="Sent By">
                    <option value="">Select an option</option>
                    <option value="sent">Sent</option>
                    <option value="recieved">Recieved</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Recieved from</Form.Label>
                  <Form.Select type="text" required placeholder="Recieved from">
                    <option value="">Select an option</option>
                    <option value="sent">Sent</option>
                    <option value="recieved">Recieved</option>
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
            <Button type="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default LetterTracker;
