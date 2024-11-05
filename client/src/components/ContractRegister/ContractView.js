import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Card, CircularProgress } from "@mui/material";

import { getContractDetails } from "../../action/contract";
import ChildView from "./ChildrenView/ChildView";

const ContractView = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [isPrinting, setIsPrinting] = useState(false);

  const [loading, setLoading] = useState(true);

  const [filteredData, setFilteredData] = useState([]);

  const [month, setMonth] = useState(null);

  // Fetch posts from Redux store
  const contract = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(getContractDetails()).then(() => setLoading(false));
  }, []);

  const allEntries = contract.map((c) => ({
    id: c._id,
    contactEmail: c.contactEmail,
    contractorName: c.contractorName,
    contactPerson: c.contactPerson,
    contactNumber: c.contactNumber,
    contractAddress: c.contractAddress,
    contractBillingAddress: c.contractBillingAddress,
    contractStartDate: c.contractStartDate,
    contractEndDate: c.contractEndDate,
    bankGuranteeSubmitted: c.bankGuranteeSubmitted,
    GSTNo: c.GSTNo,
    PANNo: c.PANNo,
    incorporationCertificateNo: c.incorporationCertificateNo,
    bankGuaranteeNo: c.bankGuaranteeNo,
    bankGuranteeStartDate: c.bankGuranteeStartDate,
    bankGuranteeEndDate: c.bankGuranteeEndDate,
    GST: c.GST,
    PAN: c.PAN,
    incorporationCertificate: c.incorporationCertificate,
    bankGurantee: c.bankGurantee,
    signedContractCopy: c.signedContractCopy,
  }));

  // console.log(allEntries);

  return (
    <div>
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
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
          marginBottom: "50px",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Card
            elevation={20}
            sx={{
              borderRadius: "10px",
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
            <div style={{ padding: "30px" }}>
              <h3
                style={{
                  textAlign: "center",
                  fontFamily: "Roboto ",
                  color: "#0d325c",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Contract Report page
              </h3>
              <Grid>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid>
                    <table
                      style={{
                        padding: "10px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        // maxWidth: "800px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                              backgroundColor: "#0d325c",
                              color: "white",
                            }}
                          >
                            GENERATED REPORT
                          </th>
                        </tr>
                      </thead>
                    </table>
                    {allEntries.length >= 0 ? (
                      allEntries
                        .filter((element) => element.id === id) // include item with the specified id
                        .map((element) => (
                          <ChildView element={element} key={element.id} />
                        ))
                    ) : (
                      <p>no Data</p>
                    )}
                    {/* <table
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
                  > */}
                    {/* <thead>
                      {contract.length > 0 ? (
                        allEntries.map((post, index) => (
                          <tr key={index}>
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
                                width: "70%",
                                padding: "10px",
                                textAlign: "center",
                              }}
                            >
                              {post?.id}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <p>No data available for this date.</p>
                      )}
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
                    {contract.length > 0 ? (
                      contract.map((post, index) => (
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
                                width: "30%",
                                textAlign: "center",
                              }}
                            >
                              {post.contractorName}
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
                                width: "30%",
                                textAlign: "center",
                              }}
                            >
                              {post.contactNumber}
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
                                textAlign: "center",
                                width: "30%",
                              }}
                            >
                              {post.contractorName}
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
                                width: "30%",
                                textAlign: "center",
                              }}
                            >
                              {post.contractorName}
                            </td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <p>No data available for this date.</p>
                    )}
                  </table> */}
                    <br />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default ContractView;
