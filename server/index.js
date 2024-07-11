import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



app.get('/', (req, res) => {
    res.send(`Server is running at PORT:  ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running at PORT:  ${PORT}`));
