import mongoose, { Schema } from "mongoose";

const empSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  designation: { type: String, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("employee", empSchema);
export default Employee;
