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

// S-Curve function: S(x) = 1 / (1 + exp(-k(x - midpoint)))^a
const calculateSCurve = (duration, midpoint, growthRate, exponent) => {
  const data = [];
  const k = growthRate; // Growth rate determines the steepness of the curve
  const a = exponent; // Exponent adjusts the sharpness of the curve

  for (let x = 0; x <= duration; x++) {
    const growth = (1 / Math.pow(1 + Math.exp(-k * (x - midpoint)), a)) ;
    data.push({ day: x, growth: growth });
  }
  return data;
};

const Curve = ({
  duration1 = 12,
  midpoint1 = 6,
  growthRate1 = 0.6,
  exponent1 = 1,

  duration2 = 12,
  midpoint2 = 6,
  growthRate2 = 1,
  exponent2 = 1,
  currentMonth = 7,
}) => {
  // const currentMonth = new Date().getMonth() + 1;
  // console.log(currentMonth);

  // Calculate data for the first chart
  const data1 = useMemo(
    () => calculateSCurve(duration1, midpoint1, growthRate1, exponent1),
    [duration1, midpoint1, growthRate1, exponent1]
  );

  // Calculate data for the second chart
  const data2 = useMemo(
    () => calculateSCurve(duration2, midpoint2, growthRate2, exponent2),
    [duration2, midpoint2, growthRate2, exponent2]
  );

  const combinedData = data1.map((entry, index) => ({
    day: entry.day,
    // growth1: entry.growth,
    growth1: entry.day <= currentMonth ? entry.growth : null,
    growth2: data2[index]?.growth || 0, // Use 0 if no matching day in data2
  }));

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart
        data={combinedData}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          label={{ value: "Days", position: "Center", offset: 0, margin: "2" }}
        />
        <YAxis
          label={{ value: "Growth", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        {/* First Line */}
        <Line
          type="monotone"
          dataKey="growth1"
          stroke="#e46025"
          strokeWidth={2}
          name="Actual"
        />
        {/* Second Line */}
        <Line
          type="monotone"
          dataKey="growth2"
          stroke="#0d325c"
          strokeWidth={2}
          name="Planned"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Curve;
// Render both the line charts on same canvas on one chart
// This graph is s-curve that shows only value till the month I want , like I have duration of 12 month , midpoint is 6 but my project running on 7th month so I want to display grapg till 7th month with the rate of 0.6
