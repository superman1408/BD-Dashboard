import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../action/posts";

const ProjectWindow = () => {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);

  const posts = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts())
      // .then(() => {
      //   setLoading(false);
      // })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });
  }, [dispatch]);

  console.log(posts);

  return (
    <div className="  items-start my-2">
      {/* <div className="lg:w-3/4 m-full lg:pr-3">
        <div className="bg-gray-200 rounded xl p-6">Card</div>
      </div> */}

      <div className="p-2 h-screen bg-gray-200">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="text-xl mb-2">Projects</h1>
          <div className="pl-5 pr-5 pt-2 pb-2 bg-green-600 text-sm font-semibold text-white  text-right   rounded-lg bg-opacity-80">
            + Project
          </div>
        </div>

        <div className="overflow-auto  shadow mt-3">
          <div className="overflow-auto rounded-lg shadow">
            {/* {loading ? (
              <div item xs={12}>
                <h1>loading...</h1>
              </div>
            ) : ( */}
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  {" "}
                  <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Project Title
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Project Number
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Project Manager
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Date
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Last Updated On
                  </th>
                </tr>
              </thead>
              {posts.map((post, index) => (
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <div className="p-3">
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={post?.selectedFile}
                        alt=""
                      ></img>
                    </div>
                    <td className="p-3 text-sm text-blue-800 font-semibold whitespace-nowrap">
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
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                      <span className="p-1.5 text-sm font-medium text-blue-800 bg-yellow-300 rounded-lg bg-opacity-50">
                        20/10/2024
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                      <a
                        href="#"
                        className="p-2 bg-purple-200 hover:bg-purple-300 hover:text-white transition rounded-lg bg-opacity-50 "
                      >
                        Activate
                      </a>
                    </td>
                  </tr>
                  {/* <tr className="bg-gray">
                    <div className="p-3">
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      ></img>
                    </div>
                    <td className="p-3 text-sm text-gray-700 text-blue-800 font-semibold whitespace-nowrap">
                      EPC-Temple Project
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      001
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      John Doe
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      20/10/2024
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                      <span className="p-1.5 text-sm font-medium text-blue-800 bg-yellow-300 rounded-lg bg-opacity-50">
                        20/10/2024
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                      <a
                        href="#"
                        className="p-2 bg-purple-200 hover:bg-purple-300 hover:text-white transition rounded-lg bg-opacity-50 "
                      >
                        Activate
                      </a>
                    </td>
                  </tr> */}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWindow;
