/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, LinearProgress, Card, Divider } from "@mui/material";
import { Button, Modal, Form } from "react-bootstrap";
import FileBase from "react-file-base64";
import { createPost, getPosts, update } from "../../action/posts";
import { getEntryDetails } from "../../action/posts";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formVisible, setFormVisible] = useState(false);

  const [scopeVisible, setScopeVisible] = useState(false);

  const [termsVisible, setTermsVisible] = useState(false);

  const [termsConditions, setTermsConditions] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState(null); // New state for selected post ID

  const [isChecked, setIsChecked] = useState(false); // State to track checkbox

  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    projectNumber: "",
    commencementDate: "",
    endDate: "",
    projectManager: "",
    selectedFile: "",
    scope: "",
    poUnpriced: "",
    termsConditions: "",
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
        endDate: "",
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

  const handleOpenTerms = (e) => {
    e.preventDefault();
    setTermsVisible(true);
    setScopeVisible(false);
    console.log("openterms");
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update checkbox state
  };
  const handleAccept = () => {
    setTermsConditions(true);
    console.log("accept");
  };

  const handleDecline = () => {
    setTermsConditions(false);
    setTermsVisible(false);
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

      // const newtermsCondition = existingPost.termsConditions ? false : true; // Example logic

      // Merge existing and new data
      const updatedData = {
        ...existingPost,
        scope: formData.scope || existingPost.scope,
        poUnpriced: formData.poUnpriced || existingPost.poUnpriced,
        termsConditions: termsConditions,
        teams: formData.teams || existingPost.teams,
        status: newStatus,
      };

      await dispatch(update(selectedPostId, updatedData));
      setFormData({
        scope: "",
        poUnpriced: "",
        termsConditions: termsConditions,
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
                              <a className="p-2 bg-green-500 hover:text-white transition rounded-lg bg-opacity-50 cursor-pointer">
                                Active
                              </a>
                            ) : (
                              <a
                                className="p-2 bg-red-500 hover:text-white transition rounded-lg bg-opacity-50 cursor-pointer"
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
              <label>Target End Date : </label>
              <input
                className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-14
                 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="date"
                name="endDate"
                value={formData.endDate}
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
          <form onSubmit={handleOpenTerms}>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Scope of the project : </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="scope"
                value={formData.scope}
                onChange={handleFormChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>P.O (unpriced) : </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="poUnpriced"
                value={formData.poUnpriced}
                onChange={handleFormChange}
                required
              />
            </div>
            {/* <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Project-Governing T&C: </label>
              <input
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                type="text"
                name="termsConditions"
                value={formData.termsConditions}
                onChange={handleFormChange}
                required
              />
            </div> */}

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label>Employees Involved : </label>
              <input
                className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md ml-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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

      {/* ___________________________________Terms & condition modal __________________________________________ */}

      <Modal
        show={termsVisible}
        onHide={() => setTermsVisible(false)}
        centered
        style={{ padding: "12px", marginTop: "10vh" }}
        // scrollable
      >
        <Modal.Header closeButton>
          <h5>Terms & Conditions</h5>
        </Modal.Header>

        <form onSubmit={handleSubmitScope}>
          <Modal.Body
            style={{ maxHeight: "300px", overflowY: "auto" }}
            scrollable
          >
            <div style={{ marginBottom: "15px", padding: "10px" }}>
              <h4 className="font-bold">
                Welcome to our Project Management Tool . By accessing or using
                our web application, you agree to comply with and be bound by
                these Terms and Conditions (“Terms”). If you do not agree, you
                will not proceed further.
              </h4>
              <div style={{ marginTop: "15px", padding: "5px" }}>
                <label>1. Acceptance: </label>
                <ol>
                  <li>
                    By using our application, you agree to these terms. If you
                    disagree, please do not use the app.
                  </li>
                </ol>
              </div>
              <div style={{ padding: "5px" }}>
                <label>2. Usage: </label>
                <ol>
                  <li>
                    Use the app responsibly and for lawful purposes only.
                    Unauthorized access or misuse is prohibited.
                  </li>
                </ol>
              </div>{" "}
              <div style={{ padding: "5px" }}>
                <label>3. Privacy: </label>
                <ol>
                  <li>We collect and process data per our Privacy policy.</li>
                </ol>
              </div>{" "}
              <div style={{ padding: "5px" }}>
                <label>4. Intellectual Property: </label>
                <ol>
                  <li>
                    All app content belongs to us or our licensors. Do not copy
                    or distribute without permission.
                  </li>
                </ol>
              </div>{" "}
              <div style={{ padding: "5px" }}>
                <label>5. Liability: </label>
                <ol>
                  <li>
                    We provide the app "as-is" without guarantees. We are not
                    liable for any damages caused by its use.
                  </li>
                </ol>
              </div>{" "}
              <div style={{ padding: "5px" }}>
                <label>6. Governing Law: </label>
                <ol>
                  <li>
                    These terms are governed by the laws of Indian Government.
                  </li>
                </ol>
              </div>{" "}
              <div style={{ padding: "5px" }}>
                <label>7. Contact Information: </label>
                <ol>
                  <li>
                    For questions or concerns, please contact us at:
                    <h6> Email: info_tec@ashkamenergy.com</h6>
                  </li>
                </ol>
              </div>
            </div>{" "}
            <Form.Check
              type="checkbox"
              label="I agree to the Terms & Conditions"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </Modal.Body>

          <div className="bg-gray-100 px-2 py-2 sm:flex sm:flex-row-reverse sm:px-6">
            <Button variant="secondary" onClick={handleDecline}>
              Decline
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={handleAccept}
              disabled={!isChecked}
              style={{ display: "flex", float: "right", marginRight: "5px" }}
            >
              Accept
            </Button>
          </div>
        </form>

        {/* Buttons outside of scrollable content */}
        {/* <Modal.Footer> */}

        {/* </Modal.Footer> */}
      </Modal>

      {/* But I want till the checked in not checked accept button will be disable not hidden */}
    </div>
  );
};

export default Dashboard;

{
  /*Terms & Condition regarding software 
 <ol>
* <li>
i. Ensure that all future communication with employees is
performed with the consent of the Ashkam; and No pouching of
Ashkam’s appointed consultants/employees internal or external
shall be permitted till 3 years from the date of contract.
</li>
<li>
ii. Obtain any work or other permits required if necessary;
and unless otherwise expressly stated in this agreement, all
direct expenses of ASHKAM representative including to the
performance of the services specified hereunder shall be borne
by the Client, including but not limited to travel, outstation
boarding and lodging and other expenses. ASHKAM shall submit
the incurred cost with relevant bills attached.
</li>
<li>
iii. The Consultancy shall be under no liability whatever to
the Client for any indirect loss and/or expense (including
loss of profit) suffered by the Client arising out of a breach
by the Consultancy of these terms and conditions.
</li>
<li>
iv. In the event of any breach of this contract by the
Consultancy, the remedies of the Client shall be limited to
damages. Under no circumstances shall the liability of the
Consultancy exceed the Fee of the Services.
</li>
<li>
v. The Client shall not be entitled to set off against or
deduct from the Fee any sums owed or claimed to be owed to the
Client by the Consultancy.
</li>
<li>
vi. The Consultancy reserves the right to review these terms
and conditions at any time. If, following any such review,
there is to be any change to these terms and conditions, then
that change shall take effect from the date on which the
Consultancy notifies the Client of such change. Except where
the Consultancy supplies further Services to the Client and
the Client accepts such Services, the Client shall be under no
obligation to accept such changes.
</li>
<li>
vii. In the event of a default in performance or termination,
all calculations and reports in the possession of ASHKAM shall
be subject to lien for the payment of all fees and expenses
due and owing by virtue of this agreement.
</li>
<li>
viii. Client has to pay the additional amount for the hard
copy or CD drive submission.
</li>
<li>
ix. Any other analysis which is not part of the scope of work
will require an additional amount.
</li>
</ol>
</div>

<div style={{ marginBottom: "15px", padding: "15px" }}>
<h4 className="font-bold">CONFIDENTIALITY </h4>
<ol>
<li>
i. All correspondence forwarded by the Consultancy to the
Client and relating to any and all Candidates shall be
considered to be strictly private and confidential between the
parties involved and cannot be forwarded to any other party
unless formal written permission is given, in advance, by the
Consultancy.
</li>
<li>
ii. Should these conditions be breached by the Client, the
Consultancy reserves the right to charge the Client a penalty
Fee equivalent to the value of the original placement Fee for
the Candidate.
</li>
</ol>
</div>

<div style={{ marginBottom: "15px", padding: "15px" }}>
<h4 className="font-bold">DISCLAIMER</h4>
<ol>
<li>
i. The Consultancy interviews Candidates and obtains details
from them of their qualifications, skills, and experience,
which the Consultancy records and retains. The information
contained in the Consultancy’s assessment and report is
therefore based on details supplied to the Consultancy and is
correct to the best of the Consultancy’s knowledge. The
Consultancy accepts no responsibility whatsoever for errors,
omissions, or incorrect conclusions.
</li>
<li>
ii. Whilst the Consultancy endeavors to select Candidates
which, in the Consultancy’s opinion, are most suitable to the
Client’s needs, the Consultancy shall accept no liability on
behalf of themselves, the Consultancy’s employees, agents, or
assigns for any loss or damage, costs of compensation, however
caused, which the Client may suffer or for which the Client
may become liable arising out of, or in connection with, or as
a result of, the introduction by the Consultancy to the
Client, of any Candidate.
</li>
<li>
iii. The Consultancy cannot accept responsibility for any loss
or expense incurred due to the Client’s lack of familiarity
with any relevant legislation regarding employment of
Candidates, or as a result of any infringement.
</li>
</ol> */
}
