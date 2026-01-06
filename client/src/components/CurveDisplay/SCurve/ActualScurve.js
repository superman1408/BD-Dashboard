// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const ActualScurve = () => {
//   const [totalTasks, setTotalTasks] = useState(100);
//   const [monthly, setMonthly] = useState([5, 12, 20, 15, 10]);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ---------------------------
//   // FIXED: Missing Functions
//   // ---------------------------

//   const updateMonthValue = (index, value) => {
//     const updated = [...monthly];
//     updated[index] = Number(value) || 0;
//     setMonthly(updated);
//   };

//   const addMonth = () => {
//     setMonthly([...monthly, 0]);
//   };

//   const removeMonth = (index) => {
//     setMonthly(monthly.filter((_, i) => i !== index));
//   };

//   const submit = async () => {
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const resp = await fetch("http://localhost:4000/api/s-curve", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           totalTasks: Number(totalTasks),
//           monthlyCompleted: monthly,
//         }),
//       });

//       if (!resp.ok) throw new Error("Server Error");
//       const data = await resp.json();
//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------
//   // UI Rendering
//   // ---------------------------

//   return (
//     <>
//       <div style={{ maxWidth: 900 }}>
//         <label>Total Tasks: </label>
//         <input
//           type="number"
//           value={totalTasks}
//           onChange={(e) => setTotalTasks(e.target.value)}
//         />

//         <h3>Monthly Completed</h3>

//         {monthly.map((m, i) => (
//           <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
//             <div style={{ width: 60 }}>Month {i + 1}</div>

//             <input
//               type="number"
//               value={m}
//               onChange={(e) => updateMonthValue(i, e.target.value)}
//             />

//             <button onClick={() => removeMonth(i)}>Remove</button>
//           </div>
//         ))}

//         <div style={{ marginTop: 8 }}>
//           <button onClick={addMonth}>Add month</button>
//           <button onClick={submit} style={{ marginLeft: 8 }}>
//             {loading ? "Calculating..." : "Generate S-Curve"}
//           </button>
//         </div>

//         {error && <div style={{ color: "red" }}>{error}</div>}

//         {result && (
//           <div style={{ marginTop: 20 }}>
//             <h3>Result (Cumulative %)</h3>

//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={result.data.map((d) => ({
//                   name: `M${d.monthIndex}`,
//                   percent: d.cumulativePercent,
//                 }))}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis domain={[0, 100]} />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="percent"
//                   stroke="#8884d8"
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>

//             <table
//               style={{
//                 width: "100%",
//                 marginTop: 12,
//                 borderCollapse: "collapse",
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th>Month</th>
//                   <th>Completed</th>
//                   <th>Cumulative</th>
//                   <th>Cumulative %</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {result.data.map((d) => (
//                   <tr key={d.monthIndex}>
//                     <td>Month {d.monthIndex}</td>
//                     <td style={{ textAlign: "right" }}>
//                       {d.completedThisMonth}
//                     </td>
//                     <td style={{ textAlign: "right" }}>{d.cumulativeTasks}</td>
//                     <td style={{ textAlign: "right" }}>
//                       {d.cumulativePercent.toFixed(2)}%
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <footer style={{ marginTop: 30 }}>
//         <small>
//           Tip: run backend on port 4000 before generating the curve.
//         </small>
//       </footer>
//     </>
//   );
// };

// export default ActualScurve;

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ActualScurve = () => {
  const [totalTasks, setTotalTasks] = useState();
  const [monthly, setMonthly] = useState([]);
  const [result, setResult] = useState(null);

  const updateMonthValue = (index, value) => {
    const updated = [...monthly];
    updated[index] = Number(value) || 0;
    setMonthly(updated);
  };

  const addMonth = () => {
    setMonthly([...monthly, 0]);
  };

  const removeMonth = (index) => {
    setMonthly(monthly.filter((_, i) => i !== index));
  };

  // -----------------------------------------
  // PURE FRONTEND S-CURVE CALCULATION
  // -----------------------------------------
  const generateSCurve = () => {
    let cumulative = 0;

    const data = monthly.map((completed, idx) => {
      cumulative += completed;

      return {
        monthIndex: idx + 1,
        completedThisMonth: completed,
        cumulativeTasks: cumulative,
        cumulativePercent: (cumulative / totalTasks) * 100 || 0,
      };
    });

    setResult({ data });
  };

  return (
    <>
      <div style={{ maxWidth: 900 }}>
        <label>Total Tasks: </label>
        <input
          type="number"
          value={totalTasks}
          onChange={(e) => setTotalTasks(e.target.value)}
        />

        <h3>Monthly Completed</h3>

        {monthly.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 60 }}>Month {i + 1}</div>

            <input
              type="number"
              value={m}
              onChange={(e) => updateMonthValue(i, e.target.value)}
            />

            <button onClick={() => removeMonth(i)}>Remove</button>
          </div>
        ))}

        <div style={{ marginTop: 8 }}>
          <button onClick={addMonth}>Add month</button>
          <button onClick={generateSCurve} style={{ marginLeft: 8 }}>
            Generate S-Curve
          </button>
        </div>

        {result && (
          <div style={{ marginTop: 20 }}>
            <h3>Result (Cumulative %)</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={result.data.map((d) => ({
                  name: `M${d.monthIndex}`,
                  percent: d.cumulativePercent,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="percent"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <table
              style={{
                width: "100%",
                marginTop: 12,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Completed</th>
                  <th>Cumulative</th>
                  <th>Cumulative %</th>
                </tr>
              </thead>

              <tbody>
                {result.data.map((d) => (
                  <tr key={d.monthIndex}>
                    <td>Month {d.monthIndex}</td>
                    <td style={{ textAlign: "right" }}>
                      {d.completedThisMonth}
                    </td>
                    <td style={{ textAlign: "right" }}>{d.cumulativeTasks}</td>
                    <td style={{ textAlign: "right" }}>
                      {d.cumulativePercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ActualScurve;
