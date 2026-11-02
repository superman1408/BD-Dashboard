
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Box } from "@mui/material";
import { Container, Card } from "react-bootstrap";
import EntryStep1 from "./EntryStep1";
import EntryStep2 from "./EntryStep2";
import { entryDetails } from "../../action/posts";
import { ToastContainer, toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EntryDetails = () => {
  const { id: projectNumber } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectNumber: projectNumber,
    date: "",
    activityList: [],
    materialInventoryList: [],
    materialRequiredList: [],
    procurementList: [],
    plannedWorkList: [],
    attendance: [],
    activity1: "",
    activity2: "",
    activity3: "",
    activity4: "",
    maleLabour: "",
    femaleLabour: "",
    mason: "",
    uploadPictures1: "",
    uploadPictures2: "",
    uploadPictures3: "",
    uploadPictures4: "",
    uploadPictures5: "",
    preparedBy: "",
    reviewedBy: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // Upload activity images
      const imageUploadPromises = (formData.activityList || []).map(
        (item) => {
          if (!item.image) return Promise.resolve("");

          const data = new FormData();
          data.append("file", item.image);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "realtimeapp");

          return fetch(
            "https://api.cloudinary.com/v1_1/realtimeapp/image/upload",
            {
              method: "POST",
              body: data,
            }
          )
            .then((res) => res.json())
            .then((data) => data.secure_url)
            .catch(() => "");
        }
      );

      const uploadedImages = await Promise.all(imageUploadPromises);

      // Prepare final form data
      const updatedFormData = {
        ...formData,

        activityList:
          formData.activityList
            ?.map(
              (m) =>
                `${m.text}::${m.quantity}::${m.activityDescription}::${m.targetDate}::${m.status}`
            )
            .join("||") || "",

        plannedWorkList:
          formData.plannedWorkList
            ?.map((m) => `${m.description}: ${m.presentCompletion}`)
            .join(", ") || "",

        materialInventoryList:
          formData.materialInventoryList
            ?.map(
              (m) =>
                `${m.material}::${m.unit}::${m.openingStock}::${m.issued}::${m.received}::${m.closingStock}::${m.requirement}`
            )
            .join(", ") || "",

        materialRequiredList:
          formData.materialRequiredList
            ?.map((m) => `${m.description}: ${m.quantity}`)
            .join(", ") || "",

        procurementList:
          formData.procurementList
            ?.map((m) => `${m.description}:${m.vendor}: ${m.status}`)
            .join(", ") || "",

        attendance: formData.attendance
          ? Object.entries(formData.attendance)
              .map(([type, count]) => `${type}: ${count}`)
              .join(", ")
          : "",

        uploadPictures1: uploadedImages[0] || "",
        uploadPictures2: uploadedImages[1] || "",
        uploadPictures3: uploadedImages[2] || "",
        uploadPictures4: uploadedImages[3] || "",
        uploadPictures5: uploadedImages[4] || "",
      };

      // Dispatch
      await dispatch(entryDetails(updatedFormData));

      toast.success("Form Submitted Successfully!");

      setTimeout(() => {
        navigate(`/${projectNumber}/viewdetails`);
        window.location.reload();
      }, 5000);

    } catch (err) {
      console.error("Dispatch error:", err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className="d-flex justify-content-center mt-4 mb-5 background-color-gray">
      <ToastContainer />

      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          mb: 2,
        }}
      >
        <Box sx={{ mb: 1 }}>
          <Button
            onClick={handleGoBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              padding: "8px 16px",
              color: "#16355d",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#e9eef5",
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Card
          className="p-4 custom-card"
          style={{ width: "100%", maxWidth: "900px" }}
        >
          {/* Actual form starts here */}
          <form onSubmit={handleSubmit}>

            <EntryStep1
              formData={formData}
              setFormData={setFormData}
              projectNumber={projectNumber}
            />

            <EntryStep2
              formData={formData}
              setFormData={setFormData}
            />

            <Divider
              className="mt-3 mb-3"
              style={{
                height: "2px",
                backgroundColor: "#000",
                fontWeight: "bold",
              }}
            />

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                sx={{
                  backgroundColor: "#16355d",
                  color: "white",
                  padding: "8px 30px",
                  "&:hover": {
                    backgroundColor: "#0d2748",
                  },
                }}
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Box>

          </form>
          {/* Actual form ends here */}
        </Card>
      </Box>
    </Container>
  );
};

export default EntryDetails;
