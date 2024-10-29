import React, { useState, useEffect } from "react";
import { getPosts } from "../../action/posts";
import { Grid, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const ProjectWindow = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  useEffect(() => {
    // setLoading(true);

    dispatch(getPosts())
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [dispatch, loading]);
  return (
    <div>
      <h1>Project Window</h1>
      <p>This is the project window.</p>
      {loading ? (
        <div item xs={12}>
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </div>
      ) : (
        <div>
          <p>this is table</p>
          {posts.map((post, index) => (
            <div key={index}>
              <td className="p-3 text-sm text-blue-800 font-semibold whitespace-nowrap center">
                {post?.projectName}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {post?.projectNumber}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {post?.projectManager}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {post?.commencementDate}
              </td>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectWindow;
