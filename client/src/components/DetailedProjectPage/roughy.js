import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntryDetails } from "../redux/actions/entryActions"; // Adjust path

const AttendanceTable = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const { entry, loading } = useSelector((state) => state.entryDetails);

  const [filteredData, setFilteredData] = useState([]);

  // Fetch entry data on mount
  useEffect(() => {
    dispatch(getEntryDetails());
  }, [dispatch]);

  // Filter data AFTER loading finishes
  useEffect(() => {
    if (!loading && Array.isArray(entry) && entry.length > 0 && selectedDate) {
      const newFiltered = entry.filter((e) => e.date === selectedDate);
      console.log("Filtered data for date:", selectedDate, newFiltered);
      setFilteredData(newFiltered);
    }
  }, [loading, entry, selectedDate]);

  return (
    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Female Labour</th>
          <th>Male Labour</th>
          <th>Mason</th>
          <th>HQ Staff</th>
          <th>Others</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0
          ? filteredData.map((entry, idx) => {
              const rawAttendance = entry.attendance;
              console.log(`Raw attendance for ${entry.date}:`, rawAttendance);

              const attendanceData =
                Array.isArray(rawAttendance) && rawAttendance.length > 0
                  ? rawAttendance[0].split(",").map((item) => item.trim())
                  : [];

              return (
                <tr key={idx}>
                  {attendanceData.length > 0 ? (
                    attendanceData.map((val, i) => <td key={i}>{val}</td>)
                  ) : (
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", color: "red" }}
                    >
                      No attendance data
                    </td>
                  )}
                </tr>
              );
            })
          : !loading && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "red" }}>
                  No entries for this date
                </td>
              </tr>
            )}
      </tbody>
    </table>
  );
};

export default AttendanceTable;

//  <tbody key={index}>
//                               <tr>
//                                 {/* <th
//                                 style={{
//                                   border: "1px solid black",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 Total Casual/
//                               </th> */}
//                                 <th
//                                   style={{
//                                     border: "1px solid black",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   Female Labour
//                                 </th>
//                                 <th
//                                   style={{
//                                     border: "1px solid black",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   Female Labour
//                                 </th>
//                                 <th
//                                   style={{
//                                     border: "1px solid black",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   Mason
//                                 </th>
//                                 <th
//                                   style={{
//                                     border: "1px solid black",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   HQ Staff
//                                 </th>
//                                 <th
//                                   style={{
//                                     border: "1px solid black",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   Others
//                                 </th>
//                               </tr>
//                               <tr>
//                                 {/* <td
//                                 style={{
//                                   border: "1px solid black",
//                                   padding: "20px",
//                                 }}
//                               ></td> */}
//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "20px",
//                                     width: "0%",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   {maleLabour}
//                                 </td>
//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "20px",
//                                     width: "0%",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   {femaleLabour}
//                                 </td>
//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "20px",
//                                     width: "0%",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   {mason}
//                                 </td>

//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "20px",
//                                     width: "0%",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   {HQStaff}
//                                 </td>
//                                 <td
//                                   style={{
//                                     border: "1px solid black",
//                                     padding: "20px",
//                                     width: "0%",
//                                     textAlign: "center",
//                                   }}
//                                 >
//                                   {Others}
//                                 </td>
//                               </tr>
//                             </tbody>
//                           );
//                         })
//                       ) : (
//                         <p>No data</p>
//                       )}


// {filteredData.length > 0 ? (
//                           filteredData.map((entry, index) => (
//                             <tr key={index}>
//                               <th
//                                 style={{
//                                   border: "1px solid black",
//                                   padding: "10px",
//                                 }}
//                               >
//                                 PROJECT NAME
//                               </th>

//                               <td
//                                 style={{
//                                   border: "1px solid black",
//                                   width: "70%",
//                                   padding: "10px",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 {entry?.projectName}
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <p>No data available for this date.</p>
//                         )}

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const DetailedProjectPage = ({ filteredData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print Report</button>

      <div ref={componentRef} style={{ padding: "30px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* HEADER (Repeats on every printed page) */}
          <thead className="print-header-auto">
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                <img
                  src="/logo192.png" // Change to your LOGO variable
                  alt="ASHKAM Logo"
                  style={{ height: "60px" }}
                />
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                DAILY PROGRESS REPORT
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                {/* {filteredData?.[0]?.date || "No Date"} */}
              </th>
            </tr>
          </thead>

          {/* CONTENT */}
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  textAlign: "center",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  textAlign: "center",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  textAlign: "center",
                }}
              ></td>
            </tr>

            {/* Dummy rows for testing page breaks */}
            {Array.from({ length: 30 }).map((_, i) => (
              <tr key={`extra-${i}`}>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                  }}
                >
                  Example content row {i + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedProjectPage;


