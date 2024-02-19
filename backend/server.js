import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use(json());

app.get("/photos", async (req, res) => {
  return res.send({ message: "Hello!" });
});

const PORT = 7000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
