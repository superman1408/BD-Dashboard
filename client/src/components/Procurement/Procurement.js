import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ArchiveIcon from "@mui/icons-material/Archive";

import { Grid, Tooltip, IconButton } from "@mui/material";

import { getInventoryDetails } from "../../action/inventory";

const Procurement = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);

  const dispatch = useDispatch();
  const componentRef = useRef();

  useEffect(() => {
    dispatch(getInventoryDetails());
  }, [dispatch]);

  const inventoryData = useSelector((state) => state.inventory || []);
  console.log("inventoryData", inventoryData);

  // Running stock calculation
  const balances = {};

  const inventoryWithStock = inventoryData.map((item) => {
    if (!balances[item.material]) {
      balances[item.material] = 0;
    }

    if (item.status === "Received") {
      balances[item.material] += Number(item.quantity || 0);
    } else if (item.status === "Issued") {
      balances[item.material] -= Number(item.quantity || 0);
    }

    return {
      ...item,
      runningStock: balances[item.material],
    };
  });

  return (
    <div style={{ padding: "20px", marginBottom: "50px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "32px",
          fontWeight: "400",
          color: "#02274d",
          padding: "10px 20px",
        }}
      >
        <ArchiveIcon
          style={{
            fontSize: "36px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        />
      </div>

      <div style={{ padding: "20px" }} ref={componentRef}>
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
            <tr style={{ textAlign: "center" }}>
              {/* <th>S.No</th> */}
              <th>Time</th>
              <th>Material Name</th>
              <th>Unit</th>
              <th>Quantity Received</th>
              <th>Quantity Issued</th>
              <th>Running Stock</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Received/Issued By</th>
            </tr>
          </thead>

          <tbody>
            {inventoryWithStock.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No inventory data
                </td>
              </tr>
            ) : (
              inventoryWithStock.map((item, index) => (
                <tr
                  key={item._id || index}
                  style={{
                    textAlign: "center",
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  }}
                >
                  {/* <td>{index + 1}</td> */}
                  <td>{item.timestamps}</td>
                  <td>{item.material}</td>
                  <td>{item.unit}</td>
                  <td style={{ color: "green" }}>
                    {item.status === "Received" ? item.quantity : "-"}
                  </td>
                  <td style={{ color: "red" }}>
                    {item.status === "Issued" ? item.quantity : "-"}
                  </td>
                  <td style={{ color: "blue" }}>{item.runningStock}</td>

                  <td>{item.status}</td>
                  <td>{item.remarks}</td>
                  <td>{item.vendor}</td>
                </tr>
              ))
            )}

            {/* {inventoryData.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No inventory data
                </td>
              </tr>
            ) : (
              inventoryData.map((data, index) => (
                <tr
                  key={data._id || index}
                  style={{
                    textAlign: "center",
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  }}
                >
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{data.material}</td>
                  <td>{data.unit}</td>
                  <td style={{ color: "green", textAlign: "center" }}>
                    {data.quantity || "-"}
                  </td>
                  <td style={{ color: "red", textAlign: "center" }}>
                    {data.qtyOut || "-"}
                  </td>
                  <td>{}</td>
                  <td>{data.remarks}</td>
                  <td>{data.status}</td>
                  <td>{data.vendor}</td>
                </tr>
              ))
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Procurement;
