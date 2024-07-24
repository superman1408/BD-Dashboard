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
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid sx={{ display: "flex", flexdirection: "column" }}>
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="date"
                >
                  S.No.
                </label>
              </Grid>
              <Grid>
                <input type="date" id="date" required />
              </Grid>
            </Grid>

            <Grid
              className="form-group"
              sx={{ display: "flex", flexdirection: "column" }}
            >
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="projectCode"
                >
                  Bid No.
                </label>
              </Grid>
              <Grid>
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
                  autoComplete="off"
                />
              </Grid>
              {/* ______________________________________pop window contents_____________________________________________ */}

              {/* {projectopen && (
              <ProjectCodePopUp
                setProjectCode={setProjectCode}
                setProjectOpen={setProjectOpen}
              />
            )} */}
            </Grid>

            <Grid
              className="form-group"
              sx={{ display: "flex", flexdirection: "column" }}
            >
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="activityCode"
                >
                  Client Name
                </label>
              </Grid>
              <Grid>
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
                  autoComplete="off"
                />
              </Grid>
              {/* {activityopen && (
              <ActivityCodePopUp
                setActivityCode={setActivityCode}
                setActivityOpen={setActivityOpen}
              />
            )} */}
            </Grid>

            <Grid
              className="form-group"
              sx={{ display: "flex", flexdirection: "column" }}
            >
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="netTime"
                >
                  Opportunity Detail
                </label>
              </Grid>
              <Grid>
                <input type="number" id="netTime" />
              </Grid>
            </Grid>
            <Grid
              className="form-group"
              sx={{ display: "flex", flexdirection: "column" }}
            >
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="overTime"
                >
                  Probability
                </label>
              </Grid>
              <Grid>
                <input type="number" />
              </Grid>
            </Grid>
            <Grid
              className="form-group"
              sx={{ display: "flex", flexdirection: "column" }}
            >
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="overTime"
                >
                  Amount
                </label>
              </Grid>
              <Grid>
                <input type="number" />
              </Grid>
            </Grid>
            <Grid
              className="form-group"
              sx={{ display: "flex", flexdirection: "column" }}
            >
              <Grid>
                <label
                  style={{ color: "#16355d", fontFamily: "Roboto" }}
                  htmlFor="overTime"
                >
                  Weitage Amount
                </label>
              </Grid>
              <Grid>
                <input type="number" id="overTime" />
              </Grid>
            </Grid>
            {/* </div> */}
            <Grid style={{ display: "flex", justifyContent: "space-around" }}>
              <button style={{ fontFamily: "Roboto" }} type="submit">
                {" "}
                Submit
              </button>
              <button style={{ fontFamily: "Roboto" }} type="button">
                Clear
              </button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default DataSheet;
