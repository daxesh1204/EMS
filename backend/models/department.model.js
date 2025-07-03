import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
  dept_name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Departments = mongoose.model("department", deptSchema);
export default Departments;
