import {
  Card,
  IconButton,
  Grid,
  Container,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import DownloadIcon from "@mui/icons-material/Download";
import { LOGOUT } from "../../../constants/actionTypes";

const ChildView = ({ element }) => {
  console.log(element);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDownload = async (element) => {
    try {
      // Check if ePan.data exists
      if (!element || !element.data) {
        throw new Error("PDF data is not available.");
      }

      // Convert the data array to a Uint8Array
      const binaryDataBuffer = new Uint8Array(element.data);

      // Create a Blob from the Uint8Array
      const blob = new Blob([binaryDataBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "Document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error.message);
    }
  };

  return (
    <Container
      elevation={10}
      padding="10px"
      container="true"
      spacing={0}
      direction="column"
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
        // elevation={20}
        sx={{
          display: "flex",
          // bgcolor: "blue",
          color: "black",
          // boxShadow: "5px",
          width: "auto",
          justifyContent: "center",
          margin: "2px",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid>
            <table
              style={{
                // display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                width: "100%",
                fontSize: isSmallScreen ? "10px" : "14px",
                // borderCollapse: "collapse",
                border: "1px solid black",
                margin: "0 auto",
                padding: isSmallScreen ? "5px" : "10px",
              }}
            >
              {/* {contract.length > 0 ? (
            contract.map((post, index) => ( */}
              <tbody>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contractor Name
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contractorName}
                  </td>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contact Person
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contactPerson}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contact Person Email
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contactEmail}
                  </td>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contact Number
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contactNumber}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contractor Billing Address
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contractBillingAddress}
                  </td>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contractor Address
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    {element.contractAddress}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contractor Start Date
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contractStartDate}
                  </td>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Contractor End Start
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.contractEndDate}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    Bank Guarantee Number
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.bankGuaranteeNo}
                  </td>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    IncorporationCertificate No.
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.incorporationCertificateNo}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    BankGurantee Start Date
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.bankGuranteeStartDate}
                  </td>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    BankGurantee End Date
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.bankGuranteeEndDate}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    GST No.
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      // width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.GSTNo}
                  </td>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    PAN No.
                  </th>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      // width: "30%",
                      textAlign: "center",
                    }}
                  >
                    {element.PANNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid>
            <table
              style={{
                // display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                padding: "10px",
                borderCollapse: "collapse",
                border: "1px solid black",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                fontSize: isSmallScreen ? "10px" : "14px",
                // maxWidth: "800px",
              }}
            >
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    backgroundColor: "#0d325c",
                    color: "white",
                    // width: "30%",
                  }}
                ></td>
              </tr>
            </table>
          </Grid>
          <Grid>
            <table
              style={{
                // display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                padding: "10px",
                borderCollapse: "collapse",
                border: "1px solid black",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                fontSize: isSmallScreen ? "10px" : "14px",
                // maxWidth: "800px",
              }}
            >
              <tbody>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    PAN pdf.
                    <IconButton
                      style={{ float: "right" }}
                      onClick={() => handleDownload(element.PAN)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    GST pdf.
                    <IconButton
                      style={{ float: "right" }}
                      onClick={() => handleDownload(element.GST)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    BankGurantee pdf.
                    <IconButton
                      style={{ float: "right" }}
                      onClick={() => handleDownload(element.bankGurantee)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    IncorporationCertificate pdf.{" "}
                    <IconButton
                      style={{ float: "right" }}
                      onClick={() =>
                        handleDownload(element.incorporationCertificate)
                      }
                    >
                      <DownloadIcon />
                    </IconButton>
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                    }}
                  >
                    SignedContractCopy pdf.
                    <IconButton
                      style={{ float: "right" }}
                      onClick={() => handleDownload(element.signedContractCopy)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </th>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ChildView;
