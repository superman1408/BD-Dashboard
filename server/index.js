import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import contractRoutes from "./routes/contract.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

const CONNECT = process.env.CONNECTION_URL;

app.use(bodyParser.json({ limit: "35mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/contract", contractRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running at PORT:  ${PORT}`);
});

mongoose.set("strictQuery", true);

mongoose
  .connect(CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        "Listening at " + PORT + "\nMongoDB database is connected..!!"
      );
    })
  )
  .catch((error) => console.log(error));
