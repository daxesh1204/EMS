import mongoose, { Schema } from "mongoose";

const salarySchema = mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number },
  payDate: { type: Date, required: true },
  updateAt: { type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
});


const salary=mongoose.model('salary',salarySchema);
export default salary;