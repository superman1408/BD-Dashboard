import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  button,
  FormControl,
} from "react-bootstrap";
import "./EntryDetails.css";
import { Divider } from "@mui/material";
import FileBase from "react-file-base64";
import { entryDetails } from "../../action/posts";
import styled from "styled-components";
// import Snackbar from '@mui/material/Snackbar';


const UploadWrapper = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0;
  }
`;

const EntryDetails = () => {
  const [fileError, setFileError] = useState(null);
  const projectNo = useParams();

  const [picLoading, setPicLoading] = useState(false);

  const [uploadPic1, setUploadPic1] = useState();
  const [uploadPic2, setUploadPic2] = useState();
  const [uploadPic3, setUploadPic3] = useState();
  const [uploadPic4, setUploadPic4] = useState();
  const [uploadPic5, setUploadPic5] = useState();
  const [uploadPic6, setUploadPic6] = useState();

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
  const pickImages = (pics) => { 
    setPicLoading(true);
    
    if (pics.length !== 6) {
        alert("Please select exactly 6 images");
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
            setUploadPic6(urls[5]);
            setPicLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setPicLoading(false);
            alert("Error uploading images. Please try again.");
        });
};



  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormData({ ...formData, uploadPictures1: uploadPic1 });
    setFormData({ ...formData, uploadPictures2: uploadPic2 });
    setFormData({ ...formData, uploadPictures3: uploadPic3 });
    setFormData({ ...formData, uploadPictures4: uploadPic4 });
    setFormData({ ...formData, uploadPictures5: uploadPic5 });
    console.log(formData);
    await dispatch(entryDetails(formData)).then(() => { 
      navigate(`/${projectNo.id}/viewdetails`);
    });
    // console.log(formData);
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
              // onKeyDown={(e) => handleKeyDown(e, "activity1")}
            />
          </Form.Group>

          <Form.Group controlId="formUploadPictures" className="mb-3">
            <Form.Label style={{ marginRight: "10px" }}>
              Upload Pictures1
            </Form.Label>
            {/* <FormControl> */}

            {/* <FileBase
              type="file"
              fileName="Profile.png"
              onChange={(e) => pickImage(e.target.files[0])}
            /> */}

            <input type='file' multiple p={1.5} accept='image/*' onChange={(e) => pickImages(e.target.files)} />

            <FileBase
              type="file"
              fileName="Profile.png"
              onDone={({ base64 }) =>
                setFormData({ ...formData, uploadPictures2: base64 })
              }
            />

            {/* </FormControl> */}
            {fileError && <p>{fileError}</p>}
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
              // onKeyDown={(e) => handleKeyDown(e, "activity2")}
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
              // onKeyDown={(e) => handleKeyDown(e, "activity3")}
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
              // onKeyDown={(e) => handleKeyDown(e, "activity4")}
            />
          </Form.Group>
          <Form.Group controlId="formUploadPictures" className="mb-3">
            <Form.Label style={{ marginRight: "10px" }}>
              Upload Pictures
            </Form.Label>
            {/* <FormControl> */}
            {/* <UploadWrapper> */}
            <div>
              <Form.Label style={{ margin: "10px" }}>Sand</Form.Label>
              <FileBase
                type="file"
                fileName="Profile.png"
                onDone={({ base64 }) =>
                  setFormData({ ...formData, uploadPictures3: base64 })
                }
              />

              <Form.Label style={{ margin: "10px" }}>Rod</Form.Label>
              <FileBase
                type="file"
                fileName="Profile.png"
                onDone={({ base64 }) =>
                  setFormData({ ...formData, uploadPictures4: base64 })
                }
              />

              <Form.Label style={{ margin: "10px" }}>Others</Form.Label>
              <FileBase
                type="file"
                fileName="Profile.png"
                onDone={({ base64 }) =>
                  setFormData({ ...formData, uploadPictures5: base64 })
                }
              />
            </div>
            {/* </UploadWrapper> */}
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
          <button
            variant="primary"
            type="submit"
            className="float-end mt-3 mr-3 mb-3 ml-3 btn-custom"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Form>
      </Card>
    </Container>
  );
};

export default EntryDetails;

// import React from 'react';
// import { useSelector } from 'react-redux';

// const MyComponent = () => {
//   // Fetch the date from the Redux store
//   const dateFromStore = useSelector((state) => state.date); // Adjust the selector based on your state structure

//   // Function to get the month from the date
//   const getMonthFromDate = (dateString) => {
//     const date = new Date(dateString); // Convert the string to a Date object
//     const month = date.getMonth(); // Get the month (0-11)
//     return month + 1; // Return the month in the 1-12 range
//   };

//   const month = dateFromStore ? getMonthFromDate(dateFromStore) : null;

//   return (
//     <div>
//       {month ? (
//         <p>The month is: {month}</p>
//       ) : (
//         <p>No date available.</p>
//       )}
//     </div>
//   );
// };

// export default MyComponent;
