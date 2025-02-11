// import React from 'react';

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const TrialScurve = ({ dateCommence, dateEnd }) => {
//   console.log(dateCommence);
//   console.log(dateEnd);
//   // ------------------Now to Calculate the cumulative Progress in S-Curve using Sigmoid Function------------------------
//   //progress = 1/(1 + (e^-k*(t-t0))

//   const projectStart = new Date(dateCommence);
//   const projectEnd = new Date(dateEnd);
//   const currentDate = new Date();
//   console.log(currentDate);
  
  
// // ------------------------Ideal Project Duration here-----------------------------------------------
//   const durationInMillSec = projectEnd - projectStart;

//   // console.log(durationInMillSec);

//   const durationInDays = Math.floor(durationInMillSec / (1000 * 3600 * 24));
//   // console.log(durationInDays);
//   const durationInMonth = Math.floor(durationInDays / 30);
//   // console.log(durationInMonth);

//   const durationInYears = Math.floor(durationInDays / 365);
//   // console.log(durationInYears);
  
//   // -----------Project current status---------------------------------
//   const durationCurrentDateInMilli = currentDate - projectStart;
//   // console.log(durationCurrentDateInMilli);
//   const durationCurrentDateInMonth = Math.floor(durationCurrentDateInMilli / (1000 * 3600 * 24 * 30)) + 1;
//   console.log(durationCurrentDateInMonth);

//   // ----------------------Project Future Scope and expectation-------------------------------------------------
  
  
    
    
    
//   return (
//     <ResponsiveContainer>
//       <div>
//         <h1>Date of Commencement : {dateCommence.toString()}</h1>
//         <h1>Date of Completion : {dateEnd.toString()}</h1>
//         <h1>Duration of Project : {durationInMonth.toString()} Months</h1>
//       </div>
//     </ResponsiveContainer>
//   );
// };




// export default TrialScurve;


// export default TrialScurve;
// import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";

// const TrialScurve = () => {
//   return (
//     <LineChart
//       xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//       series={[
//         {
//           data: [2, 5.5, 2, 8.5, 1.5, 5],
//         },
//       ]}
//       width={500}
//       height={300}
//     />
//   );
// }



import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrialScurve = ({ dateCommence, dateEnd }) => {
  // Convert string dates to Date objects
  const projectStart = new Date(dateCommence);
  const projectEnd = new Date(dateEnd);
  const currentDate = new Date();

  // Project duration calculations
  const durationInDays = useMemo(() => {
    const durationInMillSec = projectEnd - projectStart;
    return Math.floor(durationInMillSec / (1000 * 3600 * 24));
  }, [projectEnd, projectStart]);

  const durationInMonths = useMemo(
    () => Math.ceil(durationInDays / 30),
    [durationInDays]
  );

  const durationCurrentDateInMonths = useMemo(() => {
    const durationCurrentInMilli = currentDate - projectStart;
    return Math.ceil(durationCurrentInMilli / (1000 * 3600 * 24 * 30));
  }, [currentDate, projectStart]);

  // Generate progress data for S-Curve
  const progressData = useMemo(() => {
    const k = 0.1; // Sigmoid curve steepness constant
    const midpoint = durationInDays / 2; // Midpoint of the project
    const data = [];

    for (let day = 0; day <= durationInDays; day++) {
      const progress = 1 / (1 + Math.exp(-k * (day - midpoint))); // Sigmoid function
      data.push({ day, progress: Math.round(progress * 100) }); // Progress as percentage
    }
    return data;
  }, [durationInDays]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1>Date of Commencement: {projectStart.toDateString()}</h1>
        <h1>Date of Completion: {projectEnd.toDateString()}</h1>
        <h1>Duration of Project: {durationInMonths} Months</h1>
        <h1>Current Month in Project: {durationCurrentDateInMonths}</h1>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            label={{ value: "Days", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Progress (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrialScurve;

