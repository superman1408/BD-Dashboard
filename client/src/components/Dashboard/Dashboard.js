import React, { useEffect } from "react";
import { Button, Card, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import DPRimage from "../../assests/DPR.png";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";

import CurveDisplay from "../CurveDisplay/CurveDisplay";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  // If your route path looks like /dashboard/:id, then id will be an object, for example: { id: '123' }. So, you need to access it like this:

  // console.log(id);

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDPRClick = () => {
    navigate(`/${id}/viewdetails`);
  };

  const handleCDRClick = () => {
    navigate(`/contractregister`);
  };

   const handleINVENTORYClick = () => {
    navigate(`/${id}/inventory`);
  };

  return (
    <div className="items-start my-2 mb-50">
      {posts.map((post, index) => {
        // console.log(post?.projectNumber);
        if (post.projectNumber === id) {
          // console.log(post?.projectNumber);
          return (
            <div key={index}>
              <div className="p-2 h-screen bg-white items-center justify-center ">
                <div className="flex flex-wrap items-center justify-center">
                  <h1 className="p-2 mt-2 text-[22px] font-bold text-blue-900 text-center">
                    {post?.projectName}
                  </h1>
                </div>

                <div className="flex md:flex-row flex-col">
                  {/* mx-auto: Centers the container within the available space horizontally. */}

                  <div className="p-3  mx-auto overflow-auto  bg-gray-100 rounded  w-100">
                    <div className="bg-white flex mb-2">
                      {/* Blue line stays fixed */}
                      <div className="w-2 bg-blue-800"></div>

                      {/* Content adapts */}
                      <div className="flex flex-col md:flex-row flex-1">
                        <h4 className="p-3 font-bold">
                          Scope of the Project :
                        </h4>
                        <h1 className="p-3">{post?.scope}</h1>
                      </div>
                    </div>

                    <div className="bg-white flex mb-2">
                      {/* Blue line stays fixed on the left */}
                      <div className="w-2 bg-blue-800"></div>

                      {/* Content handles responsiveness */}
                      <div className="flex flex-col md:flex-row flex-1">
                        <div className="flex">
                          <h4 className="p-3 font-bold">
                            Date of Commencement :
                          </h4>
                          <h4 className="p-3">{post?.commencementDate}</h4>
                        </div>

                        <div className="flex">
                          <h4 className="p-3 font-bold">
                            Date of Completion :
                          </h4>
                          <h4 className="p-3">{post?.endDate}</h4>
                        </div>
                      </div>
                    </div>

                    <div className=" bg-white flex mb-2">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">P.O :</h4>
                      <h4 className="p-3 ml-10">{post?.poUnpriced}</h4>
                    </div>
                    <div className=" bg-white flex mb-2">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">
                        Project-Governing Terms & Conditions :
                      </h4>

                      {post?.termsConditions === "true" ? (
                        <h4 className="p-3 ml-4 text-green-700">Accepted</h4>
                      ) : (
                        <h4 className="p-3 ml-4 text-red-600">Declined</h4>
                      )}
                    </div>
                    <div className=" bg-white flex ">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">Active Team Members : </h4>
                      <h4 className="p-3 ml-10">{post?.teams}</h4>
                    </div>

                    <div className="growth-card">
                      <style>
                        {`
                            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

                            .growth-card {
                              background: linear-gradient(145deg, #ffffff, #fafaff);
                              padding: 12px;
                              border-radius: 18px;
                              box-shadow: 0 15px 40px rgba(0,0,0,0.08);
                              margin-top: 20px;
                              border: 1px solid rgba(138, 93, 255, 0.15);
                              font-family: "Poppins", sans-serif;
                            }

                            .growth-title {
                              font-weight: 700;
                              font-size: 18px;
                              letter-spacing: 0.4px;
                              color: #3c3b61;
                              margin-bottom: 18px;
                            }

                            .growth-table {
                              width: 100%;
                              border-collapse: collapse;
                              font-size: 14px;
                            }

                            .growth-table thead {
                              background: linear-gradient(135deg, #0D325c, #5a5dfaff);
                            }

                            .growth-table th {
                              padding: 12px 10px;
                              text-align: left;
                              color: white;
                              letter-spacing: 0.3px;
                              font-weight: 600;
                            }

                            .growth-table td {
                              padding: 12px 10px;
                              border-bottom: 1px solid #ece9ff;
                              color: #4a4a6a;
                            }

                            .growth-table tr {
                              transition: all 0.25s ease-in-out;
                            }

                            .growth-table tr:hover {
                              background: rgba(138, 93, 255, 0.08);
                              transform: translateX(4px) scale(1.01);
                            }

                            .growth-table td:first-child {
                              font-weight: 700;
                              color: #0D325c;
                            }
                            `}
                      </style>

                      <h3 className="growth-title">Recent Tasks Updated</h3>

                      <table className="growth-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Month</th>
                            <th>Task Done</th>
                          </tr>
                        </thead>

                        <tbody>
                          {post?.currentTaskDone
                            ?.slice(-4)
                            ?.map((item, index) => (
                              <tr key={item.index}>
                                <td>{item.index + 1}</td>
                                <td>{item.month}</td>
                                <td>{item.value}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <CurveDisplay />
                  </div>
                </div>

                <div className="p-3 overflow-auto mt-3 bg-gray-100 rounded flex mb-5">
                  <div className="h-auto w-18 flex mb-5">
                    <div className="flex items-center space-x-4 ml-10">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-dpr">
                            Detail Progress Report
                          </Tooltip>
                        }
                      >
                        <button
                          type="button"
                          onClick={handleDPRClick}
                          className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 shadow-md hover:bg-green-200 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 17.25a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75Zm2.25-3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-5.25Z"
                              clipRule="evenodd"
                            />
                            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                          </svg>
                        </button>
                      </OverlayTrigger>
                      <h6
                        className="font-semibold text-gray-700 cursor-pointer"
                        onClick={handleDPRClick}
                      >
                        Daily Progress Report
                      </h6>
                    </div>

                    <div className="flex items-center space-x-4 ml-10 ">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-cdr">
                            Contract Detail Report
                          </Tooltip>
                        }
                      >
                        <button
                          type="button"
                          onClick={handleCDRClick}
                          className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 shadow-md hover:bg-green-200 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                              clipRule="evenodd"
                            />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                          </svg>
                        </button>
                      </OverlayTrigger>
                      <h6
                        className="font-semibold text-gray-700 cursor-pointer"
                        onClick={handleCDRClick}
                      >
                        Contract Detail Report
                      </h6>
                    </div>

                    <div className="flex items-center space-x-4 ml-10 ">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-cdr">Inventory</Tooltip>}
                      >
                        <button
                          type="button"
                          onClick={handleINVENTORYClick}
                          className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 shadow-md hover:bg-green-200 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                              clipRule="evenodd"
                            />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                          </svg>
                        </button>
                      </OverlayTrigger>
                      <h6
                        className="font-semibold text-gray-700 cursor-pointer"
                        onClick={handleINVENTORYClick}
                      >
                        Inventory
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null; // Don't render anything if the post doesn't match the ID
      })}
    </div>
  );
};

export default Dashboard;
