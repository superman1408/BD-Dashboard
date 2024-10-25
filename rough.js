<Grid key={index} item xs={12} sm={6} md={4} lg={3} margin={2}>
  <Card
    style={{
      padding: "12px",
      margin: "20px ",
      backgroundColor: "white",
      width: "350px",
    }}
  >
    <Card.Img
      variant="top"
      src={post?.selectedFile} // Ensure post.selectedFile is defined
      alt="Profile_Picture"
      style={{ height: "150px" }}
    />

    <Card.Body>
      <div>
        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
          {post?.projectName}
        </h4>
        <Divider
          sx={{
            borderWidth: "3px",
            bgcolor: "black",
            marginBottom: "5px",
          }}
        />
        <h6 style={{}}>Project Number: {post?.projectNumber}</h6>
        <h6 style={{ display: "flex" }}>
          Date of Commencement: {post?.commencementDate}
        </h6>
        <h6 style={{}}>Project Manager: {post?.projectManager}</h6>
      </div>

      {/* <Button
                    variant="primary"
                    style={{ display: "flex", float: "right" }}
                    onClick={() => handleDetails(post.projectNumber)}
                  >
                    Details
                  </Button> */}

      {/* <Button
                    variant="primary"
                    onClick={() => handleEntry(post.projectNumber)}
                  >
                    Entry
                  </Button> */}
      <Button
        variant="primary"
        style={{ display: "flex", float: "right" }}
        onClick={() => handleDetails(post.projectNumber)}
      >
        Details
      </Button>
      {/* </div> */}
    </Card.Body>
  </Card>
</Grid>;
