import mongoose from "mongoose";
import Employee from "./employee.model.js";
import Leave from "./leave.model.js";
import salary from "./salary.model.js";
import UserModel from "./user.model.js";

const deptSchema = new mongoose.Schema({
  dept_name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

deptSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const empIds = employees.map((emp) => emp._id);

      const userIds=employees.map((emp)=>emp.userId);
      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: empIds } });
      await salary.deleteMany({ employeeId: { $in: empIds } });
      await UserModel.deleteMany({_id:{$in:userIds}});
      next();
    } catch (error) {
      next(error);
    }
  }
);
const Departments = mongoose.model("department", deptSchema);
export default Departments;
