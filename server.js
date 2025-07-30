import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import teacherRoutes from "./routes/teacher.route.js";
import { ConnectDB } from "./config/db.js";

// env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2365;

app.use(cors());
app.use(express.json());

app.use("/api/teachers", teacherRoutes);

app.listen(PORT, () => {
  ConnectDB();
  console.log("the server is on! http://localhost:" + PORT);
});
