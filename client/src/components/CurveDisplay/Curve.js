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

const calculateSCurve = (
  duration,
  midpoint,
  totalGrowth,
  totalMonths,
  requiredGrowthRate
) => {
  const data = [];

  for (let x = 0; x <= duration; x++) {
    const growth =
      (1 / (1 + Math.exp(-requiredGrowthRate * (x - midpoint)))) * 100; // Convert to percentage
    data.push({
      day: x,
      growth: growth > 100 ? 100 : growth, // Cap growth at 100%
    });
  }
  return data;
};

const Curve = ({ duration, midpoint, totalGrowth, dateCommence }) => {
  const calculateTotalMonths = (dateCommence) => {
    const currentDate = new Date(); // Current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

    const startYear = dateCommence.getFullYear();
    const startMonth = dateCommence.getMonth() + 1; // JavaScript months are 0-indexed

    // Calculate total months
    return (currentYear - startYear) * 12 + (currentMonth - startMonth);
  };

  const totalMonths = useMemo(
    () => calculateTotalMonths(dateCommence),
    [dateCommence]
  );

  const requiredGrowthRate1 = useMemo(() => {
    const numerator = Math.log(totalGrowth / (1 - totalGrowth));
    const denominator = totalMonths - midpoint;
    return numerator / denominator;
  }, [totalGrowth, totalMonths, midpoint]);

  const requiredGrowthRate2 = useMemo(() => {
    const numerator = Math.log(0.99 / (1 - 0.99));
    const denominator = duration - midpoint;
    return numerator / denominator;
  }, [duration, midpoint]);

  const data1 = useMemo(
    () =>
      calculateSCurve(
        duration,
        midpoint,
        totalGrowth,
        totalMonths,
        requiredGrowthRate1
      ),
    [duration, midpoint, totalGrowth, totalMonths, requiredGrowthRate1]
  );

  const data2 = useMemo(
    () =>
      calculateSCurve(
        duration,
        midpoint,
        totalGrowth,
        totalMonths,
        requiredGrowthRate2
      ),
    [duration, midpoint, totalGrowth, totalMonths, requiredGrowthRate2]
  );
  console.log(requiredGrowthRate2);

  const combinedData = data1.map((entry, index) => ({
    day: entry.day,
    growth1: entry.day <= totalMonths ? data1[index]?.growth : null,
    growth2: data2[index]?.growth || 0,
    // // growth1: entry.day <= totalMonths ? entry.growth : null,
    // growth2: data2[index]?.growth || 0, // Use 0 if no matching day in data2
    growth3: data1[index]?.growth || 0,
    // growth4: entry.day <= totalMonths ?data3[index]?.growth :null,growth5: data3[index]?.growth || 0,
  }));

  //  I have total groth percentage , Durantion & midpoint . Here I have to find Grpowth rate required for achieveing that above growth rate in given timw , then  have to show this on graog on excel how to do it do it in excel

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart
        data={combinedData}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          label={{ value: "Duration (Days)", position: "insideBottom", dy: 10 }}
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
        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
        <Line
          type="monotone"
          dataKey="growth1"
          stroke="red"
          strokeWidth={2}
          name="Current Growth"
        />

        <Line
          type="monotone"
          dataKey="growth2"
          stroke="blue"
          strokeWidth={2}
          name="Required Growth"
        />

        <Line
          type="monotone"
          dataKey="growth3"
          stroke="red"
          strokeDasharray="3 3"
          name="Projected Growth"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Curve;
