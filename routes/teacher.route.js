import express from "express";
import {
  deleteTeacherInfo,
  getTeacherInfo,
  postTeacherInfo,
  putTeacherInfo,
} from "../controller/teacher.controller.js";

const router = express.Router();

router.get("/", getTeacherInfo);
router.post("/", postTeacherInfo);
router.put("/:id", putTeacherInfo);
router.delete("/:id", deleteTeacherInfo);
export default router;
