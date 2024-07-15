import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container, Typography } from "@mui/material";
import Authentication from "./components/Authentication/Auth";
import PasswordResetForm from "./components/PasswordReset/PasswordResetForm";
import LOGO from "./assests/AshkamLogoTransparentbc copy.png";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <div
          style={{
            display: {
              xs: "0",
              sm: "600",
            },
            justifyContent: "space-evenly",
            padding: "10px",
          }}
        >
          <img src={LOGO} alt="logo" style={{ width: "185px" }} />
        </div>
        {/* )} */}
      </header>

      <Typography color="#0B7882">Welcome to Ashkam 👋 </Typography>

      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" exact element={<Authentication />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div>
        <footer
          style={{
            backgroundColor: "#17325C",
            fontFamily: "Roboto",
            color: "white",
            width: "100%",
            marginTop: "5px",
            textAlign: "center",
          }}
        >
          ©️ 2023 ASHKAM ENERGY PRIVATE LIMITED. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
