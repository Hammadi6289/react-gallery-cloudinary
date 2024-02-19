import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use(json());

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/resources/image`;
const auth = {
  username: config.API_KEY,
  password: config.API_SECRET,
};

app.get("/photos", async (req, res) => {
  const response = await axios.get(BASE_URL, {
    auth,
  });
  return res.send(response.data);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
