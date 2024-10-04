/* eslint-disable jsx-a11y/no-distracting-elements */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route
            path="/"
            element={!user ? <Authentication /> : <Dashboard />}
          />
          <Route path="/auth" exact element={!user && <Authentication />} />
          <Route path="/auth/reset" exact element={<PasswordResetForm />} />
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
