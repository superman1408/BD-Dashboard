// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const LineGraph = ({ dateCommence, dateEnd, workCompleted }) => {
//   const projectStart = new Date(dateCommence);
//   const projectEnd = new Date(dateEnd);

//   const durationInMillSec = projectEnd - projectStart;
//   const durationInDays = Math.floor(durationInMillSec / (1000 * 3600 * 24));
//   const durationInMonth = Math.ceil(durationInDays / 30);

//   const calculateSteepness = (
//     workCompleted,
//     currentMonthCount,
//     fullDuration
//   ) => {
//     const midPoint = fullDuration / 2;
//     if (workCompleted <= 0.01 || workCompleted >= 0.99) return null;

//     const numerator = -Math.log(1 / workCompleted - 1);
//     let denominator = currentMonthCount - midPoint;
//     if (denominator === 0) denominator = 0.0001;
//     return numerator / denominator;
//   };

//   const generateSigmoidData = (k, fullDuration, midpoint, label) => {
//     const data = [];
//     for (let t = 0; t <= fullDuration; t++) {
//       const progress = 1 / (1 + Math.exp(-k * (t - midpoint)));
//       data.push({ month: t, progress: progress * 100, label });
//     }
//     return data;
//   };

//   // Case 1: Full projection
//   const k1 = calculateSteepness(0.99, durationInMonth, durationInMonth);
//   const case1Data = generateSigmoidData(
//     k1,
//     durationInMonth,
//     durationInMonth / 2,
//     "Case 1"
//   );

//   // Case 2: Current projection based on user input
//   const currentMonthCount = Math.ceil(
//     (new Date() - projectStart) / (1000 * 3600 * 24 * 30)
//   );
//   const k2 = calculateSteepness(
//     workCompleted,
//     currentMonthCount,
//     durationInMonth
//   );
//   const case2Data = generateSigmoidData(
//     k2,
//     durationInMonth,
//     durationInMonth / 2,
//     "Case 2"
//   );

//   // Case 3: Future projection using Case 2's k
//   const case3Data = generateSigmoidData(
//     k2,
//     durationInMonth,
//     durationInMonth / 2,
//     "Case 3"
//   );

//   const combinedData = [...case1Data, ...case2Data, ...case3Data];

//   return (
//     <div>
//       <h1>Project S-Curve</h1>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={combinedData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="month"
//             label={{ value: "Months", position: "insideBottom", offset: -5 }}
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
//             data={case1Data}
//             name="Case 1"
//             stroke="#8884d8"
//           />
//           <Line
//             type="monotone"
//             dataKey="progress"
//             data={case2Data}
//             name="Case 2"
//             stroke="#82ca9d"
//           />
//           <Line
//             type="monotone"
//             dataKey="progress"
//             data={case3Data}
//             name="Case 3"
//             stroke="#ffc658"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineGraph;


import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ dateCommence, dateEnd, workCompleted }) => {
  // ------------------Now to Calculate the cumulative Progress in S-Curve using Sigmoid Function------------------------
  //progress = 1/(1 + (e^-k*(t-t0))

  const projectStart = new Date(dateCommence);
  const projectEnd = new Date(dateEnd);
  const durationInMillSec = projectEnd - projectStart;
  const durationInDays = Math.floor(durationInMillSec / (1000 * 3600 * 24));
  const durationInMonth = Math.floor(durationInDays / 30);
  const durationCurrentDateInMillSec = new Date() - projectStart;
  const durationCurrentDateInMonth =
    Math.floor(durationCurrentDateInMillSec / (1000 * 3600 * 24 * 30)) + 1;

  const calculateSteepness = (
    workCompleted,
    currentMonthCount,
    fullDuration
  ) => {
    const midPoint = fullDuration / 2; // Midpoint of the project (t0)

    // Ensure valid `workCompleted` input
    // if (workCompleted <= 0.01 || workCompleted >= 0.99) {
    //   console.error("workCompleted must be between 0.01 (1%) and 0.99 (99%).");
    //   return null;
    // }

    // Euler's number
    const e = Math.E;

    // Numerator: -ln(1/y - 1)
    const numerator = -Math.log(1 / workCompleted - 1);

    // Denominator: t - t0
    let denominator = currentMonthCount - midPoint;

    // Handle edge cases
    if (denominator === 0) {
      denominator = 0.0001; // Small adjustment to avoid division by zero
    }

    // Calculate k
    const k = numerator / denominator;

    console.log(`Work Completed: ${workCompleted * 100}%`);
    console.log(`Denominator (t - t0): ${denominator}`);
    console.log(`Steepness factor (k): ${k}`);

    return k; // Return k for further use
  };

  const generateSigmoidData = (k, t0, duration, label) => {
    const data = [];
    for (let t = 1; t <= duration; t++) {
      const progress = 1 / (1 + Math.exp(-k * (t - t0)));
      data.push({ month: t, progress: parseFloat(progress.toFixed(4)), label });
    }
    console.log(`Sigmoid Data for ${label}:`, data);
    return data;
  };

  // --------------------------- Case 1: Full Progression ----------------------------
  const k1 = calculateSteepness(0.99, durationInMonth, durationInMonth);
  const case1Data = k1
    ? generateSigmoidData(k1, durationInMonth / 2, durationInMonth, "Case 1")
    : [];

  // --------------------------- Case 2: User-defined Progress -----------------------
  const k2 = calculateSteepness(
    workCompleted,
    durationCurrentDateInMonth,
    durationInMonth
  );
  const case2Data = k2
    ? generateSigmoidData(
        k2,
        durationInMonth / 2,
        durationCurrentDateInMonth,
        "Case 2"
      )
    : [];

  // --------------------------- Case 3: Future Projection ---------------------------
  const case3Data = k2
    ? generateSigmoidData(k2, durationInMonth / 2, durationInMonth, "Case 3")
    : [];

  // Combine all data
  const combinedData = [...case1Data, ...case2Data, ...case3Data];

  return (
    <div>
      <h1>Date of Commencement: {dateCommence.toString()}</h1>
      <h1>Date of Completion: {dateEnd.toString()}</h1>
      <h1>Duration of Project (Months): {durationInMonth.toString()}</h1>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Month",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Progress", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="progress"
            data={case1Data}
            stroke="#8884d8"
            dot={false}
            name="Case 1: Full Progression"
          />
          <Line
            type="monotone"
            dataKey="progress"
            data={case2Data}
            stroke="#82ca9d"
            dot={false}
            name="Case 2: User-defined Progress"
          />
          <Line
            type="monotone"
            dataKey="progress"
            data={case3Data}
            stroke="#ffc658"
            dot={false}
            name="Case 3: Future Projection"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;

