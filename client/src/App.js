/* eslint-disable jsx-a11y/no-distracting-elements */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container, Typography } from "@mui/material";
import Authentication from "./components/Authentication/Auth";
import PasswordResetForm from "./components/PasswordReset/PasswordResetForm";
import LOGO from "./assests/AshkamLogoTransparentbc copy.png";
import Dashboard from "./components/dashboard/Dashboard";
import Auth from "./components/Authentication/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

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
            padding: "10px 0px 0px 10px",
          }}
        >
          <img src={LOGO} alt="logo" style={{ width: "185px" }} />
        </div>
        {/* )} */}
      </header>
      {user ? (
        <>
          <Typography>Apple</Typography>
        </>
      ) : (
        <marquee
          style={{
            color: "#ffffff",
            fontFamily: "Roboto",
            fontWeight: "bold",
            backgroundColor: "#15345c",
            padding: "5px",

            // minWidth: "390px",
            maxWidth: "1380px",
            // "@media (max-width: 600px)": {
            //   maxWidth: "1380px",
            // },
            "@media (min-width: 600px)": {
              minWidth: "1380px",
            },
          }}
        >
          Please Login to your account
        </marquee>
      )}

      {/* <Typography color="#0B7882">Welcome to Ashkam 👋 </Typography> */}

      {/* <Navbar /> */}
      <div>
        <Routes>
          {/* <Route path="/" exact element={<Front />} /> */}
          <Route path="/" exact element={<Authentication />} />
          <Route path="/auth/reset" exact element={<PasswordResetForm />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
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
