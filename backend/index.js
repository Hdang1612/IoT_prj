import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json()); // mọi yêu cầu http đều đi qua middleware này trước khi được route handler xử lý ,
//nếu ko có thì req.body -- > undefined
dotenv.config();
const PORT = process.env.PORT;

db.query("SELECT 1")
  .then(() => {
    console.log("connected db");
    app.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
  })
  .catch((err) => console.log("connected failed"));

