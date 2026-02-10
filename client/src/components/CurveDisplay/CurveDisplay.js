import React, { useState, useEffect } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import Curve from "../CurveDisplay/Scurve/Curve";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, update } from "../../action/posts";
import { useParams } from "react-router-dom";
import LineGraph from "./SCurve/LineGraph";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskIcon from "@mui/icons-material/Task";

const CurveDisplay = () => {
  const [dialogOpen, setDialogOpen] = useState();

  const { id } = useParams();

  const dispatch = useDispatch();

  const [currentPostId, setCurrentPostId] = useState(null); // Add state for current post ID

  const [modalType, setModalType] = useState(null);

  const [nextMonthLabel, setNextMonthLabel] = useState("");

  const [nextYearLabel, setNextYearLabel] = useState("");

  const [formData, setFormData] = useState({
    currentTaskDone: "",
    totalTask: "",
  });

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);

  const handleOpen = (type, post) => {
    setModalType(type);
    setDialogOpen(true);

    if (type === "growth") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const start = new Date(post.commencementDate);
      let baseMonth = start.getMonth();
      let baseYear = start.getFullYear();

      if (post?.currentTaskDone?.length > 0) {
        const nextIndex = baseMonth + post.currentTaskDone.length;
        setNextMonthLabel(monthNames[nextIndex % 12]);
        setNextYearLabel(baseYear + Math.floor(nextIndex / 12));
      } else {
        setNextMonthLabel(monthNames[baseMonth]);
        setNextYearLabel(baseYear);
      }
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setModalType(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingPost = posts.find((post) => post._id === currentPostId);

    if (!existingPost) return;

    if (modalType === "growth") {
      const currentList = existingPost.currentTaskDone || [];
      const nextMonth = currentList.length;

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // FIXED HERE ✔
      const projectStart = new Date(existingPost.commencementDate);

      const startMonth = isNaN(projectStart.getTime())
        ? 0
        : projectStart.getMonth();

      const monthIndex = startMonth + nextMonth;
      const monthName = monthNames[monthIndex % 12];
      const yearOffset = Math.floor((startMonth + nextMonth) / 12);

      const updatedData = {
        ...existingPost,
        currentTaskDone: [
          ...currentList,
          {
            month: monthName,
            value: Number(formData.currentTaskDone),
            index: nextMonth, // <--- ✨ Add this important line
          },
        ],
      };

      await dispatch(update(currentPostId, updatedData));
      setFormData({ currentTaskDone: "" });
    }

    if (modalType === "task") {
      const updatedData = {
        ...existingPost,
        totalTask: Number(formData.totalTask),
      };

      await dispatch(update(currentPostId, updatedData));
      setFormData({ totalTask: "" });
    }
    dispatch(getPosts());
    handleClose();
  };

  const currentMonthYear = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="mb-8">
        {posts.map((post) => {
          const isoDate = post?.updatedAt;
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
            // hour12: true,
            timeZone: "UTC",
          };

          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            options,
          ).format(new Date(isoDate));

          if (post.projectNumber === id) {
            return (
              <div key={post._id} className="mb-4">
                <div className="flex justify-between items-center bg-gray-100 rounded p-2">
                  <div>
                    <h1 className="font-bold text-lg">
                      Ideal vs Actual Scurve
                    </h1>
                    <h3 className="font-semi-bold text-xs">
                      Last Updated Growth Rate At : {formattedDate}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="growth-tooltip">Add Growth Data</Tooltip>
                      }
                    >
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setCurrentPostId(post._id);
                          handleOpen("growth", post);
                        }}
                      >
                        <AddTaskIcon />
                      </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="task-tooltip">Add Total Task</Tooltip>
                      }
                    >
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setCurrentPostId(post._id);
                          handleOpen("task");
                        }}
                      >
                        <TaskIcon />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            );
          }
        })}

        {posts.map((post, index) => {
          const dateCommence = new Date(post?.commencementDate);
          const dateEnd = new Date(post?.endDate);
          const timeDifference = dateEnd - dateCommence;
          const duration = timeDifference / (1000 * 60 * 60 * 24 * 30);
          const midpoint = duration / 2;
          const currentgrowthRate = post?.currentTaskDone;
          const currentTotalTask = post?.totalTask;
          // console.log(currentgrowthRate);

          if (post.projectNumber === id) {
            return (
              <div>
                <div className="p-3 bg-gray-50 rounded mt-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Months Logged:</span>
                    <span className="font-semibold">
                      {post.currentTaskDone?.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tasks Completed : </span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {post.currentTaskDone?.reduce(
                          (a, c) => a + Number(c.value),
                          0,
                        )}
                      </span>
                      <span> of </span>
                      <span className="font-semibold">{post?.totalTask}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span>Average per Month:</span>
                    <span className="font-semibold">
                      {(
                        post.currentTaskDone?.reduce(
                          (a, c) => a + Number(c.value),
                          0,
                        ) / post.currentTaskDone?.length
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <LineGraph
                  key={index}
                  dateCommence={dateCommence}
                  dateEnd={dateEnd}
                  currentTotalTask={currentTotalTask}
                  // workCompleted={currentgrowthRate.map((v, i) => ({
                  //   month: i,
                  //   value: v,
                  // }))}

                  workCompleted={currentgrowthRate || []}
                />
              </div>
            );
          }
        })}
      </div>

      <Modal
        show={dialogOpen}
        onHide={() => setDialogOpen(false)}
        centered
        style={{ padding: "12px", marginTop: "10vh" }}
        // scrollable
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title style={{ padding: "10px" }}>
          {modalType === "growth"
            ? "Update Monthly Progress"
            : "Update Total Task"}
        </Modal.Title>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {modalType === "growth" && (
              <>
                <div
                  className="alert alert-warning"
                  style={{ fontSize: "0.85rem" }}
                >
                  <strong>Monthly Task Progress : </strong>Update only when
                  genuine work is completed for the month
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Current Task Done for {nextMonthLabel} {nextYearLabel} :
                  </label>
                  {/* <label
                    style={{ fontWeight: "600", marginLeft: "10px" }}
                  ></label> */}
                  <input
                    type="number"
                    name="currentTaskDone"
                    className="form-control"
                    value={formData.currentTaskDone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {modalType === "task" && (
              <div>
                <div
                  className="alert alert-warning"
                  style={{ fontSize: "0.85rem" }}
                >
                  <strong>Disclaimer:</strong> Total Task modifications will
                  only be made when required and approved by higher management.
                </div>

                <label className="form-label">Add Total Task:</label>
                <input
                  type="number"
                  name="totalTask"
                  className="form-control"
                  value={formData.totalTask}
                  onChange={handleChange}
                />
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button type="submit" variant="primary">
              Proceed
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default CurveDisplay;
