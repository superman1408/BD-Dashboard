import React from "react";
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
  // ------------------- Date and Duration Calculations -------------------
  const projectStart = new Date(dateCommence);
  const projectEnd = new Date(dateEnd);
  const currentDate = new Date();
  const userInput = workCompleted;

  const durationInMilliSec = projectEnd - projectStart;
  const durationInDays = Math.floor(durationInMilliSec / (1000 * 3600 * 24));
  const durationInMonth = Math.floor(durationInDays / 30);
  const durationCurrentDateInMilli = currentDate - projectStart;
  const durationCurrentDateInMonth = Math.floor(
    durationCurrentDateInMilli / (1000 * 3600 * 24 * 30)
  );

  // ------------------- Calculate Steepness Factor (k) -------------------
  const calculateSteepness = (
    workCompleted,
    currentMonthCount,
    fullDuration
  ) => {
    const midPoint = fullDuration / 2; // Midpoint of the project (t0)
    const numerator = -Math.log(1 / workCompleted - 1); // -ln(1/y - 1)
    const denominator = currentMonthCount - midPoint || 0.0001; // Avoid division by zero
    const k = numerator / denominator;
    console.log(`k for workCompleted=${workCompleted}: ${k}`);
    return k;
  };

  // ------------------- Generate Sigmoid Data -------------------
  const generateSigmoidData = (k, t0, duration, startMonth = 0) => {
    const data = [];
    for (let t = startMonth; t <= duration; t++) {
      const progress = 1 / (1 + Math.exp(-k * (t - t0))); // Sigmoid formula
      data.push({ month: t, completion: (progress * 100).toFixed(2) }); // Convert to percentage
    }
    return data;
  };

  const generateSigmoidDataCase2 = (k, t0, duration, startMonth = 0) => {
    const data = [];
    for (let t = startMonth; t <= durationCurrentDateInMonth; t++) {
      const progress = 1 / (1 + Math.exp(-k * (t - t0))); // Sigmoid formula
      data.push({ month: t, completion: (progress * 100).toFixed(2) }); // Convert to percentage
    }
    return data;
  };

  const generateSigmoidDataCase3 = (k, t0, duration, startMonth = 0) => {
    const data = [];
    for (let t = durationCurrentDateInMonth; t <= duration; t++) {
      const progress = 1 / (1 + Math.exp(-k * (t - t0))); // Sigmoid formula
      data.push({ month: t, completion: (progress * 100).toFixed(2) }); // Convert to percentage
    }
    return data;
  };

  // ------------------- Case Calculations -------------------
  // Case 1: Full Project Progress
  const case1_k = calculateSteepness(0.99, durationInMonth, durationInMonth);
  const case1Data = generateSigmoidData(
    case1_k,
    durationInMonth / 2,
    durationInMonth
  );

  // Case 2: User Input Progress
  const userInputProgress = userInput; // Example user input for progress
  const case2_k = calculateSteepness(
    userInputProgress,
    durationCurrentDateInMonth,
    durationInMonth
  );
  const case2Data = generateSigmoidDataCase2(
    case2_k,
    durationInMonth / 2,
    durationInMonth
  );

  // Case 3: Future Projection (from current month onward but starts at Month 0)
  const case3Data = generateSigmoidData(
    case2_k,
    durationInMonth / 2,
    durationInMonth,
    0 // Start at Month 0
  );

  console.log(case1Data);
  console.log(case2Data);
  console.log(case3Data);
  console.log(userInput);
  

  // ------------------- Render Graph -------------------
  return (
    <div>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{ value: "Months", position: "insideBottom", dy: 10 }}
            tickFormatter={(value) => `${value}`}
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
            dataKey="completion"
            data={case1Data}
            stroke="blue"
            name="Full Progress (Case 1)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="completion"
            data={case2Data}
            stroke="red"
            name="User Input Progress (Case 2)"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="completion"
            data={case3Data}
            stroke="green"
            name="Future Projection (Case 3)"
            strokeWidth={1}
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <h3>Project Start Date: {projectStart.toDateString()}</h3>
        <h3>Project End Date: {projectEnd.toDateString()}</h3>
        <h3>Total Duration: {durationInMonth} months</h3>
        <h3>Current Month: {durationCurrentDateInMonth}</h3>
        <h3>k (Case 1): {case1_k}</h3>
        <h3>k (Case 2): {case2_k}</h3>
      </div>
    </div>
  );
};

export default LineGraph;
