import React, { useState } from 'react';

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
  console.log(dateCommence);
  console.log(dateEnd);
  // ------------------Now to Calculate the cumulative Progress in S-Curve using Sigmoid Function------------------------
  //progress = 1/(1 + (e^-k*(t-t0))

  const projectStart = new Date(dateCommence);
  const projectEnd = new Date(dateEnd);
  const currentDate = new Date();
  console.log(currentDate);
  
  
// ------------------------Ideal Project Duration here-----------------------------------------------
  const durationInMillSec = projectEnd - projectStart;

  // console.log(durationInMillSec);

  const durationInDays = Math.floor(durationInMillSec / (1000 * 3600 * 24));
  // console.log(durationInDays);
  const durationInMonth = Math.floor(durationInDays / 30);
  // console.log(durationInMonth);

  const durationInYears = Math.floor(durationInDays / 365);
  // console.log(durationInYears);
  
  // -----------Project current status---------------------------------
  const durationCurrentDateInMilli = currentDate - projectStart;
  // console.log(durationCurrentDateInMilli);
  const durationCurrentDateInMonth = Math.floor(durationCurrentDateInMilli / (1000 * 3600 * 24 * 30)) + 1;
  console.log(durationCurrentDateInMonth);

  // ----------------------Project Future Scope and expectation-------------------------------------------------
  
  const calculateSteepness = (
    workCompleted,
    currentMonthCount,
    fullDuration
  ) => {
    const midPoint = fullDuration / 2; // Midpoint of the project (t0)

    // Ensure valid `workCompleted` input
    if (workCompleted <= 0.01 || workCompleted >= 0.99) {
      console.error("workCompleted must be between 0.01 (1%) and 0.99 (99%).");
      return;
    }

    // Euler's number
    const e = Math.E;

    // Numerator: -ln(1/y - 1)
    const numerator = -Math.log(1 / workCompleted - 1);

    // Denominator: t - t0
    let denominator = currentMonthCount - midPoint;

    // Handle edge cases
    if (denominator === 0) {
      return (
        denominator = 0.0001 // Small adjustment to avoid division by zero
      )
    }

    console.log(denominator);
    

    // Calculate k
    const k = numerator / denominator;

    console.log(`Work Completed: ${workCompleted * 100}%`);
    console.log(`Euler's number (e): ${e}`);
    console.log(`Numerator: ${numerator}`);
    console.log(`Denominator (t - t0): ${denominator}`);
    console.log(`Steepness factor (k): ${k}`);

    return k; // Return k for further use
  };


  // --------------------------------checking the function---------------------------
  // const durationInMonth = 12; // Full duration in months

  // Case 1: 10% work completed (before the midpoint)
  calculateSteepness(0.1, 4, durationInMonth);

  // Case 2: 50% work completed (at the midpoint)
  calculateSteepness(0.5, 6, durationInMonth);

  // Case 3: 90% work completed (after the midpoint)
  calculateSteepness(0.9, 9, durationInMonth);

  // Case 4: Edge case (workCompleted near lower limit, 1%)
  calculateSteepness(0.02, 2, durationInMonth);

  // Case 5: Edge case (workCompleted near upper limit, 99%)
  calculateSteepness(0.98, 11, durationInMonth);

  calculateSteepness(0.45, 8.8, durationInMonth);


  
  
  
    
    
    
  return (
    <ResponsiveContainer>
      <div>
        <h1>Date of Commencement : {dateCommence.toString()}</h1>
        <h1>Date of Completion : {dateEnd.toString()}</h1>
        <h1>Duration of Project : { durationInMonth.toString()}</h1>
        {/* <h1>Euler's number (e) : {Math.E.toString()}</h1> */}
        {/* <h1>Steepness Factor : {k.toString()}</h1> */}
      </div>
    </ResponsiveContainer>
  );
};


export default TrialScurve;

