import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import teacherRoutes from "./routes/teacher.route.js";
import { ConnectDB } from "./config/db.js";

// env variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 2365;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);

  next();
});

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());

app.listen(PORT, () => {
  ConnectDB();
  console.log("the server is on! http://localhost:" + PORT);
  console.log("the front end origin is :", FRONTEND_URL);
});
