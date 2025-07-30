import mongoose, { Types } from "mongoose";

const teacherSchema = mongoose.Schema(
  {
    //
    // kgid
    // name
    // school name
    // id picture
    //
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
