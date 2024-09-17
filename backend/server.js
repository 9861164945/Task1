import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import EmployeeRouter from "../backend/routes/EmployeeRoute.js";
import connectDB from "../backend/db/dbConnection.js";

dotenv.config();
connectDB();

const App = express();
const port = process.env.PORT ||8000;

App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use("/employee", EmployeeRouter);

App.listen(port, () => {
  console.log(`Your server is running at http://localhost:${port}`);
});