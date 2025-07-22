import Departments from "../models/department.model.js";
import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartment = await Departments.countDocuments();
    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);
    const employeeAppliedForLeave = await Leave.distinct("employeeId");
    
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved:
        leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected:
        leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending:
        leaveStatus.find((item) => item._id=== "Pending")?.count || 0,
    };
    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartment,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "dashboard summary error" });
  }
};
export { getSummary };
