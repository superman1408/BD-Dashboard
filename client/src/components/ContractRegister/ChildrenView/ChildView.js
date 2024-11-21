import React from "react";
import {
  Card,
  IconButton,
  Grid,
  Container,
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const ChildView = ({ element }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDownload = async (data) => {
    try {
      if (!data) {
        throw new Error("PDF data is not available.");
      }

      const binaryDataBuffer = new Uint8Array(data);
      const blob = new Blob([binaryDataBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        flexDirection: "column",
        marginBottom: "50px",
      }}
    >
      <Card
        sx={{
          color: "black",
          width: "auto",
          justifyContent: "center",
          margin: "2px",
          padding: "10px",
        }}
      >
        <Grid container direction="column">
          <Grid item>
            <table
              style={{
                flexDirection: isSmallScreen ? "column" : "row",
                width: "100%",
                fontSize: isSmallScreen ? "10px" : "14px",
                border: "1px solid black",
                margin: "0 auto",
                padding: isSmallScreen ? "5px" : "10px",
              }}
            >
              <tbody>
                <tr>
                  <th style={styles.tableCell}>Contractor Name</th>
                  <td style={styles.tableData}>{element.contractorName}</td>
                  <th style={styles.tableCell}>Contact Person</th>
                  <td style={styles.tableData}>{element.contactPerson}</td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Contact Person Email</th>
                  <td style={styles.tableData}>{element.contactEmail}</td>
                  <th style={styles.tableCell}>Contact Number</th>
                  <td style={styles.tableData}>{element.contactNumber}</td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Contractor Billing Address</th>
                  <td style={styles.tableData}>
                    {element.contractBillingAddress}
                  </td>
                  <th style={styles.tableCell}>Contractor Address</th>
                  <td style={styles.tableData}>{element.contractAddress}</td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Contractor Start Date</th>
                  <td style={styles.tableData}>{element.contractStartDate}</td>
                  <th style={styles.tableCell}>Contractor End Date</th>
                  <td style={styles.tableData}>{element.contractEndDate}</td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Bank Guarantee Number</th>
                  <td style={styles.tableData}>{element.bankGuaranteeNo}</td>
                  <th style={styles.tableCell}>
                    Incorporation Certificate No.
                  </th>
                  <td style={styles.tableData}>
                    {element.incorporationCertificateNo}
                  </td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Bank Guarantee Start Date</th>
                  <td style={styles.tableData}>
                    {element.bankGuaranteeStartDate}
                  </td>
                  <th style={styles.tableCell}>Bank Guarantee End Date</th>
                  <td style={styles.tableData}>
                    {element.bankGuaranteeEndDate}
                  </td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>GST No.</th>
                  <td style={styles.tableData}>{element.GSTNo}</td>
                  <th style={styles.tableCell}>PAN No.</th>
                  <td style={styles.tableData}>{element.PANNo}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item>
            <table
              style={{
                flexDirection: isSmallScreen ? "column" : "row",
                padding: "10px",
                border: "1px solid black",
                margin: "10px auto",
                width: "100%",
                fontSize: isSmallScreen ? "10px" : "14px",
              }}
            >
              <tbody>
                <tr>
                  {[
                    { label: "PAN PDF", data: element.PAN },
                    { label: "GST PDF", data: element.GST },
                    {
                      label: "Bank Guarantee PDF",
                      data: element.bankGuarantee,
                    },
                    {
                      label: "Incorporation Certificate PDF",
                      data: element.incorporationCertificate,
                    },
                    {
                      label: "Signed Contract Copy PDF",
                      data: element.signedContractCopy,
                    },
                  ].map((item, index) => (
                    <th key={index} style={styles.tableCell}>
                      {item.label}
                      <IconButton
                        style={{ float: "right" }}
                        onClick={() => handleDownload(item.data)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </th>
                  ))}
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

const styles = {
  tableCell: {
    border: "1px solid black",
    padding: "10px",
  },
  tableData: {
    border: "1px solid black",
    padding: "10px",
    width: "30%",
    textAlign: "center",
  },
};

export default ChildView;
