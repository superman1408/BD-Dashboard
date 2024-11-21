import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Button } from "react-bootstrap";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Curve extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "S-Curve of Project Growth",
      },
      axisY: {
        title: "Growth Rate (%)",
        suffix: " %",
      },
      Tooltip: { shared: true },
      data: [
        {
          type: "splineArea", // S-curve style (smoothed line)
          xValueFormatString: "Month",
          yValueFormatString: "#,##0.## ",
          showInLegend: true,
          legendText: " Planned Growth Rate",
          name: "Planned",
          dataPoints: [
            { x: (2023, 1), y: 48.07 },
            { x: (2023, 2), y: 54.14 },
            { x: (2023, 3), y: 57.57 },
            { x: (2023, 4), y: 61.05 },
            { x: (2023, 5), y: 64.56 },
            { x: (2023, 6), y: 69.46 },
            { x: (2023, 7), y: 74.04 },
            { x: (2023, 8), y: 75.78 },
            { x: (2023, 9), y: 76.79 },
            { x: (2023, 10), y: 77.56 },
            { x: (2023, 11), y: 78.45 },
            { x: (2023, 12), y: 79.56 }, // This value represents the saturation or upper limit of the curve
          ],
        },
        {
          type: "splineArea", // S-curve style (smoothed line)
          xValueFormatString: "Month",
          yValueFormatString: "#,##0.## ",
          showInLegend: true,
          legendText: " Actual Growth Rate",
          name: "Actual",
          dataPoints: [
            { x: (2023, 1), y: 45.0 },
            { x: (2023, 2), y: 50.0 },
            { x: (2023, 3), y: 55.0 },
            { x: (2023, 4), y: 60.0 },
            { x: (2023, 5), y: 65.0 },
            { x: (2023, 6), y: 70.0 },
            { x: (2023, 7), y: 75.0 },
            { x: (2023, 8), y: 80.0 },
            { x: (2023, 9), y: 85.0 },
            { x: (2023, 10), y: 90.0 },
            { x: (2023, 11), y: 95.0 },
            { x: (2023, 12), y: 100.0 }, // This value represents the saturation or upper limit of the curve
          ],
        },
      ],
    };

    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "500px", height: "100px" }}>
          <CanvasJSChart
            style={{ width: "500px", height: "100px" }}
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <label>Enter Time : </label>
            <input type="text" placeholder="Enter Time" />
          </div>
          <div style={{ display: "flex" }}>
            <label>Enter Mid-Time : </label>
            <input type="text" placeholder="Enter Mid-Time" />
          </div>
          <div style={{ display: "flex" }}>
            <label>Enter Growth Rate : </label>
            <input type="text" placeholder="Enter Growth Rate" />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right", backgroundColor: "#1976d2" }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Curve;
