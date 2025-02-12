// const calculateSteepness = () => {
//   const fullDuration = durationInMonth;
//   const midPoint = fullDuration / 2;
//   const currentMonthCount = durationCurrentDateInMonth;
//   const workCompleted = 0.1;
//   // console.log(typeof midPoint);
//   // console.log(typeof workCompleted);
//   // Sigmoid formula: y(t) = 1 / (1 + e^(-k * (t - t0)))
//   const e = Math.E; //Euler's number
//   console.log(e);
//   const numerator = -Math.log(1 / workCompleted - 1) / Math.log(e); // Natural log with base e
//   console.log(numerator);
//   const denominator = fullDuration - midPoint
//   console.log(denominator);
//   const k = numerator / denominator;
//   console.log(k);

// };
// const calculateSteepness = (workDone, cal) => {
//   const fullDuration = durationInMonth; // Total duration in months T
//   const midPoint = fullDuration / 2; // Midpoint of the project (t0)
//   const currentMonthCount = durationCurrentDateInMonth; // Current time (t)
//   const workCompleted = 0.1; // Completion percentage (as a decimal, e.g., 0.1 for 10%) y(t)
//   // Sigmoid formula: y(t) = 1 / (1 + e^(-k(t - t0)

//   // Ensure input is valid
//   // if (workCompleted <= 0 || workCompleted >= 1) {
//   //   console.error("workCompleted must be between 0 and 1 (exclusive).");
//   //   return;
//   // }
//   // if (currentMonthCount <= midPoint) {
//   //   console.error(
//   //     "currentMonthCount must be greater than the midpoint for valid k."
//   //   );
//   //   return;
//   // }

//   // Euler's number (optional, for clarity; Math.E is always available)
//   const e = Math.E;

//   // Numerator: -ln(1/y - 1)
//   const numerator = -Math.log(1 / workCompleted - 1);

//   // Denominator: t - t0
//   const denominator = currentMonthCount - midPoint;

//   // Calculate k
//   const k = numerator / denominator;

//   console.log(`Euler's number (e): ${e}`);
//   console.log(`Numerator: ${numerator}`);
//   console.log(`Denominator: ${denominator}`);
//   console.log(`Steepness factor (k): ${k}`);
//   return k; // Return k for further use
// };

// const steepnessFactor = calculateSteepness();
// console.log(steepnessFactor);


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



// import React, { useMemo } from "react";
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
//   // Convert string dates to Date objects
//   const projectStart = new Date(dateCommence);
//   const projectEnd = new Date(dateEnd);
//   const currentDate = new Date();

//   // Project duration calculations
//   const durationInDays = useMemo(() => {
//     const durationInMillSec = projectEnd - projectStart;
//     return Math.floor(durationInMillSec / (1000 * 3600 * 24));
//   }, [projectEnd, projectStart]);

//   const durationInMonths = useMemo(
//     () => Math.ceil(durationInDays / 30),
//     [durationInDays]
//   );

//   const durationCurrentDateInMonths = useMemo(() => {
//     const durationCurrentInMilli = currentDate - projectStart;
//     return Math.ceil(durationCurrentInMilli / (1000 * 3600 * 24 * 30));
//   }, [currentDate, projectStart]);

//   // Generate progress data for S-Curve
//   const progressData = useMemo(() => {
//     const k = 0.1; // Sigmoid curve steepness constant
//     const midpoint = durationInDays / 2; // Midpoint of the project
//     const data = [];

//     for (let day = 0; day <= durationInDays; day++) {
//       const progress = 1 / (1 + Math.exp(-k * (day - midpoint))); // Sigmoid function
//       data.push({ day, progress: Math.round(progress * 100) }); // Progress as percentage
//     }
//     return data;
//   }, [durationInDays]);

//   return (
//     <div>
//       <div style={{ marginBottom: "20px" }}>
//         <h1>Date of Commencement: {projectStart.toDateString()}</h1>
//         <h1>Date of Completion: {projectEnd.toDateString()}</h1>
//         <h1>Duration of Project: {durationInMonths} Months</h1>
//         <h1>Current Month in Project: {durationCurrentDateInMonths}</h1>
//       </div>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={progressData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="day"
//             label={{ value: "Days", position: "insideBottom", offset: -5 }}
//           />
//           <YAxis
//             label={{
//               value: "Progress (%)",
//               angle: -90,
//               position: "insideLeft",
//             }}
//           />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="progress"
//             stroke="#8884d8"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TrialScurve;