import React from "react";
import { Grid } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export const create = () => {
  return (
    <div>
      <Grid sx={{ margin: "20px" }}>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          sx={{ mr: 1 }}
          //   onClick={openDialog}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create new user
        </Fab>
      </Grid>
    </div>
  );
};
