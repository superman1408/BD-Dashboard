import React from "react";

const transactions = [
  // ===== ROD =====
  {
    date: "2026-01-01",
    material: "Rod",
    reference: "INV-201",
    qtyIn: 500,
    qtyOut: 0,
    remarks: "Rod received",
  },
  {
    date: "2026-01-03",
    material: "Rod",
    reference: "SITE-ISSUE",
    qtyIn: 0,
    qtyOut: 120,
    remarks: "Issued for slab work",
  },

  // ===== BRICKS =====
  {
    date: "2026-01-02",
    material: "Bricks",
    reference: "INV-301",
    qtyIn: 10000,
    qtyOut: 0,
    remarks: "Bricks received",
  },
  {
    date: "2026-01-04",
    material: "Bricks",
    reference: "SITE-ISSUE",
    qtyIn: 0,
    qtyOut: 2500,
    remarks: "Used for wall work",
  },

  // ===== CEMENT =====
  {
    date: "2026-01-02",
    material: "Cement",
    reference: "INV-401",
    qtyIn: 200,
    qtyOut: 0,
    remarks: "Cement bags received",
  },
  {
    date: "2026-01-05",
    material: "Cement",
    reference: "SITE-ISSUE",
    qtyIn: 0,
    qtyOut: 60,
    remarks: "Used for column work",
  },
];

const MergedMaterialLedger = () => {
  const balances = {};

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>
        Construction Inventory Ledger (Rod | Bricks | Cement)
      </h2>

      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead style={{ backgroundColor: "#f3f3f3" }}>
          <tr>
            <th>Date</th>
            <th>Material</th>
            <th>Reference</th>
            <th>Qty In</th>
            <th>Qty Out</th>
            <th>Balance</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx, index) => {
            if (!balances[tx.material]) {
              balances[tx.material] = 0;
            }

            balances[tx.material] =
              balances[tx.material] + tx.qtyIn - tx.qtyOut;

            return (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>{tx.material}</td>
                <td>{tx.reference}</td>
                <td style={{ color: "green", textAlign: "center" }}>
                  {tx.qtyIn || "-"}
                </td>
                <td style={{ color: "red", textAlign: "center" }}>
                  {tx.qtyOut || "-"}
                </td>
                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  {balances[tx.material]}
                </td>
                <td>{tx.remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MergedMaterialLedger;
