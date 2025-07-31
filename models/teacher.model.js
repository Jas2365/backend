import mongoose, { Types } from "mongoose";

const teacherSchema = mongoose.Schema(
  {
    //
    // kgid
    // name
    // school name
    // id picture // not needed
    //
    kgid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
