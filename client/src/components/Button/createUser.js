import React, { useState } from "react";
import { Grid } from "@mui/material";

import AddUser from "../Dialog/AddUser";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <div>
      <Grid sx={{ margin: "20px" }}>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          sx={{ mr: 1 }}
          onClick={openDialog}
        >
          <AddUser
            open={open}
            setOpen={setOpen}
            userData={selected}
            key={new Date().getTime().toString()}
          />
          Create new user
        </Fab>
      </Grid>
    </div>
  );
};

export default Button;
