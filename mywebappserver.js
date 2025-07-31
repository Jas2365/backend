import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import teacherRoutes from "./routes/teacher.route.js";
import { ConnectDB } from "./config/db.js";

// env variables
dotenv.config();

const app = express();

(async () => {
  try {
    await ConnectDB();
    console.log("mongo db connected");
  } catch (err) {
    console.error("Mongo db failed", err);
  }
})();
const PORT = process.env.PORT || 2365;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);

  next();
});

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use("/api/teachers", teacherRoutes);

export default app;
