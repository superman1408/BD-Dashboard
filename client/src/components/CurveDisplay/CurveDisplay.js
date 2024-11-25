import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Curve from "./Curve";

const CurveDisplay = () => {
  const [dialogOpen, setDialogOpen] = useState();
  const openCard = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center bg-gray-100 rounded">
          <h1 className="p-3 font-bold">Cummulative Progress</h1>
          <button onClick={openCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </button>
        </div>
        <Curve
          duration1={12}
          midpoint1={6}
          growthRate1={0.6}
          exponent1={1}
          duration2={12}
          midpoint2={6}
          growthRate2={1}
          exponent2={1}
        />
      </div>

      <Modal
        show={dialogOpen}
        onHide={() => setDialogOpen(false)}
        centered
        style={{ padding: "12px", marginTop: "10vh" }}
        // scrollable
      >
        <Modal.Header closeButton></Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body
            style={{ maxHeight: "300px", overflowY: "auto" }}
            scrollable
          >
            <div className="p-3 flex">
              <label>Growth Rate : </label>
              <input
                className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-3
                 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="growthRate"
                // value={formData.commencementDate}
                // onChange={handleFormChange}
                required
              />
            </div>
          </Modal.Body>

          <div className="bg-gray-100 px-2 py-2 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              type="submit"
              variant="primary"
              // onClick={handleAccept}
              style={{ display: "flex", float: "right", marginRight: "5px" }}
            >
              Proceed
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CurveDisplay;
