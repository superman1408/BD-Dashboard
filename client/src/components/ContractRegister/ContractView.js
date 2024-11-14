import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Card,
  LinearProgress,
  Typography,
} from "@mui/material";

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
      {loading ? (
        <div
          style={{
            marginTop: "20px",
            paddingBottom: "200vh",
            // justifyContent: "center",
          }}
        >
          <LinearProgress />
          loading...
        </div>
      ) : (
        <Card
          elevation={20}
          sx={{
            borderRadius: "10px",
            display: "flex",
            bgcolor: "background.Card",
            boxShadow: "5px",
            width: "100%",
            maxWidth: "800px",
            justifyContent: "center",
            margin: "auto",
            padding: { xs: "15px", sm: "30px" }, // responsive padding
          }}
        >
          <div style={{ padding: "30px" }}>
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontFamily: "Roboto",
                color: "#0d325c",
                fontWeight: "bold",
                padding: "10px",
                // fontSize: "15px", // responsive font size
              }}
            >
              Contract Report page
            </Typography>
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
                            padding: "8px",
                            // fontSize: "13px",
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
                  <br />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default ContractView;
