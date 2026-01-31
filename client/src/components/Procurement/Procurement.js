import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getInventoryDetails } from "../../action/inventory";

// const transactions = [
//   {
//     date: "2026-01-01",
//     material: "Rod",
//     unit: "Kg",
//     reference: "INV-201",
//     qtyIn: 500,
//     qtyOut: 0,
//     remarks: "Rod received",
//   },
//   {
//     date: "2026-01-03",
//     material: "Rod",
//     unit: "Kg",
//     reference: "SITE-ISSUE",
//     qtyIn: 0,
//     qtyOut: 120,
//     remarks: "Slab work",
//   },

//   {
//     date: "2026-01-02",
//     material: "Bricks",
//     unit: "Nos",
//     reference: "INV-301",
//     qtyIn: 10000,
//     qtyOut: 0,
//     remarks: "Bricks received",
//   },
//   {
//     date: "2026-01-04",
//     material: "Bricks",
//     unit: "Nos",
//     reference: "SITE-ISSUE",
//     qtyIn: 0,
//     qtyOut: 2500,
//     remarks: "Wall work",
//   },

//   {
//     date: "2026-01-02",
//     material: "Cement",
//     unit: "Bags",
//     reference: "INV-401",
//     qtyIn: 200,
//     qtyOut: 0,
//     remarks: "Cement received",
//   },
//   {
//     date: "2026-01-05",
//     material: "Cement",
//     unit: "Bags",
//     reference: "SITE-ISSUE",
//     qtyIn: 0,
//     qtyOut: 60,
//     remarks: "Column work",
//   },

//   {
//     date: "2026-01-02",
//     material: "Sand",
//     unit: "CFT",
//     reference: "INV-501",
//     qtyIn: 500,
//     qtyOut: 0,
//     remarks: "Sand delivered",
//   },
//   {
//     date: "2026-01-06",
//     material: "Sand",
//     unit: "CFT",
//     reference: "SITE-ISSUE",
//     qtyIn: 0,
//     qtyOut: 180,
//     remarks: "Plastering",
//   },

//   {
//     date: "2026-01-03",
//     material: "Aggregate",
//     unit: "CFT",
//     reference: "INV-601",
//     qtyIn: 400,
//     qtyOut: 0,
//     remarks: "Aggregate received",
//   },
//   {
//     date: "2026-01-06",
//     material: "Aggregate",
//     unit: "CFT",
//     reference: "SITE-ISSUE",
//     qtyIn: 0,
//     qtyOut: 150,
//     remarks: "Concrete work",
//   },
// ];

const Procurement = () => {
  // const [show, setShow] = useState(false);
  // const [formData, setFormData] = useState(false);

  const dispatch = useDispatch();

  const balances = {};

  useEffect(() => {
    dispatch(getInventoryDetails());
  });

  const inventoryDetails = useSelector(
    (state) => state.inventory.inventoryDetails,
  );

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
              <th>Date</th>
              <th>Material</th>
              <th>Unit</th>
              <th>Reference</th>
              <th>Quantity Received</th>
              <th>Quantity Issued</th>
              <th>Stock</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {/* {transactions.map((tx, index) => {
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
