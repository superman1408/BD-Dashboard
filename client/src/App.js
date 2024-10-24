import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Authentication from "./components/Authentication/Auth";
import PasswordResetForm from "./components/PasswordReset/PasswordResetForm";
import LOGO from "./assests/AshkamLogoTransparentbc copy.png";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import EntryDetails from "./components/EntryDetails/EntryDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewDetails from "./components/ViewDetails/ViewDetails";
import DetailedProjectPage from "./components/DetailedProjectPage/DetailedProjectPage";
import ContractRegister from "./components/ContractRegister/ContractRegister";
import LetterTracker from "./components/LetterTracker/LetterTracker";
import ContractViewDetail from "./components/ContractRegister/ContractViewDetail";

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

      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            exact
            element={user ? <Dashboard /> : <Navigate to="/auth" />}
          />
          {/* <Route path="/auth" exact element={!user && <Authentication />} /> */}
          <Route
            path="/auth"
            exact
            element={ <Authentication /> }
          />
          <Route path="/auth/reset" exact element={<PasswordResetForm />} />

          <Route path="/dashboard" exact element={<Dashboard />} />

          <Route path="/:id/viewdetails" exact element={<ViewDetails />} />

          <Route
            path="/:date/detailedprojectpage"
            element={<DetailedProjectPage />}
          />
          <Route path="/entrydetails/:id" element={<EntryDetails />} />
          <Route
            path="/contractregister"
            exact
            element={<ContractRegister />}
          />
          <Route
            path="/contractviewdetails"
            exact
            element={<ContractViewDetail />}
          />
          {/* <Route
            path="/detailedprogress"
            exact
            // element={<DetailedProgress />}
          /> */}

          <Route path="lettertracker" exact element={<LetterTracker />} />
        </Routes>
      </div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: "#11224a",
            fontFamily: "Roboto",
            color: "white",
            width: "100%", // Ensures footer stretches across the entire width
            textAlign: "center",
            padding: "0", // Add some padding for better appearance
          }}
        >
          ©️ 2023 ASHKAM ENERGY PRIVATE LIMITED. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
