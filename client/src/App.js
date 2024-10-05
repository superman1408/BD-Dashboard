import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Authentication from "./components/Authentication/Auth";
import PasswordResetForm from "./components/PasswordReset/PasswordResetForm";
import LOGO from "./assests/AshkamLogoTransparentbc copy.png";
import Navbar from "./components/Navbar/Navbar";
import DataSheet from "./components/DataSheet/DataSheet";
import Dashboard from "./components/Dashboard/Dashboard";
import DetailedProgress from "./components/DetailedProgressSheet/DetailedProgress";
import EntryDetails from "./components/EntryDetails/EntryDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewDetails from "./components/ViewDetails/ViewDetails";
import DetailedProjectPage from "./components/DetailedProjectPage/DetailedProjectPage";
import ContractRegister from "./components/ContractRegister/ContractRegister";

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
          {/* <Route
            path="/"
            // element={!user ? <Authentication /> : <Dashboard />}
            component={() => <redirect to='/dashboard'/>}
          /> */}

          {/* Redirect to dashboard if user is logged in */}
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/auth" />}
          />
          {/* <Route path="/auth" exact element={!user && <Authentication />} /> */}
          <Route
            path="/auth"
            exact
            element={!user ? <Authentication /> : <Navigate to="/" />}
          />
          <Route path="/auth/reset" exact element={<PasswordResetForm />} />
          {/* <Route path="/dashboard" exact element={user && <Dashboard />} /> */}
          <Route path="/dashboard" exact element={<Dashboard />} />
          {/* <Route path="/maindashboard" exact element={<Maindashboard />} /> */}
          <Route path="/datasheet" exact element={<DataSheet />} />
          {/* <Route path="/:id/entrydetails" exact element={<EntryDetails />} /> */}
          <Route path="/:id/viewdetails" exact element={<ViewDetails />} />
          {/* <Route
            path="/:id/detailedprojectpage"
            exact
            element={<DetailedProjectPage />}
          /> */}

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
            path="/detailedprogress"
            exact
            element={<DetailedProgress />}
          />
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
