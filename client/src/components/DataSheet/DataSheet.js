import React from "react";
import { Grid } from "@mui/material";

const DataSheet = () => {
  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <div>
      <Grid
        sx={{
          width: "20%",
          padding: "15px",
          backgroundColor: "whitesmoke",
          margin: "0px 8px 8px 8px",
        }}
      >
        <form onSubmit={handleSubmit} className="time-sheet-form">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="date"
              >
                S.No.
              </label>
              <input
                type="date"
                id="date"
                //   defaultValue={date}
                //   // onChange={(e) => setDate(e.target.value)}
                //   onChange={handleCheck}
                required
              />
            </div>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="projectCode"
              >
                Bid No.
              </label>

              <input
                style={{
                  // width: "100%",
                  height: "30px",
                  padding: "8px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "#e55d17",
                }}
                type="text"
                id="projectCode"
                // value={projectCode}
                //   defaultValue={projectCode}
                //   onFocus={togglePopup1} // Using onFocus event to trigger the popup
                autoComplete="off"
              />
              {/* ______________________________________pop window contents_____________________________________________ */}

              {/* {projectopen && (
              <ProjectCodePopUp
                setProjectCode={setProjectCode}
                setProjectOpen={setProjectOpen}
              />
            )} */}
            </div>

            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="activityCode"
              >
                Client Name
              </label>
              <input
                style={{
                  // width: "100%",
                  height: "30px",
                  padding: "8px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "#e55d17",
                }}
                type="text"
                id="activityCode"
                // value={activityCode}
                //   defaultValue={activityCode}
                //   onFocus={togglePopup2}
                autoComplete="off"
              />
              {/* {activityopen && (
              <ActivityCodePopUp
                setActivityCode={setActivityCode}
                setActivityOpen={setActivityOpen}
              />
            )} */}
            </div>

            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="netTime"
              >
                Opportunity Detail
              </label>
              <input
                type="number"
                id="netTime"
                // value={netTime}
                //   defaultValue={netTime}
                //   onChange={(e) => setNetTime(e.target.value)}
                // max={8}
              />
            </div>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="overTime"
              >
                Probability
              </label>
              <input
                type="number"
                id="overTime"
                // value={overTime}
                //   defaultValue={overTime}
                //   onChange={(e) => setOverTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="overTime"
              >
                Amount
              </label>
              <input
                type="number"
                id="overTime"
                // value={overTime}
                //   defaultValue={overTime}
                //   onChange={(e) => setOverTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="overTime"
              >
                Weitage Amount
              </label>
              <input
                type="number"
                id="overTime"
                // value={overTime}
                //   defaultValue={overTime}
                //   onChange={(e) => setOverTime(e.target.value)}
              />
            </div>
            {/* </div> */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button style={{ fontFamily: "Roboto" }} type="submit">
                {" "}
                Submit
              </button>
              <button style={{ fontFamily: "Roboto" }} type="button">
                Clear
              </button>
            </div>
          </div>
        </form>
      </Grid>
    </div>
  );
};

export default DataSheet;
