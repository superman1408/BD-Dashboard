/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, LinearProgress, Card, Divider } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import FileBase from "react-file-base64";
import { createPost, getPosts, update } from "../../action/posts";
import { getEntryDetails } from "../../action/posts";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formVisible, setFormVisible] = useState(false);

  const [scopeVisible, setScopeVisible] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null); // New state for selected post ID

  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    projectNumber: "",
    commencementDate: "",
    projectManager: "",
    selectedFile: "",
    scope: "",
    poUnpriced: "",
    projectGoverning: "",
    teams: "",
    status: "",
  });
  const posts = useSelector((state) => state.posts);

  const [loading, setLoading] = useState(true);

  const entry = useSelector((state) => state.entry);

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

  useEffect(() => {
    // setLoading(true);

    dispatch(getEntryDetails());
  }, [dispatch, loading]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true);

    try {
      await dispatch(createPost(formData));
      setFormVisible(false);
      setFormData({
        projectName: "",
        clientName: "",
        projectNumber: "",
        commencementDate: "",
        projectManager: "",
        selectedFile: "",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to submit the project", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(projectNumber);

  const handleEntry = (projectNumber) => {
    navigate(`/dashboard/${projectNumber}`);
  };

  const handleDetails = (projectNumber) => {
    navigate(`/${projectNumber}/viewdetails`);
  };

  const handleAddProject = () => {
    setFormVisible(true);
  };

  const handleScope = (id) => {
    setSelectedPostId(id);
    setScopeVisible(true);
  };

  const handleSubmitScope = async (e) => {
    e.preventDefault();
    setScopeVisible(false);
    // setIsActive(true);
    if (!selectedPostId) {
      console.error("Project Id is empty!");
      return;
    }

    try {
      // Fetch the existing project data
      const existingPost = posts.find((post) => post._id === selectedPostId);
      if (!existingPost) {
        console.error("No existing project found!");
        return;
      }

      const newStatus = existingPost.status ? false : true; // Example logic

      // Merge existing and new data
      const updatedData = {
        ...existingPost,
        scope: formData.scope || existingPost.scope,
        poUnpriced: formData.poUnpriced || existingPost.poUnpriced,
        projectGoverning:
          formData.projectGoverning || existingPost.projectGoverning,
        teams: formData.teams || existingPost.teams,
        status: newStatus,
      };

      await dispatch(update(selectedPostId, updatedData));
      setFormData({
        scope: "",
        poUnpriced: "",
        projectGoverning: "",
        teams: "",
        status: newStatus,
      });
      console.log("Project updated successfully:", selectedPostId);
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit the project", error);
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      {loading ? (
        <Grid item xs={12}>
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </Grid>
      ) : (
        <div>
          <div className="items-start my-2">
            <div className="p-2 h-screen bg-gray-200">
              <div className="flex flex-wrap justify-between items-center">
                <h1 className="text-xl mb-2 font-bold">Project Window</h1>

                <button
                  className="pl-5 pr-5 pt-2 pb-2 bg-purple-800 hover:bg-purple-300 text-sm font-semibold text-white  text-right   rounded-lg bg-opacity-80"
                  onClick={handleAddProject}
                >
                  + Project
                </button>
              </div>
              <div className="overflow-auto   mt-3">
                <div className="overflow-auto rounded-lg shadow hidden md:block ">
                  <table className="w-full ">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center"></th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Project Title
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Project Number
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Project Manager
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Date
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Last Updated On
                        </th>

                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Status
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">
                          Proceed
                        </th>
                      </tr>
                    </thead>
                    {posts.map((post, index) => (
                      <tbody className="divide-y divide-gray-200" key={index}>
                        <tr className="bg-white" key={index}>
                          <td className="p-2 h-15 w-15">
                            <img
                              className="inline-block h-14 w-14  ring-2 ring-white rounded center"
                              src={post?.selectedFile}
                              alt="project images"
                            ></img>
                          </td>
                          <td className="p-3 text-sm text-blue-800 font-semibold whitespace-nowrap text-center">
                            {post?.projectName}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {post?.projectNumber}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {post?.projectManager}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {post?.commencementDate}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <span className="p-1.5 text-sm font-medium text-blue-800 bg-yellow-300 rounded-lg bg-opacity-50">
                              {entry.length > 0 &&
                                entry.find(
                                  (
                                    data //code to find particular data from different schema & match with present schema
                                  ) =>
                                    data?.projectNumber === post?.projectNumber
                                )?.updatedAt}
                            </span>
                            {/* match each post with its corresponding entry based on an identifier like projectNumber or another unique field */}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {post?.status === "true" ? (
                              <a className="p-2 bg-green-500 hover:text-white transition rounded-lg bg-opacity-50 ">
                                Active
                              </a>
                            ) : (
                              <a
                                className="p-2 bg-red-500 hover:text-white transition rounded-lg bg-opacity-50 "
                                onClick={() => handleScope(post._id)}
                              >
                                Inactive
                              </a>
                            )}
                          </td>

                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {post?.status === "true" && (
                              <Button
                                className="p-2 transition-colors duration-300 hover:text-gray-500"
                                variant="ghost"
                                onClick={() => handleEntry(post.projectNumber)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-7 transition-colors duration-300 hover:text-green-600"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="8" className="p-0.5 bg-gray-200"></td>
                          {/* Adjust the colspan based on your table structure */}
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
              {/* ______________________screen size md___________________________________ */}
              <div className="grid grid-cols-1  gap-4 md:hidden mb-3">
                <div className="bg-white space-y-3 p-4 rounded lg-shadow">
                  <div className="flex items-center space-x-2 text-sm">
                    <div>
                      {posts.map((post, index) => (
                        <div key={index}>
                          <div className="flex">
                            <div className="p-1 w-32 h-32">
                              <img
                                className="object-cover w-full h-full w-32 h-32 "
                                variant="top"
                                src={post?.selectedFile} // Ensure post.selectedFile is defined
                                alt="Profile_Picture"
                              />
                            </div>
                            <div>
                              <div>
                                <div className="p-1 font-bold">
                                  <h4>Project Name : {post?.projectName}</h4>
                                </div>
                                <div className="p-1">
                                  <h6>
                                    Project Number : {post?.projectNumber}
                                  </h6>
                                </div>
                                <div className="p-1">
                                  <h6>Date : {post?.commencementDate}</h6>
                                </div>
                                <div className="p-1">
                                  <h6>
                                    Project Manager : {post?.projectManager}
                                  </h6>
                                </div>
                              </div>
                              <div className="flex p-2 text-sm text-gray-700 justify-between">
                                <Button
                                  className="p-2 text-sm text-gray-700"
                                  variant="ghost"
                                >
                                  {post?.status === "true" ? (
                                    <a className="p-2 bg-green-500 hover:text-white transition rounded-lg bg-opacity-50 ">
                                      Active
                                    </a>
                                  ) : (
                                    <a
                                      className="p-2 bg-red-500 hover:text-white transition rounded-lg bg-opacity-50 "
                                      onClick={() => handleScope(post._id)}
                                    >
                                      Inactive
                                    </a>
                                  )}
                                </Button>
                                <div className="text-sm text-gray-700">
                                  {post?.status === "true" && (
                                    <Button
                                      className="transition-colors duration-300 hover:text-gray-500"
                                      variant="ghost"
                                      onClick={() =>
                                        handleEntry(post.projectNumber)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-7 transition-colors duration-300 hover:text-green-600"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-0.5 bg-gray-200 mb-4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Projects */}
      <Modal
        show={formVisible}
        onHide={() => setFormVisible(false)}
        centered
        style={{ marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <h5>Add New Project</h5>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project Name: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Client Name: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project No.: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="projectNumber"
                value={formData.projectNumber}
                onChange={handleFormChange}
                required
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Date of Commencement: </label>
              <input
                className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="date"
                name="commencementDate"
                value={formData.commencementDate}
                onChange={handleFormChange}
                required
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project Manager: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleFormChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project Picture: </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formData, selectedFile: base64 })
                }
              />
            </div>
            <div className="bg-gray-100 px-2 py-2 sm:flex sm:flex-row-reverse sm:px-6">
              <Button
                type="submit"
                variant="primary"
                style={{ display: "flex", float: "right" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* ______________________ Scope Visible___________________________________ */}

      <Modal
        show={scopeVisible}
        onHide={() => setScopeVisible(false)}
        centered
        style={{ marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <h5>Add more data</h5>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitScope}>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Scope of the project: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="scope"
                value={formData.scope}
                onChange={handleFormChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>P.O (unpriced) </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="poUnpriced"
                value={formData.poUnpriced}
                onChange={handleFormChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project-Governing T&C: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="projectGoverning"
                value={formData.projectGoverning}
                onChange={handleFormChange}
                required
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Employees Involved: </label>
              <input
                className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="teams"
                value={formData.teams}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="bg-gray-100 px-2 py-2 sm:flex sm:flex-row-reverse sm:px-6">
              <Button
                type="submit"
                variant="primary"
                style={{ display: "flex", float: "right" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
