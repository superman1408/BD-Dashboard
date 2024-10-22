import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner
} from "react-bootstrap";
import "./EntryDetails.css";
import { Divider } from "@mui/material";
import FileBase from "react-file-base64";
import { entryDetails } from "../../action/posts";
import styled from "styled-components";


const UploadWrapper = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0;
  }
`;

const EntryDetails = () => {
  const projectNo = useParams();

  const [picLoading, setPicLoading] = useState(false);

  const [uploadPic1, setUploadPic1] = useState();
  const [uploadPic2, setUploadPic2] = useState();
  const [uploadPic3, setUploadPic3] = useState();
  const [uploadPic4, setUploadPic4] = useState();
  const [uploadPic5, setUploadPic5] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // console.log(projectNo.id);

  const [formData, setFormData] = useState({
    docNo: projectNo.id,
    date: "",
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
    submittedBy: "",
  });

// uploading 6 images here...........................................
  const pickImages = async (pics) => { 
    setPicLoading(true);
    
    if (pics.length !== 5) {
        alert("Please select exactly 5 images");
        setPicLoading(false);
        return;
    }

    // Function to handle each image upload
    const uploadImage = (pic, index) => {
        return new Promise((resolve, reject) => {
            if (!pic || (pic.type !== 'image/jpeg' && pic.type !== 'image/png')) {
                reject(new Error("Invalid file type. Please select JPEG/PNG images."));
            }

            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "realtimeapp");

            fetch("https://api.cloudinary.com/v1_1/realtimeapp/image/upload", {
                method: "POST",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                resolve(data.secure_url);
            })
            .catch((err) => reject(err));
        });
    };

    // Array to store the image upload promises
    const uploadPromises = [];
    for (let i = 0; i < pics.length; i++) {
        uploadPromises.push(uploadImage(pics[i], i));
    }

    // Perform all image uploads
    Promise.all(uploadPromises)
        .then((urls) => {
            setUploadPic1(urls[0]);
            setUploadPic2(urls[1]);
            setUploadPic3(urls[2]);
            setUploadPic4(urls[3]);
            setUploadPic5(urls[4]);
            setPicLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setPicLoading(false);
            alert("Error uploading images. Please try again.");
        });
    await updateFormDataWithImages().then(() => {
      setTimeout(() => { 
        console.log(formData);
      }, 30000);
    })
  };



  
  const updateFormDataWithImages = async () => {
    // e.preventDefault();
  // Batch update the formData with all uploaded pictures
    setFormData((prevFormData) => ({
        ...prevFormData,
        uploadPictures1: uploadPic1,
        uploadPictures2: uploadPic2,
        uploadPictures3: uploadPic3,
        uploadPictures4: uploadPic4,
        uploadPictures5: uploadPic5,
      }));
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  // Update formData with uploaded pictures
  await updateFormDataWithImages();

  // Now dispatch the updated formData
    setTimeout(() => {
      console.log("Updated formData Submit:", formData);
      dispatch(entryDetails(formData))
        .then(() => {
          console.log("Dispatched successfully");
          setInterval(() => { 
            navigate(`/${projectNo.id}/viewdetails`);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error dispatching formData:", error);
        });
    }, 9000);
    console.log("Updated formData:", formData); // This should now log the updated formData
    
  };


  const handleSave = async (e) => {
    e.preventDefault();

    // Update formData with uploaded pictures
    await updateFormDataWithImages().then(() => { 
      console.log("Updated formData:", formData); // This should now log the updated formData
      setTimeout(() => {
        console.log("Updated formData Save:", formData);
      }, 6000);
    });
    // Now dispatch the updated formData
  };



  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", paddingTop: "10px" }}
    >
      <Card className="p-4 custom-card">
        <h3
          style={{
            textAlign: "center",
            fontFamily: "Roboto ",
            color: "#0d325c",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          Detail Input Form
        </h3>
        <Form>
          <Form.Group controlId="formProjectName" className="mb-3">
            <Form.Label style={{ color: "black", fontWeight: "bold" }}>
              Project Number : {projectNo.id}
            </Form.Label>
          </Form.Group>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />
          <Form.Group controlId="formActivities" className="mb-3 ">
            <Form.Label style={{ fontSize: "18px" }}>Activities</Form.Label>
          </Form.Group>
          <Form.Group controlId="formCivilStructure" className="mb-3">
            <Form.Label>Civil & Structure</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter civil & structure details"
              name="activity1"
              style={{ height: "80px" }}
              value={formData.activity1}
              onChange={(e) =>
                setFormData({ ...formData, activity1: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formUploadPictures" className="mb-3">
            <Form.Label style={{ marginRight: "10px" }}>
              Upload All required Pictures here
            </Form.Label>
            <input type='file' multiple p={1.5} accept='image/*' onChange={(e) => pickImages(e.target.files)} />
            {/* Conditionally display the loading spinner when uploading */}
            {picLoading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group controlId="formPlannedWork" className="mb-3">
            <Form.Label>Planned Work For Tomorrow</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter planned work for tomorrow"
              name="activity2"
              style={{ height: "80px" }}
              value={formData.activity2}
              onChange={(e) => {
                setFormData({ ...formData, activity2: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formMaterialRequirement" className="mb-3">
            <Form.Label>Material Requirement</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter material requirement"
              name="activity3"
              style={{ height: "80px" }}
              value={formData.activity3}
              onChange={(e) => {
                setFormData({ ...formData, activity3: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formProcurementStatus" className="mb-3">
            <Form.Label>Procurement Status</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter procurement status"
              name="activity4"
              style={{ height: "80px" }}
              value={formData.activity4}
              onChange={(e) => {
                setFormData({ ...formData, activity4: e.target.value });
              }}
            />
          </Form.Group>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formMaleLabour">
                <Form.Label>Male Labour</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter male labour count"
                  name="maleLabour"
                  value={formData.maleLabour}
                  onChange={(e) => {
                    setFormData({ ...formData, maleLabour: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formFemaleLabour">
                <Form.Label>Female Labour</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter female labour count"
                  name="femaleLabour"
                  value={formData.femaleLabour}
                  onChange={(e) => {
                    setFormData({ ...formData, femaleLabour: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formMason">
                <Form.Label>Mason</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter mason"
                  name="mason"
                  value={formData.mason}
                  onChange={(e) => {
                    setFormData({ ...formData, mason: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formSubmittedBy" className="mb-3">
            <Form.Label>Submitted By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter"
              name="submittedBy"
              value={formData.submittedBy}
              onChange={(e) => {
                setFormData({ ...formData, submittedBy: e.target.value });
              }}
              style={{ width: "50%" }}
            />
          </Form.Group>
          <Divider
            className="mt-3 mb-3"
            style={{
              height: "2px",
              backgroundColor: "#000",
              fontWeight: "bold",
            }}
          />
          <Button
            variant="primary"
            type="submit"
            className="float-end mt-3 mr-3 mb-3 ml-3 btn-custom"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="float-end mt-3 mr-3 mb-3 ml-3 btn-custom"
            onClick={handleSave}
            disabled={picLoading}
          >
            {!formData.uploadPictures1 ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span> {/* Accessible label */}
              </>
            ) : (
              "Save"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EntryDetails;
