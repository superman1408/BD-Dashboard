import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getInventoryDetails } from "../../action/inventory";

// const data = [
//   {
//     date: "2026-01-01",
//     material: "Rod",
//     unit: "Kg",
//     reference: "INV-201",
//     qtyIn: 500,
//     qtyOut: 0,
//     remarks: "Rod received",
//   },
// ];

const Procurement = () => {
  const [entries, setEntries] = useState(false);
  // const [formData, setFormData] = useState(false);

  const dispatch = useDispatch();

  const balances = {};

  useEffect(() => {
    dispatch(getInventoryDetails())
      .then(() => {
        // Optionally, clear local entries if you want
        setEntries([]);
      })
      .catch((err) => console.error("Error fetching posts:", err));
    console.log(getInventoryDetails);
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ padding: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px", // bigger
            fontWeight: "400", // bold
            backgroundColor: "#02274d",
            color: "#ffffff",
          }}
        >
          Construction Inventory Material
        </h1>

        <table
          className="inventory-table"
          border="3"
          width="100%"
          cellPadding="8"
          style={{ borderCollapse: "collapse", marginTop: "20px" }}
        >
          <thead style={{ backgroundColor: "#fdfdfd" }}>
            <tr>
              <th>S.No</th>
              <th>Material</th>
              <th>Unit</th>
              <th>Quantity Received</th>
              <th>Quantity Issued</th>
              <th>Stock</th>
              <th>Vendor</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            <tbody>
              {/* {inventoryDetails.map((item, index) => {
                if (!balances[item.material]) {
                  balances[item.material] = 0;
                }

                const qtyIn = item.status === "IN" ? item.quantity : 0;
                const qtyOut = item.status === "OUT" ? item.quantity : 0;

                balances[item.material] += qtyIn - qtyOut;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.material}</td>
                    <td>{item.unit}</td>

                    <td style={{ color: "green", textAlign: "center" }}>
                      {qtyIn || "-"}
                    </td>

                    <td style={{ color: "red", textAlign: "center" }}>
                      {qtyOut || "-"}
                    </td>

                    <td style={{ fontWeight: "bold", textAlign: "center" }}>
                      {balances[item.material]} {item.unit}
                    </td>

                    <td>{item.vendor || "-"}</td>
                    <td>{item.remarks || "-"}</td>
                  </tr>
                );
              })} */}
            </tbody>

            {/* {data.map((tx, index) => {
              if (!balances[tx.material]) {
                balances[tx.material] = 0;
              }

              balances[tx.material] += tx.qtyIn - tx.qtyOut;

              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  }}
                >
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{tx.date}</td>
                  <td>{tx.material}</td>
                  <td>{tx.unit}</td>
                  <td>{tx.reference}</td>
                  <td style={{ color: "green", textAlign: "center" }}>
                    {tx.qtyIn || "-"}
                  </td>
                  <td style={{ color: "red", textAlign: "center" }}>
                    {tx.qtyOut || "-"}
                  </td>
                  <td style={{ fontWeight: "bold", textAlign: "center" }}>
                    {balances[tx.material]} {tx.unit}
                  </td>
                  <td>{tx.remarks}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Procurement;
