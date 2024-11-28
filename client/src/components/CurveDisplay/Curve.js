import { duration } from "@mui/material";
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
const calculateSCurve = (duration, midpoint, growthRate, exponent, da) => {
  const data = [];
  const k = growthRate; // Growth rate determines the steepness of the curve
  const a = exponent; // Exponent adjusts the sharpness of the curve

  for (let x = 0; x <= duration; x++) {
    // const growth = (1 / Math.pow(1 + Math.exp(-k * (x - midpoint)), a)) ;
    const growth = 1 / (1 + Math.exp(-k * (x - midpoint)));
    // data.push({ day: x, growth: growth });

    if (growth <= 0 || growth >= 1) {
      console.warn(`Growth out of bounds at day ${x}:`, growth);
      continue; // Skip invalid growth values
    }

    const numerator = Math.log((1 - 0.99) / 0.99);
    const denominator = x - midpoint;

    const requiredGrowthRate = -numerator / denominator;
    // const requiredGrowthRate = (x - midpoint) / Math.log((1 - 0.99) / 0.99);
    console.log("requiredGrowthRate", requiredGrowthRate);

    // Push results to the data array
    data.push({
      day: x,
      growth: growth,
      requiredGrowthRate: requiredGrowthRate,
    });
  }

  return data;
};

const Curve = ({
  duration1 = duration,
  midpoint1,
  growthRate1,
  exponent1 = 1,

  duration2 = duration,
  midpoint2,
  // growthRate2 = requiredGrowthRate,
  exponent2 = 1,
  dateCommence,
  // currentMonth = 7,
}) => {
  const currentMonth = new Date().getMonth() + 1;
  console.log(currentMonth);

  const targetDate = dateCommence;
  const targetMonth = targetDate.getMonth() + 1; // Get the target month (1-based index)
  const requiredMonth = currentMonth - targetMonth;
  console.log(Math.round(duration1));
  console.log(duration2);
  // Calculate data for the first chart
  const data1 = useMemo(
    () => calculateSCurve(duration1, midpoint1, growthRate1, exponent1),
    [duration1, midpoint1, growthRate1, exponent1]
  );
  const growthRate2 = data1[Math.round(duration1)]?.requiredGrowthRate;
  console.log("growthRate2", growthRate2);
  // Calculate data for the second chart
  const data2 = useMemo(
    () => calculateSCurve(duration2, midpoint2, growthRate2, exponent2),
    [duration2, midpoint2, growthRate2, exponent2]
  );

  const combinedData = data1.map((entry, index) => ({
    day: entry.day,
    // growth1: entry.growth,
    growth1: entry.day <= requiredMonth ? entry.growth : null,
    growth2: data2[index]?.growth || 0, // Use 0 if no matching day in data2
    growth3: data1[index]?.growth || 0,
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
          label={{
            value: "Months",
            position: "Center",
            offset: 0,
            margin: "2",
            dy: 12,
          }}
        />
        <YAxis
          tickFormatter={(value) => `${value * 100}%`}
          label={{ value: "Growth", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        {/* First Line */}
        <Line
          type="monotone"
          dataKey="growth3"
          stroke="black"
          strokeDasharray="3 3"
          name="Projected"
        />
        <Line
          type="monotone"
          dataKey="growth1"
          stroke="#e46025"
          strokeWidth={2}
          name="Actual Growth"
        />
        {/* Second Line */}
        <Line
          type="monotone"
          dataKey="growth2"
          stroke="#0d325c"
          strokeWidth={2}
          name="Planned Growth"
        />
      </LineChart>
      <div className="flex justify-center ">
        <div className="p-2 ">
          {growthRate1 ? (
            <h2 className="text-sm " style={{ color: "#e46025" }}>
              Current Growth Rate : {growthRate1}
            </h2>
          ) : (
            <h2 className="text-sm " style={{ color: "#e46025" }}>
              To view graph, add growth rate
            </h2>
          )}
        </div>
        <div className="p-2">
          {growthRate2 && (
            <h2 className="text-sm " style={{ color: "#0d325c" }}>
              Required Growth Rate : {growthRate2.toFixed(2)}
            </h2>
          )}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default Curve;
