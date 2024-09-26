/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Grid, Card, Container, Button, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEntryDetails } from "../../action/posts";
const DetailedProjectPage = () => {
  const { date } = useParams();

  const dispatch = useDispatch();

  const [isPrinting, setIsPrinting] = useState(false);
  const [loading, setLoading] = useState(true);

  const componentRef = useRef();

  const posts = useSelector((state) => state.posts);

  const [filteredData, setFilteredData] = useState([]);

  const allEntries = [];

  useEffect(() => {
    dispatch(getEntryDetails()).finally(() => setLoading(false));
    // Filter the data based on the selected date
    const allEntries = [];
    posts[0]?.forEach((post) => {
      for (let index = 0; index < post?.date.length; index++) {
        if (post?.date[index] === date) {
          allEntries.push({
            docNo: post?.docNo,
            projectName: post?.projectName,
            clientName: post?.clientName,
            date: post?.date[index],
            activity1: post?.activity1[index],
            activity2: post?.activity2[index],
            activity3: post?.activity3[index],
            activity4: post?.activity4[index],
            maleLabour: post?.maleLabour[index],
            femaleLabour: post?.femaleLabour[index],
            mason: post?.mason[index],
            uploadPictures1: post?.uploadPictures1[index],
            uploadPictures2: post?.uploadPictures2[index],
            uploadPictures3: post?.uploadPictures3[index],
            uploadPictures4: post?.uploadPictures4[index],
            uploadPictures5: post?.uploadPictures5[index],
            submittedBy: post?.submittedBy[index],
          });
        }
        console.log(post.uploadPictures1);
      }
    });

    setFilteredData(allEntries); // Set the filtered data
  }, [date, posts, dispatch, loading]);

  const handlePpd = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Visitor Pass",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
    fontSize: "15px",
  });

  posts[0]?.forEach((post) => {
    for (let index = 0; index < post?.date.length; index++) {
      if (post?.date[index] === date) {
        allEntries.push({
          docNo: post?.docNo,
          projectName: post?.projectName,
          clientName: post?.clientName,
          date: post?.date[index],
          activity1: post?.activity1[index],
          activity2: post?.activity2[index],
          activity3: post?.activity3[index],
          activity4: post?.activity4[index],
          maleLabour: post?.maleLabour[index],
          femaleLabour: post?.femaleLabour[index],
          mason: post?.mason[index],
          uploadPictures1: post?.uploadPictures1[index],
          uploadPictures2: post?.uploadPictures2[index],
          uploadPictures3: post?.uploadPictures3[index],
          uploadPictures4: post?.uploadPictures4[index],
          uploadPictures5: post?.uploadPictures5[index],
          submittedBy: post?.submittedBy[index],
        });
      }
    }
  });

  return (
    <div>
      {loading ? (
        <div style={{ marginTop: "20px", paddingBottom: "200vh" }}>
          <LinearProgress />
          Loading...
        </div>
      ) : (
        <Container
          elevation={10}
          padding="10px"
          container="true"
          spacing={0}
          direction="column"
          alignitems="center"
          justifycontent="center"
          // fluid="true"
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexDirection: "column",
          }}
        >
          <Card
            elevation={20}
            sx={{
              padding: "40px",
              borderRadius: "20px",
              display: {
                xs: "0",
                sm: "600",
              },
              bgcolor: "background.Card",
              boxShadow: "5px",
              width: "auto",
              justifyContent: "center",
            }}
          >
            {" "}
            <div ref={componentRef} style={{ padding: "50px" }}>
              <h3
                style={{
                  textAlign: "center",
                  fontFamily: "Roboto ",
                  color: "#0d325c",
                }}
              >
                Daily Progress Report
              </h3>
              <Grid>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid>
                    <table
                      style={{
                        padding: "10px",
                        // marginLeft: "100px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            // alignItems="center"
                            // justifyContent="center"
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                              backgroundColor: "#027580",
                            }}
                          >
                            DAILY PROGRESS REPORT
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table
                      style={{
                        // marginLeft: "100px",
                        padding: "10px",
                        // marginLeft: "100px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                      }}
                    >
                      <thead>
                        {filteredData.length > 0 ? (
                          filteredData.map((entry, index) => (
                            <tr>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                PROJECT NAME
                              </th>

                              <td
                                style={{
                                  border: "1px solid black",
                                  width: "60%",
                                  padding: "10px",
                                }}
                              >
                                {entry?.projectName}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <p>No data available for this date.</p>
                        )}
                      </thead>
                    </table>
                    {filteredData.length > 0 ? (
                      filteredData.map((entry, index) => (
                        <table
                          style={{
                            padding: "10px",
                            borderCollapse: "collapse",
                            border: "1px solid black",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                            maxWidth: "800px",
                          }}
                        >
                          <tbody>
                            <tr key={index}>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Client
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                <td>{entry.clientName}</td>
                              </td>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Date
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                <td>{entry.date}</td>
                              </td>
                            </tr>
                            <tr>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Doc No.
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                <td>{entry.docNo}</td>
                              </td>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Month
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                      ))
                    ) : (
                      <p>No data available for this date.</p>
                    )}
                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              backgroundColor: "#027580",
                              textAlign: "center",
                            }}
                          >
                            Activities
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tbody>
                            <tr key={index}>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Civil & Structure
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                {entry?.activity1}
                              </td>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Planned work for Tomorrow
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                {entry?.activity2}
                              </td>
                            </tr>
                            <tr>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Material Requirements
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                {entry?.activity3}
                              </td>
                              <th
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                Procurement Status
                              </th>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "10px",
                                }}
                              >
                                {entry?.activity4}
                              </td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <p>No data available for this date.</p>
                      )}
                    </table>
                    <br />
                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tbody>
                            <tr key={index}>
                              <th
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                }}
                              >
                                Related Image
                              </th>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                  padding: "40px",
                                }}
                              >
                                <img
                                  src={entry.uploadPictures1}
                                  alt="Image"
                                  style={{ width: "150px", height: "100px" }}
                                />
                                <img
                                  src={entry.uploadPictures2}
                                  alt="Image"
                                  style={{ width: "150px", height: "100px" }}
                                />
                                <img
                                  src={entry.uploadPictures3}
                                  alt="Image"
                                  style={{ width: "150px", height: "100px" }}
                                />
                                <img
                                  src={entry.uploadPictures4}
                                  alt="Image"
                                  style={{ width: "150px", height: "100px" }}
                                />
                                <img
                                  src={entry.uploadPictures5}
                                  alt="Image"
                                  style={{ width: "150px", height: "100px" }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <p>No data available for this date.</p>
                      )}
                    </table>
                    <br />
                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tbody>
                            <tr key={index}>
                              <th
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                }}
                              >
                                S. No.
                              </th>
                              <th
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                }}
                              >
                                Male Labour
                              </th>
                              <th
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                }}
                              >
                                Female Labour
                              </th>
                              <th
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                }}
                              >
                                Mason
                              </th>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "20px",
                                }}
                              >
                                {/* {entry?.mason} */}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "20px",
                                }}
                              >
                                {entry?.maleLabour}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "20px",
                                }}
                              >
                                {entry?.femaleLabour}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "20px",
                                }}
                              >
                                {entry?.mason}
                              </td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <p>No data</p>
                      )}
                    </table>
                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        maxWidth: "800px",
                      }}
                    >
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tbody>
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "40px",
                                }}
                              >
                                {entry?.submittedBy}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "40px",
                                }}
                              ></td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "40px",
                                }}
                              ></td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                PREPARED BY
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                SITE SUPERVISOR
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                LABOUR CONTRACTOR
                              </td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <p>No data available</p>
                      )}
                    </table>
                  </Grid>
                </Grid>
              </Grid>{" "}
            </div>
          </Card>

          <Grid>
            {!isPrinting && (
              <Button
                required
                variant="outlined"
                sx={{
                  bgcolor: "skyblue",
                  color: "black",
                  float: "right",
                  marginRight: "0px",
                  marginTop: "10px",
                }}
                onClick={handlePpd}
              >
                Print
              </Button>
            )}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default DetailedProjectPage;
