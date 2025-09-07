import Teacher from "../models/teacher.model.js";
import mongoose from "mongoose";
import { supabase } from "../supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const getTeacherInfo = async (req, res) => {
  try {
    const teacher = await Teacher.find({});
    res.status(200).json({ success: true, data: teacher });
    console.log("teachers from db: ", teacher);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const postTeacherInfo = async (req, res) => {
  const teacherData = JSON.parse(req.body.data);
  const { kgid, name, schoolName, taluka, cluster } = teacherData;
  const file = req.file;

  if (!kgid || !name || !schoolName || !file || !taluka || !cluster) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const fileExt = file.originalname.split(".").pop();
  const fileName = `${name}-${kgid}.${fileExt}`;
  const filePath = `teachers/${fileName}`;

  // uploading image
  const { error: uploadError } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (uploadError) {
    return res
      .status(500)
      .json({ error: uploadError.message + "  upload error" });
  }
  const { data } = supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .getPublicUrl(filePath);

  const publicUrl = data.publicUrl;

  const newTeacher = new Teacher({
    kgid,
    name,
    schoolName,
    profileImage: publicUrl,
    taluka,
    cluster,
  });

  try {
    await newTeacher.save();
    console.log("saved teacher", newTeacher);
    res.status(201).json({ success: true, data: newTeacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
