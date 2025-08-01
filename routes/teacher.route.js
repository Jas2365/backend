import express from "express";
import {
  deleteTeacherInfo,
  getTeacherInfo,
  postTeacherInfo,
  putTeacherInfo,
} from "../controller/teacher.controller.js";

import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getTeacherInfo);
router.post("/", upload.single("profileImage"), postTeacherInfo);
router.put("/:id", putTeacherInfo);
router.delete("/:id", deleteTeacherInfo);
export default router;
