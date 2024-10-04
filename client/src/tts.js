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

const tts = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <header>
        <div className="d-flex justify-content-evenly p-2">
          <img src={LOGO} alt="logo" style={{ width: "185px" }} />
        </div>
      </header>

      <Navbar />
      <div>
        <Routes>
          {/* Redirect to dashboard if user is logged in */}
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Authentication />}
          />
          <Route path="/auth" exact element={!user ? <Authentication /> : <Navigate to="/dashboard" />} />
          <Route path="/auth/reset" exact element={<PasswordResetForm />} />
          <Route path="/dashboard" exact element={user ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/datasheet" exact element={<DataSheet />} />
          <Route path="/:id/viewdetails" exact element={<ViewDetails />} />
          <Route path="/:date/detailedprojectpage" element={<DetailedProjectPage />} />
          <Route path="/entrydetails/:id" element={<EntryDetails />} />
          <Route path="/contractregister" exact element={<ContractRegister />} />
          <Route path="/detailedprogress" exact element={<DetailedProgress />} />
        </Routes>
      </div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

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
    </BrowserRouter>
  );
};

export default tts;
