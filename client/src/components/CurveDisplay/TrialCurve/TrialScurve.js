import React from 'react';

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

    const projectStart = new Date(dateCommence);
    const projectEnd = new Date(dateEnd);

    const durationInMillSec = projectEnd - projectStart;

    console.log(durationInMillSec);

    const durationInDays = Math.floor(durationInMillSec / (1000 * 3600 * 24))
    console.log(durationInDays);
    const durationInMonth = Math.floor(durationInDays / 30);
    console.log(durationInMonth);

    const durationInYears = Math.floor(durationInDays / 365);
    console.log(durationInYears);
    
    
    
  return (
    <ResponsiveContainer>
      <div>
        <h1>Date of Commencement : {dateCommence.toString()}</h1>
        <h1>Date of Completion : {dateEnd.toString()}</h1>
        <h1>Duration of Project : {durationInMonth.toString()} Months</h1>
      </div>
    </ResponsiveContainer>
  );
};




export default TrialScurve;


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
