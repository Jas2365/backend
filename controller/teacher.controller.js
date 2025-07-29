import Teacher from "../models/teacher.model.js";
import mongoose from "mongoose";

export const getTeacherInfo = async (req, res) => {
  try {
    const teacher = await Teacher.find({});
    // res.status(200).json({ success: true, data: teacher });
    console.log("teachers from db: ", teacher);
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const postTeacherInfo = async (req, res) => {
  const teacher = req.body;
  if (!teacher.firstname || !teacher.lastname || !teacher.email) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newTeacher = new Teacher(teacher);

  try {
    await newTeacher.save();
    res.status(201).json({ success: true, data: newTeacher });
  } catch (error) {
    res.satus(500).json({ success: false, message: error.message });
  }
};
export const putTeacherInfo = async (req, res) => {
  const { id } = req.params;
  const teacher = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send(404).json({ success: false, message: "Invalid teacher id" });
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTeacher });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteTeacherInfo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send(404).json({ success: false, message: "Invalid teacher id" });
  }

  try {
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Teacher Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
