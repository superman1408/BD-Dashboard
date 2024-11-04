import { Card } from "@mui/material";
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
          margin: "5px",
        }}
      >
        {/* <h2>{element.id}</h2>
        <h2>{element.contactEmail}</h2> */}
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
            {/* {element.length > 0 ? (
              allEntries.map((post, index) => ( */}
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                CLIENT ID
              </th>

              <td
                style={{
                  border: "1px solid black",
                  width: "70%",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {element.contactEmail}
              </td>
            </tr>
            {/* ))
            ) : (
              <p>No data available for this date.</p>
            )} */}
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
            </tr>
            <tr>
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
              ></th>
              <td
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  width: "30%",
                  textAlign: "center",
                }}
              ></td>
            </tr>
          </tbody>
          {/* ))
          ) : (
            <p>No data available for this date.</p>
          )} */}
        </table>
      </Card>
    </div>
  );
};

export default ChildView;
