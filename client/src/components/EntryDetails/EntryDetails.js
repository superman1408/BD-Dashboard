import React from "react";
import { Button, Card, Container, Grid, Input, TextField } from "@mui/material";

const EntryDetails = () => {
  return (
    <Grid
      padding="10px"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        elevation={10}
        sx={{
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#f2f2f2",
          borderCollapse: "collapse",
          marginBottom: "130px",
          // border: "1px solid black",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontFamily: "Roboto ",
            color: "#0d325c",
          }}
        >
          Entry Detail Form
        </h3>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // marginTop: "10px",
              "@media (max-width: 600px)": {
                flexDirection: "column",
              },
            }}
          >
            <Grid>
              <TextField
                fullWidth
                type="date"
                // label="Date"
                variant="outlined"
                margin="dense"
                size="small"
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                type="month"
                // label="Month"
                variant="outlined"
                margin="dense"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid>
            <TextField
              label="Activities"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid>
            <TextField
              label="Civil & Sructure"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid>
            <TextField
              label="Planned Work For Tommorrow"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid>
            <TextField
              label="Material requirement"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid>
            <TextField
              label="Procurement status"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              <TextField
                label="Male labour"
                variant="outlined"
                fullWidth
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid>
              <TextField
                label="Female labour"
                variant="outlined"
                fullWidth
                size="small"
                margin="dense"
              />
            </Grid>
          </Grid>
        </Grid>
        <button style={{ float: "right" }}>Submit</button>
      </Card>
    </Grid>
  );
};

export default EntryDetails;
