// console.log("Hello world");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("HEllo ASHKAM API");
});

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));
