import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Card } from "@mui/material";

import { getContractDetails } from "../../action/contract";

const ContractView = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id } = useParams();

  const { contactEmail } = useParams();

  const [isPrinting, setIsPrinting] = useState(false);

  const [loading, setLoading] = useState(true);

  const [filteredData, setFilteredData] = useState([]);

  const [month, setMonth] = useState(null);

  // Fetch posts from Redux store
  const contract = useSelector((state) => state.contract);

  const allEntries = [];

  useEffect(() => {
    // setLoading(true);
    dispatch(getContractDetails()).finally(() => {
      const allEntries = [];
      contract.forEach((post) => {
        for (let index = 0; index < post?._id.length; index++) {
          if (post?._id[index] === _id) {
            allEntries.push({
              contactEmail: post?.contactEmail[index],
              contractorName: post?.contractorName,
              contactPerson: post?.contactPerson,
              contactNumber: post?.contactNumber,
              //   _id: post?._id,
              contractAddress: post?.contractAddress,
              contractBillingAddress: post?.contractBillingAddress,
              contractStartDate: post?.contractStartDate,
              contractEndDate: post?.contractEndDate,
              bankGuranteeSubmitted: post?.bankGuranteeSubmitted,
              GSTNo: post?.GSTNo,
              PANNo: post?.PANNo,
              incorporationCertificateNo: post?.incorporationCertificateNo,
              bankGuaranteeNo: post?.bankGuaranteeNo,
              bankGuranteeStartDate: post?.bankGuranteeStartDate,
              bankGuranteeEndDate: post?.bankGuranteeEndDate,
              GST: post?.GST,
              PAN: post?.PAN[index],
              incorporationCertificate: post?.incorporationCertificate[index],
              bankGurantee: post?.bankGurantee[index],
              signedContractCopy: post?.signedContractCopy[index],
            });
            const storedDate = post?.date[index]; // Example stored date (ISO format)
            const actualDate = new Date(storedDate);
            // const monthValue = actualDate.getMonth() + 1;
            const monthValue = actualDate.toLocaleString("default", {
              month: "long",
            });
            setMonth(monthValue);
          }
        }
      });
      setFilteredData(allEntries);
    });
  }, [contract, dispatch, loading]);

  console.log(contract);

  contract.forEach((post) => {
    for (let index = 0; index < post?._id.length; index++) {
      if (post?._id[index] === _id) {
        allEntries.push({
          contactEmail: post?.contactEmail[index],
          contractorName: post?.contractorName,
          contactPerson: post?.contactPerson,
          contactNumber: post?.contactNumber,
          //   _id: post?._id,
          contractAddress: post?.contractAddress,
          contractBillingAddress: post?.contractBillingAddress,
          contractStartDate: post?.contractStartDate,
          contractEndDate: post?.contractEndDate,
          bankGuranteeSubmitted: post?.bankGuranteeSubmitted,
          GSTNo: post?.GSTNo,
          PANNo: post?.PANNo,
          incorporationCertificateNo: post?.incorporationCertificateNo,
          bankGuaranteeNo: post?.bankGuaranteeNo,
          bankGuranteeStartDate: post?.bankGuranteeStartDate,
          bankGuranteeEndDate: post?.bankGuranteeEndDate,
          GST: post?.GST,
          PAN: post?.PAN[index],
          incorporationCertificate: post?.incorporationCertificate[index],
          bankGurantee: post?.bankGurantee[index],
          signedContractCopy: post?.signedContractCopy[index],
        });
        const storedDate = post?.date[index]; // Example stored date (ISO format)
        const actualDate = new Date(storedDate);
        // const monthValue = actualDate.getMonth() + 1;
        const monthValue = actualDate.toLocaleString("default", {
          month: "long",
        });
        setMonth(monthValue);
      }
    }
  });

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
                      maxWidth: "800px",
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
                        filteredData.map((contract, index) => (
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
                              {contract?.projectName}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <p>No data available for this date.</p>
                      )}
                    </thead>
                  </table>
                  {filteredData.length > 0 ? (
                    filteredData.map((contract, index) => (
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
                                width: "30%",
                                textAlign: "center",
                              }}
                            >
                              {contract.clientName}
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
                              {contract.date}
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
                              {contract.docNo}
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
                              {}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))
                  ) : (
                    <p>No data available for this date.</p>
                  )}
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
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid black",
                            // backgroundColor: "#027580",
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
                      filteredData.map((contract, index) => (
                        <tbody key={index}>
                          <tr>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "10px",
                                width: "40%",
                              }}
                            >
                              Civil & Structure
                            </th>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "10px",
                                width: "70%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {contract?.activity1
                                  .split("\n")
                                  .map((line, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontSize: "14px",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      {line}
                                    </span>
                                  ))}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <p>No data available for this date.</p>
                    )}
                  </table>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ContractView;
