import React from "react";
import { Container, Card, Grid } from "@mui/material";
import { Form } from "react-bootstrap";

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
            <Form></Form>
          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default ContractRegister;
