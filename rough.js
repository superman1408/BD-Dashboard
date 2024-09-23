import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailedProjectPage = () => {
  const { date } = useParams(); // Get the date from URL params
  const posts = useSelector((state) => state.posts); // Get posts from Redux store
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter the data based on the selected date
    const allEntries = [];
    posts[0]?.forEach((post) => {
      for (let index = 0; index < post?.submittedBy.length; index++) {
        if (post?.date[index] === date) {
          allEntries.push({
            submittedBy: post?.submittedBy[index],
            date: post?.date[index],
            activity1: post?.activity1[index],
            // Add any other fields you want to display
          });
        }
      }
    });

    setFilteredData(allEntries); // Set the filtered data
  }, [date, posts]);

  return (
    <div>
      <h1>Details for {date}</h1>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Submitted By</th>
              <th>Date</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.submittedBy}</td>
                <td>{entry.date}</td>
                <td>{entry.activity1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for this date.</p>
      )}
    </div>
  );
};

export default DetailedProjectPage;
