import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { Button, Container, Card } from "react-bootstrap";
import EntryStep1 from "./EntryStep1";
import EntryStep2 from "./EntryStep2";
import { entryDetails } from "../../action/posts";
import { ToastContainer, toast } from "react-toastify";
// import EntryStep2 from "./EntryStep2";
// import Step3 from "./Step3";

const EntryDetails = () => {
  const { id: projectNumber } = useParams();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

    // Upload images (Cloudinary)
    const imageUploadPromises = (formData.activityList || []).map((item) => {
      if (!item.image) return Promise.resolve(""); // no image, skip
      const data = new FormData();
      data.append("file", item.image);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "realtimeapp");

      return fetch("https://api.cloudinary.com/v1_1/realtimeapp/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => data.secure_url)
        .catch((err) => {
          console.error("Image upload failed:", err);
          return "";
        });
    });

    const uploadedImages = await Promise.all(imageUploadPromises);

    // Flatten activityList into activity1, activity2...
    const updatedFormData = {
      projectNumber: formData.projectNumber,
      date: formData.date,
      activityList:
        formData.activityList
          ?.map((m) => `${m.text}: ${m.status} `)
          .join("||") || "",

      plannedWorkList:
        formData.plannedWorkList
          ?.map((m) => `${m.description}: ${m.presentCompletion}`)
          .join(", ") || "",

      materialInventoryList:
        formData.materialInventoryList
          ?.map((m) => `${m.description}: ${m.quantity}`)
          .join(", ") || "",
      materialRequiredList:
        formData.materialRequiredList
          ?.map((m) => `${m.description}: ${m.quantity}`)
          .join(", ") || "",
      // materialRequiredList:
      //   formData.materialRequiredList?.map(
      //     (m) => `${m.description}: ${m.quantity}`
      //   ) || "",
      procurementList:
        formData.procurementList
          ?.map((m) => `${m.description}:${m.vendor}: ${m.status}`)
          .join(", ") || "",

      attendance: formData.attendance
        ? Object.entries(formData.attendance)
            .map(([type, count]) => `${type}: ${count}`)
            .join(", ")
        : "",

      maleLabour: formData.maleLabour || "",
      femaleLabour: formData.femaleLabour || "",
      mason: formData.mason || "",
      uploadPictures1: uploadedImages[0] || "",
      uploadPictures2: uploadedImages[1] || "",
      uploadPictures3: uploadedImages[2] || "",
      uploadPictures4: uploadedImages[3] || "",
      uploadPictures5: uploadedImages[4] || "",
      preparedBy: formData.preparedBy || "", // assuming this is who submitted it
      reviewedBy: formData.reviewedBy || "",
    };

    console.log("Final transformed formData:", updatedFormData);

    dispatch(entryDetails(updatedFormData))
      .then(() => {
        toast.success("Form Submitted Successfully!");
        // navigate after 5s if needed

        setTimeout(() => {
          navigate(`/${projectNumber}/viewdetails`);
          window.location.reload();
        }, 5000);
        //         })
      })
      .catch((err) => {
        console.error("Dispatch error:", err);
        toast.error("Submission failed. Please try again.");
      });
  };

  return (
    <Container className="d-flex justify-content-center mt-4 mb-5 background-color-gray">
      <ToastContainer />
      <Card
        className="p-4 custom-card"
        style={{ width: "100%", maxWidth: "900px" }}
      >
        {step === 1 && (
          <EntryStep1
            formData={formData}
            setFormData={setFormData}
            projectNumber={projectNumber}
          />
        )}
        {step === 2 && (
          <EntryStep2 formData={formData} setFormData={setFormData} />
        )}
        {/* {step === 3 && <Step3 formData={formData} setFormData={setFormData} />} */}

        <div className="d-flex justify-content-between mt-3">
          {step > 1 && <Button onClick={prevStep}>← Previous</Button>}
          {step < 2 ? (
            <Button onClick={nextStep}>Next →</Button>
          ) : (
            <>
              <Divider
                className="mt-3 mb-3"
                style={{
                  height: "2px",
                  backgroundColor: "#000",
                  fontWeight: "bold",
                }}
              />
              <Button variant="success" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default EntryDetails;
