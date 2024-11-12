import React, { useEffect } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import DPRimage from "../../assests/DPR.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  // If your route path looks like /dashboard/:id, then id will be an object, for example: { id: '123' }. So, you need to access it like this:

  console.log(id);

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleClick = () => {
    navigate(`/${id}/viewdetails`);
  };

  return (
    <div className="items-start my-2">
      {posts.map((post) => {
        console.log(post?.projectNumber);
        if (post.projectNumber === id) {
          console.log(post?.projectNumber);
          return (
            <>
              <div className="p-2 h-screen bg-white items-center justify-center">
                <div className="flex flex-wrap items-center justify-center">
                  <h1 className="p-2 mt-2 text-[22px] font-bold text-blue-900 text-center">
                    {post?.projectName}
                  </h1>
                </div>

                <div className="p-3  mx-auto overflow-auto mt-3 bg-gray-100 rounded flex flex-col  justify-center">
                  {/* mx-auto: Centers the container within the available space horizontally. */}
                  <div>
                    <div className=" bg-white flex mb-2">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">Scope of the Project :</h4>
                      <h1 className="p-3 ml-8">{post?.scope}</h1>
                    </div>
                    <div className=" bg-white flex mb-2">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">Date of Commencement :</h4>
                      <h4 className="p-3 ml-2">{post?.commencementDate}</h4>
                    </div>
                    <div className=" bg-white flex mb-2">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">P.O (unpriced) :</h4>
                      <h4 className="p-3 ml-20">{post?.poUnpriced}</h4>
                    </div>
                    <div className=" bg-white flex mb-2">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">Project-Governing T&C :</h4>
                      <h4 className="p-3 ml-4">{post?.projectGoverning}</h4>
                    </div>
                    <div className=" bg-white flex ">
                      <div className=" w-2 bg-blue-800"></div>
                      <h4 className="p-3 font-bold">Employees Involved :</h4>
                      <h4 className="p-3 ml-10">{post?.teams}</h4>
                    </div>
                  </div>
                </div>

                <div className="p-3 overflow-auto mt-3 bg-gray-100 rounded flex">
                  <div className="h-auto w-18 flex">
                    <div className="p-2  ml-10">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-dpr">
                            Detail Progress Report
                          </Tooltip>
                        }
                      >
                        <button
                          // class="rounded-md bg-white p-4 text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-8"
                          className="p-2 hover:shadow transition-all shadow-sm focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-8"
                          type="button"
                          onClick={handleClick}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="green"
                            className="size-8"
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
                      <h6 className="mt-1 font-bold justify-center text-center ml-6 ">
                        DPR
                      </h6>
                    </div>
                    <div className="p-2 ml-10">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Contract Detail Report</Tooltip>}
                      >
                        <button
                          className="p-2 hover:shadow transition-all shadow-sm focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-8"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="green"
                            class="size-8"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                              clip-rule="evenodd"
                            />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                          </svg>
                        </button>
                      </OverlayTrigger>
                      <h6 className="mt-1 font-bold justify-center text-center ml-6">
                        CDR
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
        return null; // Don't render anything if the post doesn't match the ID
      })}
    </div>
  );
};

export default Dashboard;