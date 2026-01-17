// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const LineGraph = ({
//   dateCommence,
//   dateEnd,
//   workCompleted,
//   currentTotalTask,
// }) => {
//   // ------------------- Date and Duration Calculations -------------------
//   const projectStart = new Date(dateCommence);
//   const projectEnd = new Date(dateEnd);
//   const currentDate = new Date();

//   console.log(currentTotalTask);
//   // const userInput = workCompleted;

//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const durationInMilliSec = projectEnd - projectStart;
//   const durationInDays = Math.floor(durationInMilliSec / (1000 * 3600 * 24));
//   const durationInMonth = Math.floor(durationInDays / 30);
//   const durationCurrentDateInMilli = currentDate - projectStart;
//   const durationCurrentDateInMonth = Math.floor(
//     durationCurrentDateInMilli / (1000 * 3600 * 24 * 30)
//   );

//   // ------------------- Calculate Steepness Factor (k) -------------------
//   const calculateSteepness = (
//     workCompleted,
//     currentMonthCount,
//     fullDuration
//   ) => {
//     const midPoint = fullDuration / 2; // Midpoint of the project (t0)
//     const numerator = -Math.log(1 / workCompleted - 1); // -ln(1/y - 1)
//     const denominator = currentMonthCount - midPoint || 0.0001; // Avoid division by zero
//     const k = numerator / denominator;
//     return k;
//   };

//   // ------------------- Generate Sigmoid Data -------------------
//   const generateSigmoidData = (k, t0, duration, startMonth = 0) => {
//     const data = [];
//     for (let t = startMonth; t <= duration; t++) {
//       const progress = 1 / (1 + Math.exp(-k * (t - t0))); // Sigmoid formula
//       data.push({ month: t, completion: (progress * 100).toFixed(2) }); // Convert to percentage
//     }
//     return data;
//   };

//   const userInput = Array.isArray(workCompleted) ? workCompleted : [];

//   // ------------------- Case Calculations -------------------
//   // Case 1: Full Project Progress
//   const case1_k = calculateSteepness(0.99, durationInMonth, durationInMonth);
//   const case1Data = generateSigmoidData(
//     case1_k,
//     durationInMonth / 2,
//     durationInMonth
//   );

//   // Case 2: User Input Progress
//   // const userInputProgress = userInput;
//   // const case2_k = calculateSteepness(
//   //   userInputProgress,
//   //   durationCurrentDateInMonth,
//   //   durationInMonth
//   // );
//   // const case2Data = generateSigmoidData(
//   //   case2_k,
//   //   durationInMonth / 2,
//   //   durationCurrentDateInMonth
//   // );

//   // CASE 2: User-defined monthly progress (no sigmoid)
//   const case2Data = userInput.map((item) => ({
//     month: item.month,
//     completion: item.value, // directly the percentage
//   }));

//   // Case 3: Future Projection (from current month onward but starts at Month 0)
//   const case3Data = generateSigmoidData(
//     case2Data,
//     durationInMonth / 2,
//     durationInMonth,
//     0
//   );

//   // ------------------- Merging Data -------------------

//   const mergedData = [...Array(durationInMonth + 1).keys()].map((i) => ({
//     month: i,
//     case1: case1Data.find((d) => d.month === i)?.completion
//       ? parseFloat(case1Data.find((d) => d.month === i).completion)
//       : 0,
//     // case2:
//     //   i <= durationCurrentDateInMonth
//     //     ? case2Data.find((d) => d.month === i)?.completion
//     //       ? parseFloat(case2Data.find((d) => d.month === i).completion)
//     //       : 0
//     //     : null, // Ensure Case 2 stops after current month

//     case2: case2Data.find((d) => d.month === i)?.completion ?? null,

//     case3: case3Data.find((d) => d.month === i)?.completion
//       ? parseFloat(case3Data.find((d) => d.month === i).completion)
//       : 0,
//   }));

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Adjust size based on screen width
//   const chartWidth = windowWidth < 768 ? 400 : 600; // mobile vs desktop
//   const chartHeight = windowWidth < 500 ? 300 : 400;

//   // ------------------- Render Graph -------------------
//   return (
//     <div>
//       <ResponsiveContainer width={chartWidth} height={chartHeight}>
//         <LineChart
//           data={mergedData} // Use merged data instead of separate datasets
//           margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="month"
//             label={{ value: "Months (Days)", position: "insideBottom", dy: 10 }}
//             tickFormatter={(value) => `${value}`}
//           />
//           <YAxis
//             tickFormatter={(value) => `${value}%`}
//             domain={[0, 100]}
//             label={{
//               value: "Completion (%)",
//               angle: -90,
//               position: "insideLeft",
//             }}
//           />
//           <Tooltip formatter={(value) => `${value}%`} />
//           {/* Using mergedData for all lines */}
//           <Line
//             type="monotone"
//             dataKey="case1"
//             stroke="#0D325C"
//             name="Full Progress (Case 1)"
//             strokeWidth={2}
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="case2"
//             stroke="#E46025"
//             name="User Input Progress (Case 2)"
//             strokeWidth={3}
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="case3"
//             stroke="#0B7882"
//             name="Future Projection (Case 3)"
//             strokeWidth={1}
//             strokeDasharray="3 3"
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//       <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//         <h3>Current Growth Rate (k): {case1_k.toFixed(4)}</h3>

//         {/* <h3>Required Growth Rate (k): {case2_k.toFixed(4)}</h3> */}
//       </div>
//     </div>
//   );
// };

// export default LineGraph;

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({
  dateCommence,
  dateEnd,
  workCompleted,
  currentTotalTask,
}) => {
  // ------------------- Date Calculations -------------------
  const projectStart = new Date(dateCommence);
  const projectEnd = new Date(dateEnd);
  const today = new Date();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const durationDays = Math.floor(
    (projectEnd - projectStart) / (1000 * 3600 * 24),
  );
  const durationMonths =
    (projectEnd.getFullYear() - projectStart.getFullYear()) * 12 +
    (projectEnd.getMonth() - projectStart.getMonth());

  const currentMonthIndex = Math.floor(
    (today - projectStart) / (1000 * 3600 * 24 * 30),
  );

  const userInput = Array.isArray(workCompleted) ? workCompleted : [];

  // ------------------- Generate Month Labels -------------------
  const monthLabels = [];
  for (let i = 0; i <= durationMonths; i++) {
    const d = new Date(projectStart);
    d.setMonth(projectStart.getMonth() + i);
    monthLabels.push(
      d.toLocaleString("default", { month: "short", year: "2-digit" }),
    );
  }

  // ------------------- Sigmoid Helper -------------------
  const calculateSteepness = (target, current, total) => {
    const mid = total / 2;
    const y = target <= 0 ? 0.01 : target >= 1 ? 0.99 : target;

    const numerator = -Math.log(1 / y - 1);
    const denominator = current - mid || 0.0001;

    return numerator / denominator;
  };

  const generateSigmoidData = (k, t0, duration) => {
    const arr = [];
    for (let t = 0; t <= duration; t++) {
      const y = 1 / (1 + Math.exp(-k * (t - t0)));
      arr.push({ month: t, completion: +(y * 100).toFixed(2) });
    }
    return arr;
  };

  // ------------------- Case 1: Full S-Curve -------------------
  const case1_k = calculateSteepness(0.99, durationMonths, durationMonths);
  const case1Data = generateSigmoidData(
    case1_k,
    durationMonths / 2,
    durationMonths,
  );

  // ------------------- Case 2: Actual Cumulative Progress -------------------

  // const monthIndexMap = {
  //   January: 0,
  //   February: 1,
  //   March: 2,
  //   April: 3,
  //   May: 4,
  //   June: 5,
  //   July: 6,
  //   August: 7,
  //   September: 8,
  //   October: 9,
  //   November: 10,
  //   December: 11,
  // };

  // const month = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const convertMonth = (name) => monthNames.indexOf(name);

  let cumulativeTask = 0;

  const case2Data = userInput.map((item, idx) => {
    // const monthIndex = convertMonth(item.month); // fix here
    cumulativeTask += item.value;

    const percent = (cumulativeTask / currentTotalTask) * 100;

    return {
      month: item.index,
      completion: percent > 100 ? 100 : +percent.toFixed(2),
    };
  });

  // // ------------------- Case 3: Future Projection -------------------
  // const lastKnownProgress =
  //   case2Data.length > 0 ? case2Data[case2Data.length - 1].completion / 100 : 0;

  // const case3_k = calculateSteepness(
  //   lastKnownProgress,
  //   currentMonthIndex,
  //   durationMonths
  // );

  // const case3Raw = generateSigmoidData(
  //   case3_k,
  //   durationMonths / 2,
  //   durationMonths
  // );

  // const case3Data = case3Raw.map((d) => ({
  //   month: d.month,
  //   completion: d.month < currentMonthIndex ? null : d.completion,
  // }));

  // ------------------- Merge All Cases -------------------
  const mergedData = [...Array(durationMonths + 1).keys()].map((i) => ({
    month: i,
    label: monthLabels[i],
    case1: case1Data[i]?.completion || 0,
    case2: case2Data.find((d) => d.month === i)?.completion ?? null,
    // case3: case3Data[i]?.completion || 0,
  }));

  // ------------------- Screen Resize -------------------
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = windowWidth < 768 ? 400 : 600;
  const chartHeight = windowWidth < 500 ? 300 : 400;

  // ------------------- Render Graph -------------------
  return (
    <div>
      <ResponsiveContainer width={chartWidth} height={chartHeight}>
        <LineChart
          data={mergedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            label={{ value: "Months", position: "insideBottom", dy: 40 }}
            interval={0}
            angle={-30}
            textAnchor="end"
          />

          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            label={{
              value: "Completion (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip formatter={(value) => `${value}%`} />

          <Line
            type="monotone"
            dataKey="case1"
            stroke="#0D325C"
            name="Ideal S-Curve (Case 1)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="case2"
            stroke="#E46025"
            name="Actual Cumulative (Case 2)"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="case3"
            stroke="#0B7882"
            name="Future Projection (Case 3)"
            strokeWidth={1}
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h3>Ideal Growth Rate (k): {case1_k.toFixed(4)}</h3>
        {/* <h3>Projected Growth Rate (k): {case3_k.toFixed(4)}</h3> */}
      </div>
    </div>
  );
};

export default LineGraph;
