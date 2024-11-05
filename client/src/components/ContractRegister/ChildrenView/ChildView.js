import { Card, IconButton } from "@mui/material";
import React from "react";

const ChildView = ({ element }) => {
  console.log(element);

  return (
    <div>
      <Card
        // elevation={20}
        sx={{
          display: {
            xs: "0",
            sm: "600",
          },
          // bgcolor: "blue",
          color: "black",
          // boxShadow: "5px",
          width: "auto",
          justifyContent: "center",
          margin: "2px",
        }}
      >
        <table
          style={{
            // marginLeft: "100px",
            padding: "5px",
            // marginLeft: "100px",
            borderCollapse: "collapse",
            border: "1px solid black",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
          }}
        ></table>
        <table
          style={{
            padding: "10px",
            borderCollapse: "collapse",
            border: "1px solid black",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            fontSize: "14px",
            // maxWidth: "800px",
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
                  // width: "30%",
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
                  // width: "30%",
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
                  // width: "30%",
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
                  // width: "30%",
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
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                PAN pdf.
              </th>
              {/* <td
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  // width: "30%",
                  textAlign: "center",
                }}
              ></td> */}
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                GST pdf.
              </th>
              {/* <td
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  // width: "30%",
                  textAlign: "center",
                }}
              ></td> */}
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                GST pdf.
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                GST pdf.
              </th>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ChildView;
