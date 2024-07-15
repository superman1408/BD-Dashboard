import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

const CONNECT = process.env.CONNECTION_URL;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(`Server is running at PORT:  ${PORT}`);
});

mongoose.set("strictQuery", true);

mongoose
  .connect(CONNECT, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        "Listening at " + PORT + "\nMongoDB database is connected..!!"
      );
    })
  )
  .catch((error) => console.log(error));
app.listen(PORT, () => console.log(`Server running at PORT:  ${PORT}`));
